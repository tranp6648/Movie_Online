package com.example.be.service;

import com.example.be.dto.request.Plan.PlanCreateRequest;
import com.example.be.dto.request.Plan.PlanUpdateRequest;
import com.example.be.entity.Plan;
import org.springframework.data.domain.Page;

public interface PlanService {
    void save(PlanCreateRequest request);
    void update(PlanUpdateRequest request,Long id);
    Page<Plan>getAll(Integer page, Integer size, String sort, String filter, String search, boolean all);
}
