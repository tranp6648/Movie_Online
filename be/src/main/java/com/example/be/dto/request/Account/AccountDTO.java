package com.example.be.dto.request.Account;

import com.example.be.Enum.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDTO {
    private String email;
    private String password;
    private Long idRole;
    private Gender gender;
    private String fullName;
    private String phone;
    private LocalDate birthday;
}
