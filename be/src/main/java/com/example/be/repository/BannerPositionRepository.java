package com.example.be.repository;

import com.example.be.entity.BannerPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BannerPositionRepository extends JpaRepository<BannerPosition,Long>, JpaSpecificationExecutor<BannerPosition> {
}
