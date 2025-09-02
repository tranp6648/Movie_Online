package com.example.be.service;

import com.example.be.dto.request.BannerPosition.BannerPositionRequest;
import com.example.be.entity.BannerPosition;
import org.springframework.data.domain.Page;

public interface BannerPositionService {
    void save(BannerPositionRequest bannerPositionRequest);
    void update(BannerPositionRequest bannerPositionRequest,Long id);
    Page<BannerPosition>getAll(Integer page, Integer size, String sort, String filter, String search, boolean all);
    BannerPosition getById(Long id);
}
