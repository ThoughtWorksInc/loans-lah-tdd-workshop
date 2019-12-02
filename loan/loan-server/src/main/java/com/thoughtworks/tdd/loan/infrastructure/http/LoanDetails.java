package com.thoughtworks.tdd.loan.infrastructure.http;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanDetails {
    private Long id;
    private String account;
    private int amount;
    private int durationInDays;
    private int interestRate;
    private BigDecimal totalOutstanding;
    private LocalDate takenAt;
    private String type;

    public LoanDetails() {
    }

    public LoanDetails(Long id, String account, int amount, int durationInDays, int interestRate, BigDecimal totalOutstanding, LocalDate takenAt, String type) {
        this.id = id;
        this.account = account;
        this.amount = amount;
        this.durationInDays = durationInDays;
        this.interestRate = interestRate;
        this.totalOutstanding = totalOutstanding;
        this.takenAt = takenAt;
        this.type = type;
    }

    @Override
    public String toString() {
        return "LoanDetails{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", amount=" + amount +
                ", durationInDays=" + durationInDays +
                ", interestRate=" + interestRate +
                ", totalOutstanding=" + totalOutstanding +
                ", takenAt=" + takenAt +
                '}';
    }

    public Long getId() {
        return id;
    }

    public String getAccount() {
        return account;
    }

    public int getAmount() {
        return amount;
    }

    public int getDurationInDays() {
        return durationInDays;
    }

    public int getInterestRate() {
        return interestRate;
    }

    public BigDecimal getTotalOutstanding() {
        return totalOutstanding;
    }

    public LocalDate getTakenAt() {
        return takenAt;
    }

    public String getType() {
        return type;
    }
}
