package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.domain.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static java.lang.String.format;
import static org.springframework.http.ResponseEntity.accepted;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/v1/accounts/{accountId}/loans")
public class LoanController {

  @Autowired
  private LoanRepository loanRepository;

  @PostMapping
  public ResponseEntity<LoanStatus> createNew(@PathVariable("accountId") String accountId,
                                              @RequestBody NewLoan newLoan) {
    var loan = new Loan(accountId, newLoan.getAmount(), LocalDate.now(), newLoan.getDurationInDays(), 10);
    var saved = loanRepository.save(loan);
    var status = new LoanStatus("ok", format("/api/v1/accounts/%s/loans/%s", accountId, saved.getId()));
    return accepted().body(status);
  }

  @GetMapping
  public ResponseEntity<List<Loan>> getAll(@PathVariable("accountId") String accountId) {
    var loans = loanRepository.findAllByAccount(accountId);
    return ok(loans);
  }

  @GetMapping
  @RequestMapping("/{loanId}")
  public ResponseEntity<Loan> getLoan(@PathVariable("accountId") String accountId,
                                      @PathVariable("loanId") Long loanId) {
    var optionalLoan = loanRepository.findByIdAndAccount(loanId, accountId);
    return optionalLoan.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }
}
