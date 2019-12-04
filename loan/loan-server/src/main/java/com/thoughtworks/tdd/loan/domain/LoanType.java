package com.thoughtworks.tdd.loan.domain;

import java.math.BigDecimal;

public interface LoanType {
    String getName();

    BigDecimal calculateTotalInterest(int amount, int durationInDays);

    default int interestRateFromDuration(int durationInDays) {
        if (durationInDays <= 30) return 20;
        if (durationInDays < 180) return 15;
        return 5;
    }
}
