package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Cast;
import org.hibernate.annotations.Comment;

@Entity
@Table(name = "cast_credits")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CastCredit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    @ManyToOne
    @JoinColumn(name = "person_id")
    private People person;
    @Comment("vai trò trong phim")
    private String role;
    @Comment("tên nhân vật")
    private String characterName;
    @Comment("số thứ tự xuất hiện")
    private Integer billingOrder;
}
