package com.example.be.dto.request.Banner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BannerRequest {
    private String title;
    private Long idBannerPosition;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
}
