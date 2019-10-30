package com.thoughtworks.tdd.loan.utils;

import com.thoughtworks.tdd.loan.domain.Loan;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Loans {

  public static Loan loan() {
    return loan(Stubs.uuid());
  }

  public static Loan loan(String account) {
    return new Loan(account, BigDecimal.TEN, LocalDate.now(), 10, 10);
  }

  public static Loan loanStartingTodayWith10PercentInterest(BigDecimal amount, int durationInDays) {
    return new Loan("some account", amount, LocalDate.now(), durationInDays, 10);
  }

  public static Loan twoMonthsLoanAt10PercentInterest(BigDecimal amount) {
    return loanStartingTodayWith10PercentInterest(amount, 60);
  }

  public static Loan loanAt10PercentInterestWithDuration(BigDecimal amount, int durationInDays) {
    return loanStartingTodayWith10PercentInterest(amount, durationInDays);
  }
}
