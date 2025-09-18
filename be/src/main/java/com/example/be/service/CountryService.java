package com.example.be.service;

import com.example.be.dto.request.Country.CountryRequest;
import com.example.be.entity.Country;
import org.springframework.data.domain.Page;

public interface CountryService {
    void save(CountryRequest request);
    Page<Country>findAll(Integer page, Integer size, String sort, String filter, String searchField, String searchValue, boolean all);
    void update(CountryRequest request,Long id);
    Country findById(Long id);
}
