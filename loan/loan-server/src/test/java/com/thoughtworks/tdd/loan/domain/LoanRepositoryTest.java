package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static com.thoughtworks.tdd.loan.utils.Loans.loan;
import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LoanRepositoryTest {

  @Autowired
  private LoanRepository loanRepository;
  private String account = uuid();
  private String otherAccount = uuid();

  @Test
  void shouldPersistNewLoan() {
    Loan newLoan = loan();
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
    Loan newLoan = loan(account);
    Loan anotherLoan = loan(account);
    Loan someOtherLoan = loan(otherAccount);
    Loan newLoanSaved = loanRepository.save(newLoan);
    Loan anotherLoanSaved = loanRepository.save(anotherLoan);
    loanRepository.save(someOtherLoan);

    List<Loan> loans = loanRepository.findAllByAccount(account);

    assertThat(loans).containsExactlyInAnyOrder(newLoanSaved, anotherLoanSaved);
  }

  @Test
  void shouldNotFindLoanWhenIdIsNotAssignedToAccount() {
    Loan newLoan = loan(account);
    Loan anotherLoan = loan(otherAccount);
    loanRepository.save(newLoan);
    Loan anotherLoanSaved = loanRepository.save(anotherLoan);

    Optional<Loan> optionalLoan = loanRepository.findByIdAndAccount(anotherLoanSaved.getId(), account);

    assertThat(optionalLoan)
            .isEmpty();
  }

  @Test
  void shouldFindLoanByIdAndAccount() {
    Loan newLoan = loan(account);
    Loan anotherLoan = loan(account);
    Loan newLoanSaved = loanRepository.save(newLoan);
    loanRepository.save(anotherLoan);

    Optional<Loan> optionalLoan = loanRepository.findByIdAndAccount(newLoanSaved.getId(), account);

    assertThat(optionalLoan)
            .isPresent()
            .contains(newLoanSaved);
  }
}