package com.example.be.config;

public class APIURL {
    public static final String[] URL_ANONYMOUS_POST = {
            "/api/account/register",
            "/api/account/login",
    };
    public static final String[] URL_SUPERADMIN_GET={
    };
    public static final String[] URL_ANONYMOUS_GET = {
            "/docs",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
    };
}
