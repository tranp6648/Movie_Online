package com.example.be.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "episodes",
uniqueConstraints = @UniqueConstraint(columnNames = {"season_id","episode_number"}))
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "season_id",nullable = false)
    private Season season;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id",nullable = false)
    private Movie movie;
    @Column(name = "episode_number", nullable = false)
    private Integer episodeNumber;
    @Column(columnDefinition = "TEXT")
    private String overview;

    private Integer runtimeMin;
    private LocalDate airDate;
}
