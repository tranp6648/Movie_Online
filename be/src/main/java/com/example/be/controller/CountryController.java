package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.Country.CountryRequest;
import com.example.be.entity.Country;
import com.example.be.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    @Autowired
    private CountryService countryService;
    @PostMapping("/create")
    public ResponseEntity<RequestResponse<Void>>create(@RequestBody  CountryRequest countryRequest) {
        try {
            countryService.save(countryRequest);
            return ResponseEntity.ok(RequestResponse.success("Thêm Country thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>> update(@PathVariable Long id, @RequestBody CountryRequest countryRequest) {
        try {
            countryService.update(countryRequest,id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật Country thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<RequestResponse<Country>> findById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(RequestResponse.success(countryService.findById(id)));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<Country>>>getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false)  String searchField,
            @RequestParam(required = false)  String searchValue,
            @RequestParam(required = false) boolean all
    ){
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(countryService.findAll(page, size, sort, filter, searchField, searchValue, all))));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}
