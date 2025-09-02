package com.example.be.service.impl;

import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.entity.Account;
import com.example.be.entity.Role;
import com.example.be.exception.ErrorHandler;
import com.example.be.mapper.AccountMapper;
import com.example.be.repository.AccountRepository;
import com.example.be.repository.RoleRepository;
import com.example.be.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AccountMapper  accountMapper;
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
        accountRepository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> account = accountRepository.findByEmail(email);
        return account.orElseThrow(() -> new ErrorHandler(HttpStatus.UNAUTHORIZED, "Account not exist"));
    }
}
