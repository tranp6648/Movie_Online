package com.example.be.mapper;

import com.example.be.dto.request.People.PeopleRequest;
import com.example.be.dto.response.People.PeopleResponse;
import com.example.be.entity.People;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PeopleMapper {
    PeopleMapper INSTANCE = Mappers.getMapper(PeopleMapper.class);
    @Mapping(target = "slug",expression = "java(generateSlug(request.getName()))")
    @Mapping(source = "birthday", target = "birthDate")
    People toEntity(PeopleRequest request);
    @Mapping(source = "photo.url",target = "image")
    PeopleResponse toResponse(People people);
    void updateEntity(PeopleRequest request,@MappingTarget People people);
    default String generateSlug(String name){
        if(name==null)return null;
        String slug = name.toLowerCase();
        slug = java.text.Normalizer.normalize(slug, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        slug = slug.replaceAll("[^a-z0-9]+", "-");
        slug = slug.replaceAll("^-+|-+$", "");
        return slug;
    }
}
