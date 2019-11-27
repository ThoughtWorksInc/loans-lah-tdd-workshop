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
      new Loan(Stubs.id(), Stubs.uuid(), -1, LocalDate.now(),  10, 10);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithNegativeDuration() {
    assertThrows(IllegalArgumentException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), 10, LocalDate.now(),  -1, 10);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithNegativeInterestRate() {
    assertThrows(IllegalArgumentException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), 10, LocalDate.now(),  10, -1);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithoutAccountNumber() {
    assertThrows(NullPointerException.class, () -> {
      new Loan(Stubs.id(), null, 10, LocalDate.now(),  10, 10);
    });
  }

  @Test
  void shouldNotBeAbleToCreateLoanWithoutTakenAt() {
    assertThrows(NullPointerException.class, () -> {
      new Loan(Stubs.id(), Stubs.uuid(), 10, null,  10, 10);
    });
  }

  @Test
  void shouldCalculateTotalOutstandingToBeAmountPlusInterestAtProvidedRateIfTheLoanDurationIsLessThanAMonth() {
    Loan tenDayLoan = new LoanBuilder().withAmount(100).withInterestRate(10).withDurationInDays(5).build();
    assertThat(tenDayLoan.totalOutstanding()).isEqualTo(new BigDecimal("110.00"));

    Loan tenDayLoanAt20PercentInterest = new LoanBuilder().withAmount(100).withInterestRate(20).withDurationInDays(5).build();
    assertThat(tenDayLoanAt20PercentInterest.totalOutstanding()).isEqualTo(new BigDecimal("120.00"));
  }

  @Test
  void shouldCalculateFlat15PercentInterestRateForALoanBetweenOneMonthAndSixMonths() {
    Loan twoMonthLoan = new LoanBuilder().withAmount(100).withDurationInDays(60).build();

    assertThat(twoMonthLoan.totalOutstanding()).isEqualTo(new BigDecimal("115.00"));
  }

  @Test
  void shouldCalculateFlat5PercentInterestRateForALoanWithDurationMoreThanSixMonths() {
    Loan veryLongLoan = new LoanBuilder().withAmount(100).withDurationInDays(300).build();

    assertThat(veryLongLoan.totalOutstanding()).isEqualTo(new BigDecimal("105.00"));
  }

}