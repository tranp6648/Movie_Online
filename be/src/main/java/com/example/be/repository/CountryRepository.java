package com.example.be.repository;

import com.example.be.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CountryRepository extends JpaRepository<Country,Long>, JpaSpecificationExecutor<Country> {
}
