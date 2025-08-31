package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Table(name = "plans")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int priceCents;
    @Comment("số lượng thiết bị tối đa")
    private int maxDevices;
    @Comment("Độ phân giải tối đa")
    private String maxResolution;
}
