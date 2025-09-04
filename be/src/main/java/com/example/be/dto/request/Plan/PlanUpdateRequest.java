package com.example.be.dto.request.Plan;

import com.example.be.Enum.DeviceType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class PlanUpdateRequest {
    private String name;
    private int maxDevices;
    private String maxResolution;
    private Set<DeviceType>devices;
}
