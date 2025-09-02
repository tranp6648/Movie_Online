package com.example.be.service.impl;

import com.example.be.config.SearchHelper;
import com.example.be.dto.request.Genre.GenreRequest;
import com.example.be.entity.Genre;
import com.example.be.mapper.GenreMapper;
import com.example.be.repository.GenreRepository;
import com.example.be.service.GenreService;
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
public class GenreServiceImpl implements GenreService {
    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private GenreMapper genreMapper;
    private static final List<String> SEARCH_FIELDS = List.of("name","slug");
    @Override
    public void save(GenreRequest genreRequest) {
        try {
            Genre genre = genreMapper.toEntity(genreRequest);
            genreRepository.save(genre);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void update(GenreRequest genreRequest,Long id) {
        try {
            Genre genre=genreRepository.getReferenceById(id);
            genreMapper.update(genreRequest,genre);
            genreRepository.save(genre);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public Page<Genre> findAll(Integer page, Integer size, String sort, String filter, String search, boolean all) {
        try {
            Specification<Genre> sortable= RSQLJPASupport.toSort(sort);
            Specification<Genre>filterable= RSQLJPASupport.toSpecification(filter);
            Specification<Genre>searchable= SearchHelper.parseSearchToken(search, SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            Page<Genre>response=genreRepository.findAll(sortable.and(filterable).and(searchable), pageable);
            return response;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Genre findById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Genre not found with id: " + id));
    }
}
