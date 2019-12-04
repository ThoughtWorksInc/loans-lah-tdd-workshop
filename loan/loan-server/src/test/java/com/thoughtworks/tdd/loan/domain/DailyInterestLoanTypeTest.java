package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.math.BigDecimal;
import java.util.stream.Stream;

import static com.thoughtworks.tdd.loan.domain.Constants.DAILY_INTEREST;
import static org.assertj.core.api.Assertions.assertThat;

public class DailyInterestLoanTypeTest {

    private DailyInterestLoanType dailyInterestLoanType = new DailyInterestLoanType();

    @ParameterizedTest
    @MethodSource("values")
    public void shouldCalculateInterestForTheDurationProvidedInDaysForLoanWithVariousDurations(int amount, int durationInDays, BigDecimal expected) {
        LoanType loanType = dailyInterestLoanType;
        assertThat(loanType.calculateTotalInterest(amount, durationInDays)).isEqualTo(expected);
    }

    @Test
    public void shouldProvideTheLoanTypeAsString() {
        assertThat(dailyInterestLoanType.getName()).isEqualTo(DAILY_INTEREST);
    }

    @Test
    public void shouldProvideInterestRate() {
        assertThat(dailyInterestLoanType.interestRateFromDuration(10)).isEqualTo(20);
    }

    public static Stream<Arguments> values() {
        return Stream.of(Arguments.of(100, 15, new BigDecimal("10.05")),
                Arguments.of(100, 30, new BigDecimal("20.00")),
                Arguments.of(100, 31, new BigDecimal("15.50")),
                Arguments.of(100, 90, new BigDecimal("45.00")),
                Arguments.of(100, 181, new BigDecimal("30.17")));
    }
}