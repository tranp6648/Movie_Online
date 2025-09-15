package com.example.be.dto.response.Account;

import com.example.be.Enum.AccountStatus;
import com.example.be.Enum.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountResponse {
    private Long id;
    private String fullName;
    private String email;
    private String roleId;
    private String createdAt;
    private String updatedAt;
    private Gender gender;
    private String phone;
    private String birthday;
    private AccountStatus status;
}
