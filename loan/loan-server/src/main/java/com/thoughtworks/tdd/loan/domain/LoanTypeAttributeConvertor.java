package com.thoughtworks.tdd.loan.domain;

import javax.persistence.AttributeConverter;

public class LoanTypeAttributeConvertor implements AttributeConverter<LoanType, String> {
    @Override
    public String convertToDatabaseColumn(LoanType loanType) {
        return loanType.getName();
    }

    @Override
    public LoanType convertToEntityAttribute(String dbData) {
        return new LoanType();
    }
}
