package com.thoughtworks.tdd.loan.utils;

import com.thoughtworks.tdd.loan.domain.Loan;

import java.time.LocalDate;

public class Loans {

  public static Loan loan() {
    return loan(Stubs.uuid());
  }

  public static Loan loan(String account) {
    return new Loan(account, 10, LocalDate.now(), 10, 10);
  }

  public static Loan loanStartingTodayWith10PercentInterest(int amount, int durationInDays) {
    return new Loan("some account", amount, LocalDate.now(), durationInDays, 10);
  }

  public static Loan loanStartingTodayWithPercentInterest(int amount, int durationInDays, int interestRate) {
    return new Loan("some account", amount, LocalDate.now(), durationInDays, interestRate);
  }

  public static Loan twoMonthsLoanAt10PercentInterest(int amount) {
    return loanStartingTodayWith10PercentInterest(amount, 60);
  }

  public static Loan loanAt10PercentInterestWithDuration(int amount, int durationInDays) {
    return loanStartingTodayWith10PercentInterest(amount, durationInDays);
  }
}
