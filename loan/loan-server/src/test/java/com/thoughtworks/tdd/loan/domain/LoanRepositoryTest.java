package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.StreamSupport;

import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static java.math.BigDecimal.TEN;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LoanRepositoryTest {

  @Autowired
  private LoanRepository loanRepository;
  private String account = uuid();

  @Test
  void shouldPersistNewLoan() {
    Loan newLoan = new Loan(account, TEN, LocalDate.now(), 30, 1);
    Loan saved = loanRepository.save(newLoan);

    List<Loan> loans = StreamSupport.stream(loanRepository.findAll().spliterator(), false).collect(toList());

    assertThat(loans).containsAnyOf(saved);
  }

  @Test
  void shouldReturnEmptyListWhenThereIsNoLoanForThisAccount() {
    List<Loan> loans = loanRepository.findAllByAccount(account);

    assertThat(loans).isEmpty();
  }

  @Test
  void shouldFindAllLoansAssignedToAccount() {
    Loan newLoan = new Loan(account, TEN, LocalDate.now(), 30, 1);
    Loan anotherLoan = new Loan(account, BigDecimal.ONE, LocalDate.now(), 10, 1);
    Loan newLoanSaved = loanRepository.save(newLoan);
    Loan anotherLoanSaved = loanRepository.save(anotherLoan);

    List<Loan> loans = loanRepository.findAllByAccount(account);

    assertThat(loans).containsExactlyInAnyOrder(newLoanSaved, anotherLoanSaved);
  }
}