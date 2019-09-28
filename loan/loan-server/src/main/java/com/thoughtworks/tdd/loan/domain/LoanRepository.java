package com.thoughtworks.tdd.loan.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface LoanRepository extends CrudRepository<Loan, Long> {
  List<Loan> findAllByAccount(String accountId);

  Optional<Loan> findByIdAndAccount(Long id, String accountId);
}
