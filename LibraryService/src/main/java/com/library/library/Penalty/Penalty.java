package com.library.library.Penalty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("penalties")
public class Penalty {
    @Id
    private String id;

    private String loanId;
    private String userId;
    private double amount;
    private boolean paid = false;

    private LocalDate issuedDate = LocalDate.now();
}