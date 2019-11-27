package com.thoughtworks.tdd.loan.domain;

import com.thoughtworks.tdd.loan.utils.LoanBuilder;
import com.thoughtworks.tdd.loan.utils.Stubs;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class LoanTest {

  @Test
  void shouldNotBeAbleToCreateLoanWithNegativeAmount() {
    assertThrows(IllegalArgumentException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), -1, LocalDate.now(),  10);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithNegativeDuration() {
    assertThrows(IllegalArgumentException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), 10, LocalDate.now(),  -1);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithoutAccountNumber() {
    assertThrows(NullPointerException.class, () -> {
      new Loan(Stubs.id(), null, 10, LocalDate.now(),  10);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithoutTakenAt() {
    assertThrows(NullPointerException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), 10, null,  10);
    });
  }

  @Test
  void shouldCalculateTotalOutstandingToBeAmountPlus20PercentIfTheLoanDurationIsLessThanAMonth() {
    Loan loan = new LoanBuilder().withAmount(100).withDurationInDays(5).build();

    assertThat(loan.totalOutstanding()).isEqualTo(new BigDecimal("120.00"));
    assertThat(loan.getInterestRate()).isEqualTo(20);
  }

  @Test
  void shouldCalculateFlat15PercentInterestRateForALoanBetweenOneMonthAndSixMonths() {
    Loan loan = new LoanBuilder().withAmount(100).withDurationInDays(60).build();

    assertThat(loan.totalOutstanding()).isEqualTo(new BigDecimal("115.00"));
    assertThat(loan.getInterestRate()).isEqualTo(15);
  }

  @Test
  void shouldCalculateFlat5PercentInterestRateForALoanWithDurationMoreThanSixMonths() {
    Loan loan = new LoanBuilder().withAmount(100).withDurationInDays(300).build();

    assertThat(loan.totalOutstanding()).isEqualTo(new BigDecimal("105.00"));
    assertThat(loan.getInterestRate()).isEqualTo(5);
  }

  @Test
  void shouldCaluculateWithSetInterestFor30DayLoan() {
    Loan loan = new LoanBuilder().withAmount(100).withDurationInDays(30).build();

    assertThat(loan.totalOutstanding()).isEqualTo(new BigDecimal("120.00"));
    assertThat(loan.getInterestRate()).isEqualTo(20);
  }

  @Test
  void shouldCaluculateWith15PercentFor31DayLoan() {
    Loan loan = new LoanBuilder().withAmount(100).withDurationInDays(31).build();

    assertThat(loan.totalOutstanding()).isEqualTo(new BigDecimal("115.00"));
    assertThat(loan.getInterestRate()).isEqualTo(15);
  }

}