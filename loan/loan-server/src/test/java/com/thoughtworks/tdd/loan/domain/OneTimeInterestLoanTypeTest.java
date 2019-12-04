package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static com.thoughtworks.tdd.loan.domain.Constants.ONE_TIME_INTEREST;
import static org.assertj.core.api.Assertions.assertThat;

public class OneTimeInterestLoanTypeTest {

    @Test
    public void shouldProvideTheTypeOfLoanAsALoanThatRepresentsOneTimeInterestCalculation() {
        assertThat(new OneTimeInterestLoanType().getName()).isEqualTo(ONE_TIME_INTEREST);
    }

    @Test
    public void shouldCalculateInterestForProvidedAmountAndRate() {
        assertThat(new OneTimeInterestLoanType().calculateTotalInterest(100, 20)).isEqualTo(new BigDecimal("20.00"));
    }
}
