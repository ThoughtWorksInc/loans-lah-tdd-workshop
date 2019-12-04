package com.thoughtworks.tdd.loan.domain;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String account;
    @Column
    private int amount;
    @Column
    private LocalDate takenAt;
    @Column
    private int durationInDays;
    @Column
    private int interestRate;

    @Column
    @Convert(converter = LoanTypeAttributeConverter.class)
    private LoanType type = new OneTimeInterestLoanType();

    private Loan() {
    }

    public Loan(Long id, String account, int amount, LocalDate takenAt, int durationInDays) {
        this(account, amount, takenAt, durationInDays);
        this.id = id;
    }

    public Loan(String account, int amount, LocalDate takenAt, int durationInDays) {
        validateLoan(account, amount, takenAt, durationInDays);
        this.account = account;
        this.amount = amount;
        this.takenAt = takenAt;
        this.durationInDays = durationInDays;
        this.interestRate = type.interestRateFromDuration(durationInDays);
    }

    private void validateLoan(String account, int amount, LocalDate takenAt, int durationInDays) {
        Objects.requireNonNull(account, "account can not be null");
        Objects.requireNonNull(takenAt, "takenAt date can not be null");
        if (amount < 0 || durationInDays < 0) {
            throw new IllegalArgumentException("amount or duration or interest rate cannot be negative");
        }
    }

    public Long getId() {
        return id;
    }

    public int getInterestRate() {
        return interestRate;
    }

    public BigDecimal totalOutstanding() {
        BigDecimal principalAmount = new BigDecimal(amount);
        BigDecimal interestAmount = type.calculateTotalInterest(amount, durationInDays);
        return principalAmount.add(interestAmount);
    }

    public int getAmount() {
        return amount;
    }

    public LocalDate getTakenAt() {
        return takenAt;
    }

    public String getAccount() {
        return account;
    }

    public int getDurationInDays() {
        return durationInDays;
    }

    public LoanType getType() {
        return this.type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Loan loan = (Loan) o;
        return amount == loan.amount &&
                durationInDays == loan.durationInDays &&
                interestRate == loan.interestRate &&
                Objects.equals(id, loan.id) &&
                Objects.equals(account, loan.account) &&
                Objects.equals(takenAt, loan.takenAt) &&
                Objects.equals(type, loan.type);
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", account='" + account + '\'' +
                ", amount=" + amount +
                ", takenAt=" + takenAt +
                ", durationInDays=" + durationInDays +
                ", interestRate=" + interestRate +
                ", type=" + type +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, account, amount, takenAt, durationInDays, interestRate, type);
    }
}
