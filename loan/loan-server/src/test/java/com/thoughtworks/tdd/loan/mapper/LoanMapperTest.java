package com.thoughtworks.tdd.loan.mapper;

import com.thoughtworks.tdd.loan.domain.Constants;
import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.infrastructure.http.LoanDetails;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

public class LoanMapperTest {

    @Test
    public void shouldMapALoanEntityToLoanDetails(){
        LocalDate now = LocalDate.now();
        Loan loan = new Loan(1L, "test", 100, now, 10);

        LoanDetails loanDetails = new LoanMapper().map(loan);
        assertThat(loanDetails.getId()).isEqualTo(1L);
        assertThat(loanDetails.getAccount()).isEqualTo("test");
        assertThat(loanDetails.getAmount()).isEqualTo(100);
        assertThat(loanDetails.getDurationInDays()).isEqualTo(10);
        assertThat(loanDetails.getInterestRate()).isEqualTo(20);
        assertThat(loanDetails.getTotalOutstanding()).isEqualTo("120.00");
        assertThat(loanDetails.getType()).isEqualTo(Constants.ONE_TIME_INTEREST);
    }
}
