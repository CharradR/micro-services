package com.library.library.Loan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface loanRepository extends MongoRepository<Loan, String> {
}
