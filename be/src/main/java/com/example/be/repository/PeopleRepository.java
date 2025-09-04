package com.example.be.repository;

import com.example.be.entity.People;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PeopleRepository extends JpaRepository<People,Long>, JpaSpecificationExecutor<People> {
}
