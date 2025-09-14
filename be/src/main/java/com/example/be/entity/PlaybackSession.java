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
@Table(name = "playback_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaybackSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private Account user;
    @Column(name = "device_id")
    private String deviceId;     // mã thiết bị do client sinh (tv/phone/...)

    // Lưu IP dưới dạng chuỗi (DB có thể là INET, Hibernate map string ok)
    @Column(name = "ip")
    private String ip;

    @Column(name = "started_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "ended_at")
    private LocalDateTime endedAt;     // null = đang hoạt động

    // Tham chiếu đa hình tới Title hoặc Episode
    @Column(name = "ref_owner", nullable = false, columnDefinition = "BINARY(16)")
    private Long refOwner;
    @Enumerated(EnumType.STRING)
    @Column(name = "ref_kind", nullable = false, length = 16)
    private RefKind refKind;
    public enum RefKind { TITLE, EPISODE }
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
