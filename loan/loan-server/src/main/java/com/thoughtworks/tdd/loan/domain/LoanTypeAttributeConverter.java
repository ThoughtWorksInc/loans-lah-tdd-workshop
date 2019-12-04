package com.thoughtworks.tdd.loan.domain;

import javax.persistence.AttributeConverter;
import java.util.Objects;

import static com.thoughtworks.tdd.loan.domain.Constants.DAILY_INTEREST;
import static com.thoughtworks.tdd.loan.domain.Constants.ONE_TIME_INTEREST;

public class LoanTypeAttributeConverter implements AttributeConverter<LoanType, String> {
    @Override
    public String convertToDatabaseColumn(LoanType loanType) {
        return loanType.getName();
    }

    @Override
    public LoanType convertToEntityAttribute(String dbData) {
        if (Objects.equals(dbData, ONE_TIME_INTEREST)) {
            return new OneTimeInterestLoanType();
        } else if (Objects.equals(dbData, DAILY_INTEREST)) {
            return new DailyInterestLoanType();
        } else {
            throw new IllegalArgumentException(String.format("Can not convert %s to entity", dbData));
        }
    }
}
