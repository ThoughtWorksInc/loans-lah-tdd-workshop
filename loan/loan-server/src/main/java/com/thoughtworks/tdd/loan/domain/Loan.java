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
  private Long account;
  @Column
  private BigDecimal amount;
  @Column
  private LocalDate takenAt;
  @Column
  private int durationInDays;

  public Loan() {
  }

  public Loan(Long account, BigDecimal amount, LocalDate takenAt, int durationInDays) {
    this.account = account;
    this.amount = amount;
    this.takenAt = takenAt;
    this.durationInDays = durationInDays;
  }

  public Long getId() {
    return id;
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

  public Long getAccount() {
    return account;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Loan loan = (Loan) o;
    return durationInDays == loan.durationInDays &&
            Objects.equals(id, loan.id) &&
            Objects.equals(account, loan.account) &&
            Objects.equals(amount, loan.amount) &&
            Objects.equals(takenAt, loan.takenAt);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, account, amount, takenAt, durationInDays);
  }

  @Override
  public String toString() {
    return "Loan{" +
            "id=" + id +
            ", account=" + account +
            ", amount=" + amount +
            ", takenAt=" + takenAt +
            ", durationInDays=" + durationInDays +
            '}';
  }
}
