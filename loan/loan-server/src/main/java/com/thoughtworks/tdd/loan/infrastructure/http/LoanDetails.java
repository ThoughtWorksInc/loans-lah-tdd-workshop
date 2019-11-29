package com.thoughtworks.tdd.loan.infrastructure.http;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public class LoanDetails {
    private Long id;
    private String account;
    private int amount;
    private int durationInDays;
    private int interestRate;
    private BigDecimal totalOutstanding;
    private LocalDate takenAt;

    public LoanDetails() {
    }

    public LoanDetails(Long id, String account, int amount, int durationInDays, int interestRate, BigDecimal totalOutstanding, LocalDate takenAt) {
        this.id = id;
        this.account = account;
        this.amount = amount;
        this.durationInDays = durationInDays;
        this.interestRate = interestRate;
        this.totalOutstanding = totalOutstanding;
        this.takenAt = takenAt;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoanDetails that = (LoanDetails) o;
        return amount == that.amount &&
                durationInDays == that.durationInDays &&
                interestRate == that.interestRate &&
                Objects.equals(id, that.id) &&
                Objects.equals(account, that.account) &&
                Objects.equals(totalOutstanding, that.totalOutstanding) &&
                Objects.equals(takenAt, that.takenAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, account, amount, durationInDays, interestRate, totalOutstanding, takenAt);
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
}
