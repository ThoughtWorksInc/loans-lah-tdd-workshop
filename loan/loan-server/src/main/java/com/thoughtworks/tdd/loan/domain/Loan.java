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
  public static final BigDecimal ONE_HUNDRED = new BigDecimal("100.00");
  public static final BigDecimal ONE_HUNDRED_FIFTEEN_PERCENT = new BigDecimal("1.15");
  public static final BigDecimal ONE_HUNDRED_FIVE_PERCENT = new BigDecimal("1.05");
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
  @JsonProperty("interest_rate")
  private int interestRate;

  private Loan() {
  }

  public Loan(Long id, String account, int amount, LocalDate takenAt, int durationInDays, int interestRate) {
    this(account, amount, takenAt, durationInDays, interestRate);
    this.id = id;
  }

  public Loan(String account, int amount, LocalDate takenAt, int durationInDays, int interestRate) {
    validateLoan(account, amount, takenAt, durationInDays, interestRate);
    this.account = account;
    this.amount = amount;
    this.takenAt = takenAt;
    this.durationInDays = durationInDays;
    this.interestRate = interestRate;
  }

  private void validateLoan(String account, int amount, LocalDate takenAt, int durationInDays, int interestRate) {
    Objects.requireNonNull(account, "account can not be null");
    Objects.requireNonNull(takenAt, "takenAt date can not be null");
    if(amount < 0 || durationInDays < 0 || interestRate < 0) {
      throw new IllegalArgumentException("amount or duration or interest rate cannot be negative");
    }
  }

  public Long getId() {
    return id;
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
    if (this.durationInDays < 30) {
      BigDecimal interestRateFactor = getInterestRateFactor();
      return interestRateFactor.multiply(multiplicand);
    } else if (this.durationInDays < 180) {
      return ONE_HUNDRED_FIFTEEN_PERCENT.multiply(multiplicand);
    } else {
      return ONE_HUNDRED_FIVE_PERCENT.multiply(multiplicand);
    }
  }

  private BigDecimal getInterestRateFactor() {
    return BigDecimal.ONE.add(new BigDecimal(interestRate).setScale(2, RoundingMode.HALF_UP).divide(ONE_HUNDRED, RoundingMode.HALF_UP).setScale(2, RoundingMode.HALF_UP));
  }
}
