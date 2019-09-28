package com.thoughtworks.tdd.loan.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LoanRepository extends CrudRepository<Loan, Long> {
  List<Loan> findAllByAccount(String accountId);
}
