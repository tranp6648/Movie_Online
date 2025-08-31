package com.example.be.entity;

import com.example.be.Enum.AssetKind;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Entity
@Table(name = "assets",indexes = {
        @Index(name = "idx_assets_owner",columnList = "ref_owner,ref_kind")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ref_owner",nullable = false)
    private Long refOwner;
    @Column(name = "ref_kind",nullable = false)
    private String refKind;
    @Enumerated(EnumType.STRING)
    private AssetKind kind;
    private String url;
    @Comment("mã ngôn ngữ")
    private String language;
    @Comment("định dạng encode (VD: H.264, H.265, AAC).")
    private String codec;
    @Comment("bitrate của file (để chọn chất lượng stream).")
    private Integer bitrateKbps;
    @Comment("có phải HDR (High Dynamic Range) hay không.")
    private Boolean hdr;
    @Comment("độ phân giải (720p, 1080p, 4K…).")
    private String resolution;

}
