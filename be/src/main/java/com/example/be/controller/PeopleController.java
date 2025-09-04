package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.People.PeopleRequest;
import com.example.be.dto.response.People.PeopleResponse;
import com.example.be.service.PeopleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/people")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PeopleController {
    private final PeopleService peopleService;
    @PostMapping("/create")
    public ResponseEntity<RequestResponse<Void>>create(@ModelAttribute PeopleRequest peopleRequest,@RequestParam(value = "image",required=false) MultipartFile image){
        try {
            peopleService.save(peopleRequest,image);
            return ResponseEntity.ok(RequestResponse.success("Thêm people thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>>update(@ModelAttribute PeopleRequest peopleRequest, @PathVariable Long id,@RequestParam(value = "image",required=false) MultipartFile image){
        try {
            peopleService.update(peopleRequest,image,id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật people thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<PeopleResponse>>> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all){
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(peopleService.getAll(page, size, sort, filter, search, all))));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
