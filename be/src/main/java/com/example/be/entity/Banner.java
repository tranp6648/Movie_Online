package com.example.be.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "banners",
        indexes = @Index(name = "idx_banner_active", columnList = "position_id, is_active, starts_at, ends_at, sort_order"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "position_id", nullable = false)
    private BannerPosition position;
    @Column(nullable = false, length = 255)
    private String title;

    @ManyToOne @JoinColumn(name = "image_media_id", nullable = false)
    private Media image;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;


    @Column(nullable = false)
    private Integer sortOrder = 0;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

}
