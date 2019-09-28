package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.domain.Loan;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpEntity.EMPTY;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class LoanControllerTest {

  @Autowired
  private TestRestTemplate testRestTemplate;
  private String account = uuid();

  @Test
  void shouldReturnEmptyListOfLoansWhenUserHasNoOne() {
    var responseType = new ParameterizedTypeReference<List<Loan>>() {
    };
    ResponseEntity<List<Loan>> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/",
            GET,
            EMPTY,
            responseType,
            account);

    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody()).isEmpty();
  }

  @Test
  void shouldReturnSuccessfulResultForRequestedLoan() {
    var loanRequest = "{\"amount\": \"200\", \"duration_in_days\": 10}";

    ResponseEntity<LoanStatus> response = testRestTemplate.exchange(
            "/api/v1/accounts/{accountId}/loans/",
            POST,
            new HttpEntity<>(loanRequest, headers()),
            LoanStatus.class,
            account);

    assertThat(response.getStatusCode()).isEqualTo(ACCEPTED);
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().getStatus()).isEqualTo("ok");
    assertThat(response.getBody().getLocation().getUrl()).startsWith(String.format("/api/v1/accounts/%s/loans/", account));
  }


  @Test
  void shouldReturnAllLoansForAnAccount() {
    var responseType = new ParameterizedTypeReference<List<Loan>>() {
    };
    var loanRequest = "{\"amount\": \"200\", \"duration_in_days\": 10}";

    testRestTemplate.exchange(
            "/api/v1/accounts/{accountId}/loans/",
            POST,
            new HttpEntity<>(loanRequest, headers()),
            Loan.class,
            account);

    ResponseEntity<List<Loan>> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/",
            GET,
            EMPTY,
            responseType,
            account);

    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody()).hasSize(1);
    assertThat(response.getBody()).hasOnlyOneElementSatisfying(loan -> {
      assertThat(loan).isEqualToIgnoringGivenFields(new Loan(account, BigDecimal.valueOf(200), LocalDate.now(), 10, 10), "id");
    });
  }

  private static HttpHeaders headers() {
    var headers = new HttpHeaders();
    headers.add(ACCEPT, APPLICATION_JSON_VALUE);
    headers.add(CONTENT_TYPE, APPLICATION_JSON_VALUE);
    return headers;
  }
}