package com.example.be.controller;

import com.example.be.config.JwtService;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.Account.AccountDTO;
import com.example.be.dto.request.Account.ResetPasswordDTO;
import com.example.be.dto.request.LoginDTO;
import com.example.be.dto.response.TokenResponse;
import com.example.be.entity.Account;
import com.example.be.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AccountController {
    @Autowired
    private AccountService accountService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/register")
    public ResponseEntity<RequestResponse<Void>>register(@RequestBody AccountDTO accountDTO){
        try {
            accountService.save(accountDTO);
            return ResponseEntity.ok(RequestResponse.success("Account registered successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PostMapping("/reset-password-active-account")
    public ResponseEntity<RequestResponse<Void>>resetPasswordForActiveAccount(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO, @RequestParam String token, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            String errorMessage=bindingResult.getFieldErrors().stream()
                    .map(error->error.getDefaultMessage())
                    .findFirst()
                    .orElse("Dữ liệu không hợp lệ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(RequestResponse.error(errorMessage));
        }
        try {
            accountService.resetPasswordforActiveAccount(token, resetPasswordDTO);
            return ResponseEntity.ok(RequestResponse.success("Account reset successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/validate-token")
    public ResponseEntity<RequestResponse<Void>>validateToken(@RequestParam("token") String token){
        try{
            accountService.validateActivationToken(token);
            return ResponseEntity.ok(RequestResponse.success("Token validated successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PostMapping("/login")
    public ResponseEntity<RequestResponse<TokenResponse>> login(@RequestBody LoginDTO loginDTO) {
        try {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getUsername(),
                            loginDTO.getPassword()
                    )
            );
            if (authentication.isAuthenticated()) {
                Account account = (Account) authentication.getPrincipal();
                String accessToken = jwtService.generateAccessToken(account.getEmail(), account.getId(), account.getRole().getName());
                String refreshToken = jwtService.generateRefreshToken(account.getEmail(), account.getId(), account.getRole().getName());
                long accessTokenExpiryAt = jwtService.getAccessTokenExpiryAt();
                long refreshTokenExpiryAt = jwtService.getRefreshTokenExpiryAt();
                String role = jwtService.extractRole(accessToken);
                return ResponseEntity.ok(RequestResponse.success(
                        new TokenResponse(refreshToken, accessToken, accessTokenExpiryAt, refreshTokenExpiryAt, role)
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(RequestResponse.error("Invalid username or password"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
