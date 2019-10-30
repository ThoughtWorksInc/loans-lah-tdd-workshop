package com.thoughtworks.tdd.loan.utils;

import com.thoughtworks.tdd.loan.domain.Loan;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Loans {

  public static Loan loan() {
    return oneMonthLoan(Stubs.uuid(), BigDecimal.TEN);
  }

  public static Loan loan(String account) {
    return oneMonthLoan(account, BigDecimal.TEN);
  }

  public static Loan oneMonthLoan(String account, BigDecimal amount) {
    return loanStartingToday(account, amount, 10);
  }

  public static Loan loanStartingToday(String account, BigDecimal amount, int durationInDays) {
    return new Loan(account, amount, LocalDate.now(), durationInDays, 10);
  }

  public static Loan twoMonthsLoan(String account, BigDecimal amount) {
    return loanStartingToday(account, amount, 60);
  }

  public static Loan loanWithDuration(String account, BigDecimal amount, int durationInDays) {
    return loanStartingToday(account, amount, durationInDays);
  }
}
