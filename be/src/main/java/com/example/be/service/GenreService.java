package com.example.be.service;

import com.example.be.dto.request.Genre.GenreRequest;
import com.example.be.entity.Genre;
import org.springframework.data.domain.Page;

public interface GenreService {
    void save(GenreRequest genreRequest);
    void update(GenreRequest genreRequest,Long id);
    Page<Genre>findAll(Integer page, Integer size, String sort, String filter, String search, boolean all);
    Genre findById(Long id);
}
