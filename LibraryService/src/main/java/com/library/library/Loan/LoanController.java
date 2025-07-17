package com.library.library.Loan;

import com.library.library.book.Book;
import com.library.library.book.bookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    private final loanRepository loanRepository;
    private final LoanService loanService;
    @Autowired
    private bookRepository bookRepository;

    public LoanController(loanRepository loanRepository, LoanService loanService) {
        this.loanRepository = loanRepository;
        this.loanService = loanService;
        this.bookRepository = bookRepository;

    }

    @GetMapping
    public List<Loan> getLoansList() {
        return loanRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> borrowBook(@RequestBody Map<String, String> request) {
        try {
            String bookId = request.get("bookId");
            String email = request.get("email");

            if (bookId == null || email == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "bookId et email requis"));
            }

            Loan loan = loanService.createLoan(bookId, email);
            return ResponseEntity.ok(Map.of(
                    "message", "Emprunt enregistré avec succès",
                    "loanId", loan.getId()));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur serveur : " + e.getMessage()));
        }
    }

    @PostMapping("/{loanId}/send-avertissement")
    public ResponseEntity<Map<String, String>> sendAvertissement(@PathVariable String loanId) {
        try {
            loanService.sendAvertissementEmail(loanId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Avertissement envoyé avec succès.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{loanId}/return")
    public ResponseEntity<?> returnBook(@PathVariable String loanId) {
        try {
            // Récupérer le prêt
            Loan loan = loanRepository.findById(loanId)
                    .orElseThrow(() -> new RuntimeException("Prêt non trouvé"));

            if (loan.isReturned()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Ce prêt est déjà retourné"));
            }

            // Mettre à jour le statut returned
            loan.setReturned(true);
            loanRepository.save(loan);

            // Incrémenter la quantité du livre
            Book book = bookRepository.findById(loan.getBookId())
                    .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

            book.setQuantity(book.getQuantity() + 1);
            bookRepository.save(book);

            return ResponseEntity.ok(Map.of("message", "Livre retourné avec succès"));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur serveur : " + e.getMessage()));
        }
    }

    // ❌ Supprimer un loan
    @DeleteMapping("/{id}")
    public void deleteLoan(@PathVariable String id) {
        loanRepository.deleteById(id);
    }

}
