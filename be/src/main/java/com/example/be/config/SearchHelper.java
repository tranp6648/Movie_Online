package com.example.be.config;

import io.github.perplexhub.rsql.RSQLJPASupport;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class SearchHelper {
    public static <T> Specification<T> parseSearchToken(String search, List<String> searchFields) {
        return search != null && !search.isBlank() && searchFields != null && !searchFields.isEmpty()
                ? (Specification)searchFields.stream()
                .map((field) -> field + "=like='" + search.trim() + "'")
                .collect(Collectors.collectingAndThen(Collectors.joining(","), RSQLJPASupport::toSpecification))
                : RSQLJPASupport.toSpecification((String)null);
    }
    public static <T> Specification<T> parseSearchKeyValue(String searchField, String searchValue) {
        return searchField != null && !searchField.isBlank() && searchValue != null && !searchValue.isBlank()
                ? RSQLJPASupport.toSpecification(searchField + "=like='" + searchValue.trim() + "'")
                : RSQLJPASupport.toSpecification((String) null);
    }
    public static <T> Specification<T> buildSearchSpec(String searchField, String searchValue, List<String> searchFields) {
        if (searchField == null || searchField.isBlank()) {
            return parseSearchToken(searchValue, searchFields);
        }
        return parseSearchKeyValue(searchField, searchValue);
    }
}
