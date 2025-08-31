package com.example.be.entity;

import com.example.be.Enum.SubscriptionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "subscriptions",
indexes = @Index(name = "idx_subscription_user_active",columnList = "user_id"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "account_id",nullable = false)
    private Account account;
    @ManyToOne
    @JoinColumn(name = "plan_id",nullable = false)
    private Plan plan;
    private SubscriptionStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
}
