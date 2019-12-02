package com.thoughtworks.tdd.loan.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class LegacyLoanTypeTest {

    @Test
    public void shouldProvideTheTypeOfLoanAsALoanThatRepresentsOneTimeInterestCalculation(){
        Assertions.assertThat(new LoanType().getName()).isEqualTo("ONE_TIME_INTEREST");
    }
}
