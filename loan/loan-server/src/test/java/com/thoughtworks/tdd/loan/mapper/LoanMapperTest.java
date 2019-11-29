package com.thoughtworks.tdd.loan.mapper;

import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.infrastructure.http.LoanDetails;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

public class LoanMapperTest {

    @Test
    public void shouldMapALoanEntityToLoanDetails(){

        LocalDate now = LocalDate.now();
        Loan loan = new Loan(1L, "test", 100, now, 10);
        BigDecimal outstanding = loan.totalOutstanding();
        LoanDetails expected = new LoanDetails(1L, "test", 100, 10, 20, outstanding, now);
        assertThat(new LoanMapper().map(loan))
                .isEqualTo(expected);
    }
}
