package com.thoughtworks.tdd.loan.domain;

import java.math.BigDecimal;
import java.util.Objects;

import static java.math.RoundingMode.HALF_UP;

public class LoanType {

    private final String name;

    public LoanType() {
        this.name = Constants.ONE_TIME_INTEREST;
    }

    public String getName() {
        return name;
    }

    public BigDecimal calculateIrAmount(int amount, int durationInDays) {
        BigDecimal interestRateAsDecimal = new BigDecimal(interestRateFromDuration(durationInDays)).setScale(2, HALF_UP);
        return new BigDecimal(amount).multiply(interestRateAsDecimal).divide(Constants.ONE_HUNDRED, HALF_UP);
    }

    int interestRateFromDuration(int durationInDays) {
        if (durationInDays <= 30) return 20;
        if (durationInDays < 180) return 15;
        return 5;
    }

    @Override
    public String toString() {
        return "LegacyLoanType{" +
                "type='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoanType that = (LoanType) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
