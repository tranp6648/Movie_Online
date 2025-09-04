package com.example.be.service;

import com.example.be.dto.request.People.PeopleRequest;
import com.example.be.dto.response.People.PeopleResponse;
import com.example.be.entity.People;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface PeopleService {
    void save(PeopleRequest request, MultipartFile file);
    void update(PeopleRequest request, MultipartFile file,Long id);
    Page<PeopleResponse>getAll(Integer page, Integer size, String sort, String filter, String search, boolean all);
    PeopleResponse getById(Long id);
}
