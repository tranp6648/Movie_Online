package com.example.be.dto.response.Banner;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BannerResponse {
    private Long id;
    private String position;
    private String title;
    private String image;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
