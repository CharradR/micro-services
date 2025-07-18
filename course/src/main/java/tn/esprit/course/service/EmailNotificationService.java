package tn.esprit.course.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendCourseAssignedEmail(String to, String courseName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Nouveau cours attribué");
            helper.setText("<p>Bonjour,</p>" +
                    "<p>Un nouveau cours vous a été attribué : <b>" + courseName + "</b></p>" +
                    "<p>Bonne journée !</p>", true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erreur d'envoi d'email : " + e.getMessage());
        }
    }
}
