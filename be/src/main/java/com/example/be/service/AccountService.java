package com.example.be.service;

import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.dto.request.Account.ResetPasswordDTO;
import com.example.be.entity.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {
    Account findByEmail(String email);
    void save(AccountDTO accountDTO);
    Account validateActivationToken(String token);
    Account resetPasswordforActiveAccount(String token,ResetPasswordDTO resetPasswordDTO);
}
