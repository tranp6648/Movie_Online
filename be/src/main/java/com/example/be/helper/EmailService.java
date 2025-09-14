package com.example.be.helper;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    @Async
    public void sendActivationEmail(String email,String fullName,String activationLink) throws MessagingException {
        Context context = new Context();
        context.setVariable("fullName", fullName);
        context.setVariable("email", email);
        context.setVariable("activationLink", activationLink);
        String htmlContent=templateEngine.process("account-activation", context);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true,"UTF-8");
        helper.setTo(email);
        helper.setSubject("TẠO TÀI KHOẢN THÀNH CÔNG");
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
