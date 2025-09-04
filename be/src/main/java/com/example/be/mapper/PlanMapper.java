package com.example.be.mapper;

import com.example.be.dto.request.Plan.PlanCreateRequest;
import com.example.be.dto.request.Plan.PlanPriceCreateRequest;
import com.example.be.dto.request.Plan.PlanUpdateRequest;
import com.example.be.entity.Plan;
import com.example.be.entity.PlanPrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PlanMapper {
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "updatedAt",ignore = true)
    Plan toEntity(PlanCreateRequest planCreateRequest);
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "plan",ignore = true)
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "updatedAt",ignore = true)
    PlanPrice toEntity(PlanPriceCreateRequest request);
    Plan updateEntity(PlanUpdateRequest request,@MappingTarget Plan plan);
}
