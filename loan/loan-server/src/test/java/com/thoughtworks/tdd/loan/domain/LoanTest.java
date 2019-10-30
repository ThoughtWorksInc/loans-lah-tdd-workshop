package com.thoughtworks.tdd.loan.domain;

import com.thoughtworks.tdd.loan.utils.Loans;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

class LoanTest {

  @Test
  void shouldCalculateTotalOutstandingToBeAmountPlusInterestAtProvidedRateIfTheLoanDurationIsLessThanAMonth() {
    Loan tenDayLoan = Loans.loanStartingTodayWith10PercentInterest(new BigDecimal("100"), 10);
    assertThat(tenDayLoan.totalOutstanding()).isEqualTo(new BigDecimal("110.00"));

    Loan tenDayLoanAt20PercentInterest = Loans.loanStartingTodayWithPercentInterest(new BigDecimal("100"), 10, 20);
    assertThat(tenDayLoanAt20PercentInterest.totalOutstanding()).isEqualTo(new BigDecimal("120.00"));
  }

  @Test
  void shouldCalculateFlat15PercentInterestRateForALoanBetweenOneMonthAndSixMonths() {
    Loan twoMonthLoan = Loans.twoMonthsLoanAt10PercentInterest(new BigDecimal("100"));

    assertThat(twoMonthLoan.totalOutstanding()).isEqualTo(new BigDecimal("115.00"));
  }

  @Test
  void shouldCalculateFlat5PercentInterestRateForALoanWithDurationMoreThanSixMonths() {
    Loan veryLongLoan = Loans.loanAt10PercentInterestWithDuration(new BigDecimal("100"), 300);

    assertThat(veryLongLoan.totalOutstanding()).isEqualTo(new BigDecimal("105.00"));
  }

}