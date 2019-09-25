package com.thoughtworks.tdd.loan.domain;

import org.springframework.data.repository.CrudRepository;

interface LoanRepository extends CrudRepository<Loan, Long> {
}
