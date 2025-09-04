package com.example.be.service;

import com.example.be.dto.request.Banner.BannerRequest;
import com.example.be.dto.response.Banner.BannerResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface BannerService {
    void save(BannerRequest bannerRequest, MultipartFile file);
    void update(BannerRequest bannerRequest, MultipartFile file,Long id);
    Page<BannerResponse>getAll(Integer page, Integer size, String sort, String filter, String search, boolean all);
}
