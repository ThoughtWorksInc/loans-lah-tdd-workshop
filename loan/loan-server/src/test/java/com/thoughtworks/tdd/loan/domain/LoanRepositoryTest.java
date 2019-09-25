package com.thoughtworks.tdd.loan.domain;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.StreamSupport;

import static java.math.BigDecimal.TEN;
import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LoanRepositoryTest {

  @Autowired
  private LoanRepository loanRepository;

  @Test
  void shouldPersistLoan() {
    Loan newLoan = new Loan(1L, TEN, LocalDate.now(), 30);
    Loan saved = loanRepository.save(newLoan);

    List<Loan> loans = StreamSupport.stream(loanRepository.findAll().spliterator(), false).collect(toList());

    assertThat(loans).containsAnyOf(saved);
  }
}