package com.example.be.service.impl;

import com.example.be.Enum.AccountStatus;
import com.example.be.config.SearchHelper;
import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.dto.request.Account.ResetPasswordDTO;
import com.example.be.dto.response.Account.AccountResponse;
import com.example.be.entity.Account;
import com.example.be.entity.Role;
import com.example.be.exception.ErrorHandler;
import com.example.be.helper.EmailService;
import com.example.be.mapper.AccountMapper;
import com.example.be.properties.AccountProperties;
import com.example.be.repository.AccountRepository;
import com.example.be.repository.RoleRepository;
import com.example.be.service.AccountService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final AccountMapper accountMapper;
    private final EmailService emailService;
    private final AccountProperties accountProperties;
    private final PasswordEncoder passwordEncoder;
    private static final List<String>SEARCH_FIELDS=List.of("email","fullName","phone");
    @Override
    public Account findByEmail(String email) {
        log.info("get account by email {}", email);
        return accountRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Override
    public void save(AccountDTO accountDTO) {
        Role role = roleRepository.findById(accountDTO.getIdRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Account account=accountMapper.toEntity(accountDTO,role);
        account.setPassword(account.getPassword()!=null?passwordEncoder.encode(accountDTO.getPassword()):null);
        String token = UUID.randomUUID().toString();
        LocalDateTime expiry=LocalDateTime.now().plusHours(1);
        account.setActivationToken(token);
        account.setActivationTokenExpiry(expiry);
        account.setStatus(AccountStatus.INACTIVE);
        accountRepository.save(account);
        String activationUrl= accountProperties.getActivationUrl()+"?token="+token;
        try {
            emailService.sendActivationEmail(
                    account.getEmail(),
                    account.getFullName(),
                    activationUrl
            );
        }catch (Exception e){
            throw new RuntimeException("Không thể gửi email kích hoạt",e);
        }
    }

    @Override
    public Account validateActivationToken(String token) {
        log.info("validating activation token {}", token);
        Account account=accountRepository.findByActivationToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with activation token: " + token));
        if(account.getActivationToken()==null || account.getActivationTokenExpiry().isBefore(LocalDateTime.now())) {
                log.error("Invalid activation token: {}", account.getActivationToken().toString());
                throw new ErrorHandler(HttpStatus.BAD_REQUEST,"Token đã hết hạn");
        }
        return account;
    }

    @Override
    public Account resetPasswordforActiveAccount(String token,ResetPasswordDTO resetPasswordDTO) {
        log.info("reset password {}", resetPasswordDTO);
        Account account=accountRepository.findByActivationToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with activation token: " + token));
        if(account.getActivationToken()==null || account.getActivationTokenExpiry().isBefore(LocalDateTime.now())) {
            log.error("Invalid activation token: {}", account.getActivationToken().toString());
            throw new ErrorHandler(HttpStatus.BAD_REQUEST,"Token đã hết hạn");
        }
        if(!resetPasswordDTO.getNewPassword().equals(resetPasswordDTO.getConfirmPassword())) {
            throw new ErrorHandler(HttpStatus.BAD_REQUEST,"Confirm password doesn't match");
        }
        account.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
        account.setActivationToken(null);
        account.setActivationTokenExpiry(null);
        return accountRepository.save(account);
    }

    @Override
    public Page<AccountResponse> getAll(int page, int size, String sort, String filter, String search, boolean all) {
        try {
            log.info("start get all accounts");
            Specification<Account>sortable= RSQLJPASupport.toSort(sort);
            Specification<Account>filterable= RSQLJPASupport.toSpecification(filter);
            Specification<Account>searchable= SearchHelper.parseSearchToken(search, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            return accountRepository
                    .findAll(sortable.and(filterable).and(searchable),pageable)
                    .map(accountMapper::toResponse);
        }catch (Exception e){
            log.error("get account list error:{}",e.getMessage());
            throw e;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(email);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }
}
