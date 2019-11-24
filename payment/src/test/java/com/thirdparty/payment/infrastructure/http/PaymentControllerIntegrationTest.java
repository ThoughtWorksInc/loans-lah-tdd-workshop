package com.thirdparty.payment.infrastructure.http;

import com.thirdparty.payment.domain.Payment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpEntity.EMPTY;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpStatus.OK;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class PaymentControllerIntegrationTest {

  @Autowired
  private TestRestTemplate testRestTemplate;

  @Test
  void shouldReturnEmptyListOfPaymentsWhenLoanDoesNotExist() {
    var responseType = new ParameterizedTypeReference<List<Payment>>() {
    };
    var nonExistingLoan = -1;

    ResponseEntity<List<Payment>> response = testRestTemplate.exchange(
            "/api/v1/loans/{loanId}/payments",
            GET,
            EMPTY,
            responseType,
            nonExistingLoan);

    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody()).isEmpty();
  }
}