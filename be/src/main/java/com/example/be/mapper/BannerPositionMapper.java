package com.example.be.mapper;

import com.example.be.dto.request.BannerPosition.BannerPositionRequest;
import com.example.be.entity.BannerPosition;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BannerPositionMapper {
    @Mapping(target = "id", ignore = true)
    BannerPosition toEntity(BannerPositionRequest bannerPositionRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id",ignore = true)
    void update(BannerPositionRequest bannerPositionRequest,@MappingTarget BannerPosition bannerPosition);
}
