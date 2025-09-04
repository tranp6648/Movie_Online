package com.example.be.entity;

import com.example.be.Enum.BillingPeriod;
import com.example.be.Enum.PlanPriceStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "plan_prices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "plan_id")
    private Plan plan;
    @Column(nullable = false,precision = 20,scale = 0)
    private BigDecimal priceCents;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 16)
    private BillingPeriod billingPeriod;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 16)
    private PlanPriceStatus  planPriceStatus= PlanPriceStatus.ACTIVE;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
