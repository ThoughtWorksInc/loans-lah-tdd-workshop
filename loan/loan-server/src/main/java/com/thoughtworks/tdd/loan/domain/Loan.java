package com.thoughtworks.tdd.loan.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

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
  private BigDecimal amount;
  @Column
  private LocalDate takenAt;
  @Column
  private int durationInDays;
  @Column
  @JsonProperty("interest_rate")
  private Integer interestRate;

  public Loan() {
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
    this.interestRate = interestRate;
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

  public Integer getInterestRate() {
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
}
