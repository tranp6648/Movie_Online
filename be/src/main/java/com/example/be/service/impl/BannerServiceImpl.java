package com.example.be.service.impl;

import com.example.be.Enum.MediaKind;
import com.example.be.config.SearchHelper;
import com.example.be.dto.request.Banner.BannerRequest;
import com.example.be.dto.response.Banner.BannerResponse;
import com.example.be.entity.Banner;
import com.example.be.entity.BannerPosition;
import com.example.be.entity.Media;
import com.example.be.helper.MediaUtils;
import com.example.be.mapper.BannerMapper;
import com.example.be.repository.BannerPositionRepository;
import com.example.be.repository.BannerRepository;
import com.example.be.service.BannerService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class BannerServiceImpl implements BannerService {
    @Autowired
    private MediaUtils generalService;
    @Autowired
    private BannerRepository bannerRepository;
    @Autowired
    private BannerMapper bannerMapper;
    private static final List<String> SEARCH_FIELDS = List.of("position","title");
    @Autowired
    private BannerPositionRepository bannerPositionRepository;

    @Override
    public void save(BannerRequest bannerRequest, MultipartFile file) {
        try {
          BannerPosition bannerPosition= bannerPositionRepository.findById(bannerRequest.getIdBannerPosition())
                    .orElseThrow(() -> new EntityNotFoundException("Banner Position not found with id: " + bannerRequest.getIdBannerPosition()));
            Banner banner = bannerMapper.toEntity(bannerRequest,bannerPosition);
            if (file != null && !file.isEmpty()) {
                Media media = generalService.save(file, "/banner", MediaKind.IMAGE);
                banner.setImage(media);
            }
            bannerRepository.save(banner);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Override
    public void update(BannerRequest bannerRequest, MultipartFile file, Long id) {
        try {
            Optional<Banner>bannerOptional = bannerRepository.findById(id);
            if (bannerOptional.isPresent()) {
                Banner banner = bannerOptional.get();
                BannerPosition bannerPosition= bannerPositionRepository.findById(bannerRequest.getIdBannerPosition())
                        .orElseThrow(() -> new EntityNotFoundException("Banner Position not found with id: " + bannerRequest.getIdBannerPosition()));
                bannerMapper.updateEntity(bannerRequest,banner,bannerPosition);
                if(file!=null && !file.isEmpty()) {
                    Media media = generalService.save(file, "/banner", MediaKind.IMAGE);
                    banner.setImage(media);
                }
                bannerRepository.save(banner);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Page<BannerResponse> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            Specification<Banner>sortable= RSQLJPASupport.toSort(sort);
            Specification<Banner>filterable= RSQLJPASupport.toSpecification(filter);
            Specification<Banner>searchable= SearchHelper.parseSearchToken(search, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            Page<BannerResponse>responses=bannerRepository.findAll(sortable.and(filterable).and(searchable), pageable).map(bannerMapper::toResponse);
            return responses;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
