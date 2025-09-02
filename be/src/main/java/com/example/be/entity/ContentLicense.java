package com.example.be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
