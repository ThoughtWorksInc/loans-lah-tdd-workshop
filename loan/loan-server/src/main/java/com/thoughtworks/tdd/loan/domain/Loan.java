package com.thoughtworks.tdd.loan.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Loan {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @JsonProperty
  private Long id;

  @Column
  @JsonProperty
  private String account;

  @Column
  @JsonProperty
  private int amount;

  @Column
  @JsonProperty
  private LocalDate takenAt;

  @Column
  @JsonProperty
  private int durationInDays;

  @Column
  @JsonProperty
  private int interestRate;

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
    this.interestRate = interestRateFromDuration(durationInDays);
  }

  private int interestRateFromDuration(int durationInDays) {
    if (durationInDays <= 30) return 20;
    if (durationInDays <= 180) return 15;
    return 5;
  }

  private void validateLoan(String account, int amount, LocalDate takenAt, int durationInDays) {
    Objects.requireNonNull(account, "account can not be null");
    Objects.requireNonNull(takenAt, "takenAt date can not be null");
    if(amount < 0 || durationInDays < 0) {
      throw new IllegalArgumentException("amount or duration or interest rate cannot be negative");
    }
  }

  public Long getId() {
    return id;
  }

  public int getInterestRate() {
    return interestRate;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Loan loan = (Loan) o;
    return durationInDays == loan.durationInDays &&
            Objects.equals(interestRate, loan.interestRate) &&
            Objects.equals(id, loan.id) &&
            Objects.equals(account, loan.account) &&
            Objects.equals(amount, loan.amount) &&
            Objects.equals(takenAt, loan.takenAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, account, amount, takenAt, durationInDays, interestRate);
  }

  @Override
  public String toString() {
    return "Loan{" +
            "id=" + id +
            ", account=" + account +
            ", amount=" + amount +
            ", takenAt=" + takenAt +
            ", durationInDays=" + durationInDays +
            ", interestRate=" + interestRate +
            '}';
  }

  @JsonGetter("totalOutstanding")
  public BigDecimal totalOutstanding() {
    BigDecimal multiplicand = new BigDecimal(amount);
    BigDecimal interestRateFactor = getInterestRateFactor();
    return interestRateFactor.multiply(multiplicand);
  }

  private BigDecimal getInterestRateFactor() {
    return BigDecimal.ONE.add(new BigDecimal(interestRate).setScale(2, RoundingMode.HALF_UP).divide(new BigDecimal("100.00"), RoundingMode.HALF_UP).setScale(2, RoundingMode.HALF_UP));
  }
}
