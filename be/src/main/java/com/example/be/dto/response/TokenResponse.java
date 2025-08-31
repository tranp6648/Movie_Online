package com.example.be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {
    private String refreshToken;
    private String accessToken;
    private long accessTokenExpiryAt;
    private long refreshTokenExpiryAt;
    private String role;
}
