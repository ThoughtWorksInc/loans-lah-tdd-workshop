package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.domain.LoanRepository;
import com.thoughtworks.tdd.loan.mapper.LoanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.lang.String.format;
import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/api/v1/accounts/{accountId}/loans")
public class LoanController {

  @Autowired
  private LoanRepository loanRepository;

  @Autowired
  private LoanMapper loanMapper;

  @PostMapping
  public ResponseEntity<?> createNew(@PathVariable("accountId") String accountId,
                                              @RequestBody NewLoan newLoan) {
    try {
      var loan = new Loan(accountId, newLoan.getAmount(), LocalDate.now(), newLoan.getDurationInDays());
      var saved = loanRepository.save(loan);
      var status = new LoanStatus("ok", format("/api/v1/accounts/%s/loans/%s", accountId, saved.getId()));
      return accepted().body(status);
    } catch (IllegalArgumentException e){
      return badRequest().body(Map.of("status", "not ok", "msg", e.getMessage()));
    }
  }

  @GetMapping
  public ResponseEntity<List<LoanDetails>> getAll(@PathVariable("accountId") String accountId) {
    var loans = loanRepository.findAllByAccount(accountId).stream().map(l -> loanMapper.map(l)).collect(Collectors.toList());
    return ok(loans);
  }

  @GetMapping
  @RequestMapping("/{loanId}")
  public ResponseEntity<LoanDetails> getLoan(@PathVariable("accountId") String accountId,
                                      @PathVariable("loanId") Long loanId) {
    var optionalLoan = loanRepository.findByIdAndAccount(loanId, accountId);
    return optionalLoan.map(l -> ok(loanMapper.map(l))).orElse(ResponseEntity.notFound().build());
  }
}
