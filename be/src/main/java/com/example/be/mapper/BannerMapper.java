package com.example.be.mapper;

import com.example.be.dto.request.Banner.BannerRequest;
import com.example.be.dto.response.Banner.BannerResponse;
import com.example.be.entity.Banner;
import com.example.be.entity.BannerPosition;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BannerMapper {
    @Mapping(target = "id",ignore = true)
    @Mapping(source = "idBannerPosition",target = "position.id")
    Banner toEntity(BannerRequest bannerRequest);
    default Banner toEntity(BannerRequest dto, BannerPosition position) {
        if(dto==null)return null;
        Banner entity=toEntity(dto);
        entity.setPosition(position);
        return entity;
    }
    @Mapping(target = "id",ignore = true)
    @Mapping(source = "idBannerPosition",target = "position.id")
    void updateEntity(BannerRequest bannerRequest,@MappingTarget Banner banner);
    default void updateEntity(BannerRequest dto,Banner entity,BannerPosition position) {
        if(dto==null || entity==null)return;
        updateEntity(dto,entity);
        entity.setPosition(position);
    }
    @Mapping(source ="position.name",target = "position")
    @Mapping(source = "image.url",target = "image")
    BannerResponse toResponse(Banner banner);
}
