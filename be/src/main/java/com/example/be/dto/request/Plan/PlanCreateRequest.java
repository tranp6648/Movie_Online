package com.example.be.dto.request.Plan;

import com.example.be.Enum.DeviceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanCreateRequest {
    private String name;
    private int maxDevices;
    private String maxResolution;
    private Set<DeviceType>devices;
    private List<PlanPriceCreateRequest> planPrices;
}
