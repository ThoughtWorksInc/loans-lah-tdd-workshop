package com.thoughtworks.tdd.loan.utils;

import com.thoughtworks.tdd.loan.domain.Loan;

import java.time.LocalDate;

public class LoanBuilder {
    String account = Stubs.uuid();
    int amount = 100;
    LocalDate startDate = LocalDate.now();
    int durationInDays = 10;
    int interestRate = 20;

    public Loan build() {
        return new Loan(account, amount, startDate, durationInDays, interestRate);
    }

    public LoanBuilder withAmount(int amount) {
        this.amount = amount;
        return this;
    }

    public LoanBuilder withDurationInDays(int durationInDays) {
        this.durationInDays = durationInDays;
        return this;
    }

    public LoanBuilder withInterestRate(int interestRate) {
        this.interestRate = interestRate;
        return this;
    }

    public LoanBuilder withAccount(String account) {
        this.account = account;
        return this;
    }
}
