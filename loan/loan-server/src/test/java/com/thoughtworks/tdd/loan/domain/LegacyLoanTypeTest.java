package com.thoughtworks.tdd.loan.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.*;

public class LegacyLoanTypeTest {

    @Test
    public void shouldProvideTheTypeOfLoanAsALoanThatRepresentsOneTimeInterestCalculation(){
        assertThat(new LoanType().getName()).isEqualTo("ONE_TIME_INTEREST");
    }

    @Test
    public void shouldCalculateInterestForProvidedAmountAndRate(){
        assertThat(new LoanType().calculateIrAmount(100, 20)).isEqualTo(new BigDecimal("20.00"));
    }
}
