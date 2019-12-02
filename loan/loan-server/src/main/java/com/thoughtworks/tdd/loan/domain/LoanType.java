package com.thoughtworks.tdd.loan.domain;

import java.util.Objects;

public class LoanType {

    private final String name;

    public LoanType() {
        this.name = Constants.ONE_TIME_INTEREST;
    }

    public String getName() {
        return name;
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
