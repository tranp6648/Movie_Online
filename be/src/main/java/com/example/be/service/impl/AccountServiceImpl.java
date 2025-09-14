package com.example.be.service.impl;

import com.example.be.Enum.AccountStatus;
import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.dto.request.Account.ResetPasswordDTO;
import com.example.be.entity.Account;
import com.example.be.entity.Role;
import com.example.be.exception.ErrorHandler;
import com.example.be.helper.EmailService;
import com.example.be.mapper.AccountMapper;
import com.example.be.properties.AccountProperties;
import com.example.be.repository.AccountRepository;
import com.example.be.repository.RoleRepository;
import com.example.be.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(email);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }
}
