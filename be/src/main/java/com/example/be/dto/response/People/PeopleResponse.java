package com.example.be.dto.response.People;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PeopleResponse {
    private Long id;
    private String name;
    private LocalDate birthDate;
    private String image;
    private String createdAt;
}
