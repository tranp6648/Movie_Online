package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.BannerPosition.BannerPositionRequest;
import com.example.be.entity.BannerPosition;
import com.example.be.service.BannerPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/banner-position")
public class BannerPositionController {
    @Autowired
    private BannerPositionService bannerPositionService;

    @PostMapping("/create")
    public ResponseEntity<RequestResponse<Void>> create(@RequestBody BannerPositionRequest bannerPositionRequest) {
        try {
            bannerPositionService.save(bannerPositionRequest);
            return ResponseEntity.ok(RequestResponse.success("Thêm vị trí banner thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>> update(@PathVariable Long id, @RequestBody BannerPositionRequest bannerPositionRequest) {
        try {
            bannerPositionService.update(bannerPositionRequest, id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật vị trí banner thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<BannerPosition>>> getAll(@RequestParam(defaultValue = "1") int page,
                                                                                @RequestParam(defaultValue = "5") int size,
                                                                                @RequestParam(defaultValue = "id,desc") String sort,
                                                                                @RequestParam(required = false) String filter,
                                                                                @RequestParam(required = false) String search,
                                                                                @RequestParam(required = false) boolean all) {
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(bannerPositionService.getAll(page, size, sort, filter, search, all))));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<RequestResponse<BannerPosition>> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(RequestResponse.success(bannerPositionService.getById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
