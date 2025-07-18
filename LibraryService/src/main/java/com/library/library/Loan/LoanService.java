package com.library.library.Loan;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.library.library.book.Book;
import com.library.library.book.bookRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class LoanService {
    private final loanRepository loanRepo;
    private final bookRepository bookRepo;
    private final JavaMailSender mailSender;

    public LoanService(loanRepository loanRepo, bookRepository bookRepo, JavaMailSender mailSender) {
        this.loanRepo = loanRepo;
        this.bookRepo = bookRepo;
        this.mailSender = mailSender;
    }
    public Loan createLoan(String bookId, String userEmail) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        if (book.getQuantity() <= 0)
            throw new RuntimeException("Livre non disponible");

        // Création du prêt
        Loan loan = new Loan();
        loan.setBookId(bookId);
        loan.setUserEmail(userEmail); // userId = email
        loan.setLoanDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(14)); // exemple 14 jours

        loanRepo.save(loan);

        // Mise à jour du stock
        book.setQuantity(book.getQuantity() - 1);
        bookRepo.save(book);

        // Envoi email
        sendConfirmationEmail(userEmail, book, loan);

        return loan;
    }
    private void sendConfirmationEmail(String to, Book book, Loan loan) {
        String subject = "Confirmation d'emprunt : " + book.getTitle();

        String body = String.format("""
        Bonjour,

        Vous avez emprunté le livre :

        📘 Titre     : %s
        ✍️ Auteur    : %s
        📂 Catégorie : %s

        📅 Emprunt   : %s
        ⏳ Retour    : %s

        Merci et bonne lecture !

        - Votre bibliothèque
    """, book.getTitle(), book.getAuthor(), book.getCategory(),
                loan.getLoanDate(), loan.getDueDate());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tunisys05@gmail.com"); // 👈 important !
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public void sendAvertissementEmail(String loanId) {
        Loan loan = loanRepo.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Prêt introuvable"));

        if (!loan.getDueDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("La date d’échéance n’est pas encore dépassée.");
        }

        Book book = bookRepo.findById(loan.getBookId())
                .orElseThrow(() -> new RuntimeException("Livre introuvable"));

        String subject = "📢 Avertissement - Livre non retourné : " + book.getTitle();

        String body = String.format("""
        Bonjour,

        Ceci est un rappel que vous n'avez pas encore retourné le livre suivant :

        📘 Titre     : %s
        ✍️ Auteur    : %s
        📂 Catégorie : %s

        ⏳ Date limite de retour : %s

        Merci de retourner le livre dès que possible pour éviter toute pénalité.

        - Votre bibliothèque
    """, book.getTitle(), book.getAuthor(), book.getCategory(), loan.getDueDate());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tunisys05@gmail.com");
        message.setTo(loan.getUserEmail());
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }



}
