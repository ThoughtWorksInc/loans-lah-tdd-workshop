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
  private Long id;
  @Column
  private String account;
  @Column
  private BigDecimal amount;
  @Column
  private LocalDate takenAt;
  @Column
  private int durationInDays;
  @Column
  @JsonProperty("interest_rate")
  private BigDecimal interestRate;

  private Loan() {
  }

  public Loan(Long id, String account, BigDecimal amount, LocalDate takenAt, int durationInDays, int interestRate) {
    this(account, amount, takenAt, durationInDays, interestRate);
    this.id = id;
  }

  public Loan(String account, BigDecimal amount, LocalDate takenAt, int durationInDays, int interestRate) {
    this.account = account;
    this.amount = amount;
    this.takenAt = takenAt;
    this.durationInDays = durationInDays;
    this.interestRate = new BigDecimal(interestRate).setScale(2, RoundingMode.HALF_UP);
  }

  public Long getId() {
    return id;
  }

  public String getAccount() {
    return account;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public LocalDate getTakenAt() {
    return takenAt;
  }

  public int getDurationInDays() {
    return durationInDays;
  }

  public BigDecimal getInterestRate() {
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
    if (this.durationInDays < 30) {
      BigDecimal interestRateFactor = getInterestRateFactor();
      return this.amount.multiply(interestRateFactor);
    } else if (this.durationInDays < 180) {
      return this.amount.multiply(ONE_HUNDRED_FIFTEEN_PERCENT);
    } else {
      return this.amount.multiply(ONE_HUNDRED_FIVE_PERCENT);

    }
  }

  private BigDecimal getInterestRateFactor() {
    return BigDecimal.ONE.add(interestRate.divide(ONE_HUNDRED, RoundingMode.HALF_UP).setScale(2, RoundingMode.HALF_UP));
  }
}
