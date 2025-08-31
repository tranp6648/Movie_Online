package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "watchlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Watchlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "movie_id",nullable = false)
    private Movie movie;
    private LocalDateTime addedAt = LocalDateTime.now();
}
