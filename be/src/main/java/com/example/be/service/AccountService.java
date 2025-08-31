package com.example.be.service;

import com.example.be.entity.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
    Account findByEmail(String email);
}
