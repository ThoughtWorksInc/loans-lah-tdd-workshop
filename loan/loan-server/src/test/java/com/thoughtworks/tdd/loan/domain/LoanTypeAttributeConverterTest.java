package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static com.thoughtworks.tdd.loan.domain.Constants.DAILY_INTEREST;
import static com.thoughtworks.tdd.loan.domain.Constants.ONE_TIME_INTEREST;
import static java.lang.String.format;
import static org.assertj.core.api.Assertions.assertThat;

public class LoanTypeAttributeConverterTest {

    private LoanTypeAttributeConverter converter = new LoanTypeAttributeConverter();
    private final String NOT_SUPPORTED_TYPE = "not-supported";

    @ParameterizedTest
    @MethodSource(value = "toDb")
    public void shouldConvertLoanTypeToDatabaseColumn(LoanType loanType, String expected) {
        assertThat(converter.convertToDatabaseColumn(loanType)).isEqualTo(expected);
    }

    @ParameterizedTest
    @MethodSource(value = "toEntity")
    public void shouldConvertDatabaseColumnToLoanType(String dbColumn, LoanType expectedLoanType) {
        assertThat(converter.convertToEntityAttribute(dbColumn)).isEqualTo(expectedLoanType);
    }

    @Test
    void shouldThrowExceptionWhenConversionToEntityFailed() {
        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            converter.convertToEntityAttribute(NOT_SUPPORTED_TYPE);
        }, format("Can not convert %s to entity", NOT_SUPPORTED_TYPE));
    }

    public static Stream<Arguments> toDb() {
        return Stream.of(
                Arguments.of(new OneTimeInterestLoanType(), ONE_TIME_INTEREST),
                Arguments.of(new DailyInterestLoanType(), DAILY_INTEREST));
    }

    public static Stream<Arguments> toEntity() {
        return Stream.of(
                Arguments.of(ONE_TIME_INTEREST, new OneTimeInterestLoanType()),
                Arguments.of(DAILY_INTEREST, new DailyInterestLoanType()));
    }
}
