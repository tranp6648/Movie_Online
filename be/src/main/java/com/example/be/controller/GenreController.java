package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.Genre.GenreRequest;
import com.example.be.entity.Genre;
import com.example.be.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/genre")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GenreController {
    @Autowired
    private GenreService genreService;
    @PostMapping(value = "/create")
    public ResponseEntity<RequestResponse<Void>> create(@RequestBody GenreRequest genreRequest){
        try {
            genreService.save(genreRequest);
            return ResponseEntity.ok(RequestResponse.success("Thêm thể loại thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>> update(@PathVariable Long id, @RequestBody GenreRequest genreRequest){
        try {
            genreService.update(genreRequest,id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật Genre thành công "));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<RequestResponse<Genre>> findById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(RequestResponse.success(genreService.findById(id)));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<Genre>>> getAll(@RequestParam(defaultValue = "1") int page,
                                                                       @RequestParam(defaultValue = "5") int size,
                                                                       @RequestParam(defaultValue = "id,desc") String sort,
                                                                       @RequestParam(required = false) String filter,
                                                                       @RequestParam(required = false)  String searchField,
                                                                       @RequestParam(required = false)  String searchValue,
                                                                       @RequestParam(required = false) boolean all){
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(genreService.findAll(page,size,sort,filter,searchField,searchValue,all))));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
