package com.example.be.dto.request.Plan;

import com.example.be.Enum.BillingPeriod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanPriceCreateRequest {
    private BigDecimal priceCents;
    private BillingPeriod billingPeriod;
}
