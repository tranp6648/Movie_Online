package com.example.be.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.account")
@Data
public class AccountProperties {
    private String activationUrl;
}
