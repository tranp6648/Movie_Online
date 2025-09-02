package com.example.be.mapper;

import com.example.be.dto.request.Genre.GenreRequest;
import com.example.be.entity.Genre;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface GenreMapper {
    @Mapping(target = "id", ignore = true)
    Genre toEntity(GenreRequest genreRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id",ignore = true)
    void update(GenreRequest genreRequest,@MappingTarget Genre genre);
}
