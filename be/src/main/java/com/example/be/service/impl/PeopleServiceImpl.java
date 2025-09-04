package com.example.be.service.impl;

import com.example.be.Enum.MediaKind;
import com.example.be.config.SearchHelper;
import com.example.be.dto.request.People.PeopleRequest;
import com.example.be.dto.response.People.PeopleResponse;
import com.example.be.entity.Media;
import com.example.be.entity.People;
import com.example.be.helper.MediaUtils;
import com.example.be.mapper.PeopleMapper;
import com.example.be.repository.PeopleRepository;
import com.example.be.service.PeopleService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class PeopleServiceImpl implements PeopleService {
    @Autowired
    private PeopleMapper peopleMapper;
    @Autowired
    private MediaUtils mediaUtils;
    @Autowired
    private PeopleRepository peopleRepository;
    private static final List<String> SEARCH_FIELDS = List.of("name", "slug");

    @Override
    public void save(PeopleRequest request, MultipartFile file) {
        try {
            People people = peopleMapper.toEntity(request);
            if (file != null && !file.isEmpty()) {
                Media media = mediaUtils.save(file, "/people", MediaKind.IMAGE);
                people.setPhoto(media);
            }
            peopleRepository.save(people);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(PeopleRequest request, MultipartFile file, Long id) {
        try {
            Optional<People> optional = peopleRepository.findById(id);
            if (optional.isPresent()) {
                People people = optional.get();
                peopleMapper.updateEntity(request, people);
                if (file != null && !file.isEmpty()) {
                    Media media = mediaUtils.save(file, "/people", MediaKind.IMAGE);
                    people.setPhoto(media);
                }
                peopleRepository.save(people);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Page<PeopleResponse> getAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            Specification<People> sortable = RSQLJPASupport.toSort(sort);
            Specification<People> filterable = RSQLJPASupport.toSpecification(filter);
            Specification<People> searchable = SearchHelper.parseSearchToken(search, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            Page<PeopleResponse> responses = peopleRepository.findAll(sortable.and(filterable).and(searchable), pageable)
                    .map(peopleMapper::toResponse);
            return responses;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public PeopleResponse getById(Long id) {
        return peopleRepository.findById(id)
                .map(peopleMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Not found people with id =" + id));
    }
}
