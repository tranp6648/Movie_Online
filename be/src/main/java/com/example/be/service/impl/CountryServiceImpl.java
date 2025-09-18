package com.example.be.service.impl;

import com.example.be.config.SearchHelper;
import com.example.be.dto.request.Country.CountryRequest;
import com.example.be.entity.Country;
import com.example.be.helper.GeneralService;
import com.example.be.repository.CountryRepository;
import com.example.be.service.CountryService;
import io.github.perplexhub.rsql.RSQLJPASupport;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryRepository countryRepository;
    private static final List<String> SEARCH_FIELDS = List.of("name","code");
    @Override
    public void save(CountryRequest request) {
        try {
            log.info("save country request={}",request);
            Country country=new Country();
            country.setName(request.getName());
            country.setCode(GeneralService.generateCode(10));
            countryRepository.save(country);
        }catch (Exception e){
            log.error("save country request error:{}",e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public Page<Country> findAll(Integer page, Integer size, String sort, String filter, String searchField, String searchValue, boolean all) {
        try {
            Specification<Country> sortable= RSQLJPASupport.toSort(sort);
            Specification<Country> filterable= RSQLJPASupport.toSpecification(filter);
            Specification<Country> searchable= SearchHelper.buildSearchSpec(searchField,searchValue,SEARCH_FIELDS);
            Pageable pageable = all ? Pageable.unpaged() : PageRequest.of(page - 1, size);
            Page<Country>response=countryRepository.findAll(sortable.and(filterable).and(searchable), pageable);
            return response;
        }catch (Exception e){
            log.error("find country request error:{}",e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void update(CountryRequest request, Long id) {
        try {
        log.info("update country request={}",request);
            Optional<Country>country=countryRepository.findById(id);
            if(country.isPresent()){
                Country countryOptional=country.get();
                countryOptional.setName(request.getName());
                countryRepository.save(countryOptional);
            }
        }catch (Exception e){
            log.error("update country request error:{}",e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public Country findById(Long id) {
        return countryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + id));
    }
}
