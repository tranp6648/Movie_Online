package com.example.be.helper;

import java.security.SecureRandom;
import java.text.Normalizer;

public class GeneralService {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();
    public static String toSlug(String input) {
        String slug = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "") // bỏ dấu
                .toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "") // bỏ ký tự đặc biệt
                .replaceAll("\\s+", "-") // khoảng trắng -> "-"
                .replaceAll("-{2,}", "-") // bỏ trùng "-"
                .replaceAll("^-|-$", ""); // bỏ "-" đầu/cuối
        return slug;
    }
    /**
     * Sinh mã code ngẫu nhiên (chỉ gồm chữ in hoa và số).
     *
     * @param length Độ dài mã cần sinh
     * @return Chuỗi code ngẫu nhiên
     */
    public static String generateCode(int length) {
        if(length <=0){
            throw new IllegalArgumentException("Length phải > 0");
        }
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }
}
