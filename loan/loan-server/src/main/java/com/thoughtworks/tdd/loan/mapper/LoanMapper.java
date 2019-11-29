package com.thoughtworks.tdd.loan.mapper;

import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.infrastructure.http.LoanDetails;
import org.springframework.stereotype.Component;

@Component
public class LoanMapper {
    public LoanDetails map(Loan loan) {
        return new LoanDetails(loan.getId(), loan.getAccount(), loan.getAmount(), loan.getDurationInDays(), loan.getInterestRate(), loan.totalOutstanding(), loan.getTakenAt());
    }
}
