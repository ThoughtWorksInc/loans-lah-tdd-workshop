package com.thoughtworks.tdd.loan.domain;

import com.thoughtworks.tdd.loan.utils.Loans;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

class LoanTest {

  @Test
  void shouldCalculateTotalOutstandingToBeAmountPlus20PercentOfLoanAmountIfTheLoanDurationIsLessThanAMonth() {
    Loan tenDayLoan = Loans.loanStartingToday("some account", new BigDecimal("100"), 10);

    assertThat(tenDayLoan.totalOutstanding()).isEqualTo(new BigDecimal("120.00"));
  }

  @Test
  void shouldCalculateFlat15PercentInterestRateForALoanBetweenOneMonthAndSixMonths() {
    Loan twoMonthLoan = Loans.twoMonthsLoan("some acount", new BigDecimal("100"));

    assertThat(twoMonthLoan.totalOutstanding()).isEqualTo(new BigDecimal("115.00"));
  }

  @Test
  void shouldCalculateFlat10PercentInterestRateForALoanWithDurationMoreThanSixMonths() {
    Loan veryLongLoan = Loans.loanWithDuration("some acount", new BigDecimal("100"), 300);

    assertThat(veryLongLoan.totalOutstanding()).isEqualTo(new BigDecimal("110.00"));
  }

}