package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "content_licenses",
        indexes = @Index(name = "idx_license_movie_country", columnList = "movie_id, country"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentLicense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id",nullable = false)
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan; // nullable = all plans

    private LocalDate startsAt;
    private LocalDate endsAt;
}
