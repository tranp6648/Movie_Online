package com.example.be.service.impl;

import com.example.be.config.SearchHelper;
import com.example.be.dto.request.BannerPosition.BannerPositionRequest;
import com.example.be.entity.BannerPosition;
import com.example.be.mapper.BannerPositionMapper;
import com.example.be.repository.BannerPositionRepository;
import com.example.be.service.BannerPositionService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerPositionServiceImpl implements BannerPositionService {
    @Autowired
    private BannerPositionRepository   bannerPositionRepository;
    @Autowired
    private BannerPositionMapper bannerPositionMapper;
    private static final List<String> SEARCH_FIELDS = List.of("name","code");
    @Override
    public void save(BannerPositionRequest bannerPositionRequest) {
        try {
            BannerPosition bannerPosition = bannerPositionMapper.toEntity(bannerPositionRequest);
            bannerPositionRepository.save(bannerPosition);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void update(BannerPositionRequest bannerPositionRequest, Long id) {
        try {
            BannerPosition bannerPosition=bannerPositionRepository.getReferenceById(id);
            bannerPositionMapper.update(bannerPositionRequest,bannerPosition);
            bannerPositionRepository.save(bannerPosition);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Page<BannerPosition> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            Specification<BannerPosition>sortable= RSQLJPASupport.toSort(sort);
            Specification<BannerPosition>filterable= RSQLJPASupport.toSpecification(filter);
            Specification<BannerPosition>searchable= SearchHelper.parseSearchToken(search, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            Page<BannerPosition>response=bannerPositionRepository.findAll(sortable.and(filterable).and(searchable), pageable);
            return response;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public BannerPosition getById(Long id) {
        return bannerPositionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Banner Position not found with id: " + id));
    }
}
