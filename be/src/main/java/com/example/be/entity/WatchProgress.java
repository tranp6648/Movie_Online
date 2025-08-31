package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "watch_progress",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "ref_owner", "ref_kind"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    private Long refOwner;
    private String refKind; // "title" | "episode"

    private Integer positionSec = 0;
    private Integer durationSec;
    private Boolean completed = false;

    private LocalDateTime updatedAt = LocalDateTime.now();
}
