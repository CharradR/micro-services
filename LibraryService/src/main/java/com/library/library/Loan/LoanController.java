package com.library.library.Loan;

import com.library.library.book.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {
    private final loanRepository loanRepository;
    private final LoanService loanService;

    public LoanController(loanRepository loanRepository, LoanService loanService) {
        this.loanRepository = loanRepository;
        this.loanService = loanService;
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
                    "loanId", loan.getId()
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Erreur serveur : " + e.getMessage()));
        }
    }
}
