package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LoanTypeAttributeConvertorTest {

    @Test
    public void shouldConvertLoanTypeToStringForPersistence(){
        assertThat(new LoanTypeAttributeConvertor().convertToDatabaseColumn(new LoanType())).isEqualTo(Constants.ONE_TIME_INTEREST);
    }

    @Test
    public void shouldInstantiateALoanTypeFromStringInTheDatabase(){
        assertThat(new LoanTypeAttributeConvertor().convertToEntityAttribute(Constants.ONE_TIME_INTEREST)).isEqualTo(new LoanType());
    }
}
