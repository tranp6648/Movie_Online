package com.example.be.service.impl;

import com.example.be.config.SearchHelper;
import com.example.be.dto.request.Plan.PlanCreateRequest;
import com.example.be.dto.request.Plan.PlanPriceCreateRequest;
import com.example.be.dto.request.Plan.PlanUpdateRequest;
import com.example.be.entity.Plan;
import com.example.be.entity.PlanPrice;
import com.example.be.mapper.PlanMapper;
import com.example.be.repository.PlanPriceRepository;
import com.example.be.repository.PlanRepository;
import com.example.be.service.PlanService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {
    private final PlanRepository planRepository;
    private final PlanPriceRepository planPriceRepository;
    private final PlanMapper planMapper;
    private static final List<String>SEARCH_FIELDS = List.of("name","maxResolution","devices");
    @Override
    @Transactional
    public void save(PlanCreateRequest request) {
        try {
            Plan plan = planMapper.toEntity(request);
            plan = planRepository.save(plan);
            for (PlanPriceCreateRequest priceReq : request.getPlanPrices()) {
                PlanPrice price = planMapper.toEntity(priceReq);
                price.setPlan(plan);
                planPriceRepository.save(price);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(PlanUpdateRequest request, Long id) {
        try {
            Optional<Plan> plan = planRepository.findById(id);
            if (plan.isPresent()) {
                Plan planEntity = plan.get();
                planMapper.updateEntity(request, planEntity);
                planRepository.save(planEntity);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Page<Plan> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            Specification<Plan>sortable= RSQLJPASupport.toSort(sort);
            Specification<Plan>filterable= RSQLJPASupport.toSpecification(filter);
            Specification<Plan>searchable= SearchHelper.parseSearchToken(search,SEARCH_FIELDS);
            Pageable pageable=all ? Pageable.unpaged() : PageRequest.of(page,size);
            Page<Plan>responses=planRepository.findAll(sortable.and(filterable).and(searchable), pageable);
            return responses;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
