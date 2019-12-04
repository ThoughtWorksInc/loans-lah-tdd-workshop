package com.thoughtworks.tdd.loan.domain;

import java.math.BigDecimal;
import java.util.Objects;

import static com.thoughtworks.tdd.loan.domain.Constants.ONE_TIME_INTEREST;
import static java.math.RoundingMode.HALF_UP;

public class OneTimeInterestLoanType implements LoanType {
    public String getName() {
        return ONE_TIME_INTEREST;
    }

    public BigDecimal calculateTotalInterest(int amount, int durationInDays) {
        BigDecimal interestRateAsDecimal = new BigDecimal(interestRateFromDuration(durationInDays)).setScale(2, HALF_UP);
        return new BigDecimal(amount).multiply(interestRateAsDecimal).divide(Constants.ONE_HUNDRED, HALF_UP);
    }

    @Override
    public String toString() {
        return "OneTypeInterestLoanType{" +
                "name='" + getName() + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OneTimeInterestLoanType that = (OneTimeInterestLoanType) o;
        return Objects.equals(getName(), that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }
}
