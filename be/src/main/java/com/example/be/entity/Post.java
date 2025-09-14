package com.example.be.entity;

import com.example.be.Enum.PostStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts",
indexes = {
        @Index(name = "idx_posts_status_pub",columnList = "status,published_at"),
        @Index(name = "idx_posts_author",columnList = "author_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "author_id",nullable = false)
    private Account author;
    @Column(nullable = false, length = 255)
    private String title;
    @Column(nullable = false, unique = true, length = 255)
    private String slug;
    @Column(columnDefinition = "TEXT")
    private String excerpt;
    @Lob
    private String content;
    @ManyToOne
    @JoinColumn(name = "cover_image_id")
    private Media coverImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 12)
    private PostStatus status = PostStatus.DRAFT;
    private LocalDateTime publishedAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @ManyToMany
    @JoinTable(name = "post_category_map",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<PostCategory> categories = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<PostTag> tags = new ArrayList<>();

}
