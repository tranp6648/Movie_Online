package com.example.be.entity;

import com.example.be.Enum.MovieType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "movies")
public class    Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private MovieType type;
    @Column(columnDefinition = "TEXT")
    private String overview;
    private LocalDate releaseDate;
    private Integer runTimeMin;
    @Column(nullable = false,length = 255)
    private String name;
    @Column(precision = 3, scale = 2)
    private BigDecimal ratingAvg = BigDecimal.ZERO;
    @Column(name = "poster_url")
    private String posterUrl;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "poster_media_id")
    private Media poster;
    @Column(nullable = false,unique = true,length = 255)
    private String slug;
    @ManyToMany
    @JoinTable(
            name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre>genres=new ArrayList<>();

}
