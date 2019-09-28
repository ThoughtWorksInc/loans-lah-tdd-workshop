package com.thoughtworks.tdd.loan.utils;

import com.thoughtworks.tdd.loan.domain.Loan;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Loans {

  public static Loan loan() {
    return new Loan(Stubs.uuid(), BigDecimal.TEN, LocalDate.now(), 10, 10);
  }

  public static Loan loan(String account) {
    return new Loan(account, BigDecimal.TEN, LocalDate.now(), 10, 10);
  }

  public static Loan oneMonthLoan(String account) {
    return new Loan(account, BigDecimal.TEN, LocalDate.now(), 10, 10);
  }
}
