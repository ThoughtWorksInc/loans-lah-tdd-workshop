package com.thoughtworks.tdd.loan.domain;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

import static com.thoughtworks.tdd.loan.domain.Constants.DAILY_INTEREST;
import static com.thoughtworks.tdd.loan.domain.Constants.ONE_HUNDRED;
import static java.math.RoundingMode.HALF_UP;

public class DailyInterestLoanType implements LoanType {
    public static final int DAYS_IN_A_MONTH = 30;

    public BigDecimal calculateTotalInterest(int amount, int durationInDays) {
        BigDecimal ir = new BigDecimal(interestRateFromDuration(durationInDays)).setScale(2, HALF_UP);

        BigDecimal monthlyInterest = new BigDecimal(amount).multiply(ir).divide(ONE_HUNDRED, RoundingMode.HALF_UP);
        BigDecimal dailyInterest = monthlyInterest.divide(new BigDecimal(DAYS_IN_A_MONTH), RoundingMode.HALF_UP);

        int numberOfMonths = durationInDays / DAYS_IN_A_MONTH;

        return monthlyInterest.multiply(new BigDecimal(numberOfMonths)).add(dailyInterest.multiply(new BigDecimal(durationInDays - numberOfMonths * DAYS_IN_A_MONTH)));
    }

    public String getName() {
        return DAILY_INTEREST;
    }

    @Override
    public String toString() {
        return "DailyInterestLoanType{" +
                "name='" + getName() + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DailyInterestLoanType that = (DailyInterestLoanType) o;
        return Objects.equals(getName(), that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }
}