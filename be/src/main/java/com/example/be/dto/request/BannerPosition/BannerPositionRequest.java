package com.example.be.dto.request.BannerPosition;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class BannerPositionRequest {
    private String code;
    private String name;
    private Integer width;
    private Integer height;
}
