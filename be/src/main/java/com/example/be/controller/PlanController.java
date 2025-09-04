package com.example.be.controller;

import com.example.be.dto.PageResponse;
import com.example.be.dto.RequestResponse;
import com.example.be.dto.request.Plan.PlanCreateRequest;
import com.example.be.dto.request.Plan.PlanUpdateRequest;
import com.example.be.entity.Plan;
import com.example.be.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PlanController {
    private final PlanService planService;
    @PostMapping("/create")
    public ResponseEntity<RequestResponse<Void>>create(@RequestBody PlanCreateRequest request){
        try {
            planService.save(request);
            return ResponseEntity.ok(RequestResponse.success("Thêm gói thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<RequestResponse<Void>>update(@PathVariable Long id,@RequestBody PlanUpdateRequest request){
        try {
            planService.update(request, id);
            return ResponseEntity.ok(RequestResponse.success("Cập nhật gói thành công"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
    @GetMapping("/getAll")
    public ResponseEntity<RequestResponse<PageResponse<Plan>>> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all){
        try {
            return ResponseEntity.ok(RequestResponse.success(new PageResponse<>(planService.getAll(page,size,sort,filter,search,all))));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(RequestResponse.error("An error occurred: " + e.getMessage()));
        }
    }
}

