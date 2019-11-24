package com.thirdparty.payment.infrastructure.http;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping(value = "api/v1/loans/{loanId}/payments")
public class PaymentController {

  @GetMapping
  public ResponseEntity<?> getPayments(@PathVariable("loanId") Long loanId) {
    return ResponseEntity.ok(Arrays.asList());
  }
}
