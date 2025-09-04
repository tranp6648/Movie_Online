package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.Banner.BannerRequest;
import com.example.be.dto.response.Banner.BannerResponse;
import com.example.be.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/banner")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BannerController {
    private final BannerService bannerService;
    @PostMapping("/create")
    public ResponseEntity<RequestResponse<Void>> createBanner(@ModelAttribute BannerRequest bannerRequest,@RequestParam("file") MultipartFile file) {
        try {
            bannerService.save(bannerRequest,file);
            return ResponseEntity.ok(RequestResponse.success("Thêm Banner Thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>>update(@ModelAttribute BannerRequest bannerRequest, @PathVariable Long id,@RequestParam("file") MultipartFile file) {
        try {
            bannerService.update(bannerRequest,file,id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật Banner thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<BannerResponse>>> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(bannerService.getAll(page, size, sort, filter, search, all))));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
