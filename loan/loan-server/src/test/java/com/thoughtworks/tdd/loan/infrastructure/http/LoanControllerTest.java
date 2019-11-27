package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.domain.Loan;
import com.thoughtworks.tdd.loan.domain.LoanRepository;
import com.thoughtworks.tdd.loan.utils.LoanBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.thoughtworks.tdd.loan.utils.Stubs.id;
import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static java.lang.String.format;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpEntity.EMPTY;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class LoanControllerTest {

  @Autowired
  private TestRestTemplate testRestTemplate;
  @MockBean
  private LoanRepository loanRepository;

  private String account = uuid();
  private Long loanId = id();
  private LocalDate takenAt = LocalDate.now();
  private int durationInDays = 10;
  private int amount = 200;

  @Test
  void shouldReturnAllUsersLoans() {
      Loan loan = new LoanBuilder().withAccount(account).build();
    when(loanRepository.findAllByAccount(account)).thenReturn(List.of(loan));

    var responseType = new ParameterizedTypeReference<List<Loan>>() {
    };
    ResponseEntity<List<Loan>> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/",
            GET,
            EMPTY,
            responseType,
            account);

    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody()).containsExactly(loan);
  }

  @Test
  void shouldReturnUserLoanById() {
    Loan loan = new Loan(loanId, account, amount, takenAt, durationInDays);
    when(loanRepository.findByIdAndAccount(loan.getId(), account)).thenReturn(Optional.of(loan));

    ResponseEntity<Loan> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/{loanId}",
            GET,
            EMPTY,
            Loan.class,
            account,
            loanId);

    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody()).isEqualTo(loan);
  }

  @Test
  void shouldResponseNotFoundWhenUsersLoanCanNotBeFound() {
    when(loanRepository.findByIdAndAccount(loanId, account)).thenReturn(Optional.empty());

    ResponseEntity<Loan> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/{loanId}",
            GET,
            EMPTY,
            Loan.class,
            account,
            loanId);

    assertThat(response.getStatusCode()).isEqualTo(NOT_FOUND);
  }

  @Test
  void shouldRequestForANewLoan() {
    Loan loan = new Loan(account, amount, takenAt, durationInDays);
    Loan persisted = new Loan(id(), account, amount, takenAt, durationInDays);
    when(loanRepository.save(loan)).thenReturn(persisted);

    var loanRequest = "{\"amount\": 200, \"durationInDays\": 10}";

    ResponseEntity<LoanStatus> response = testRestTemplate.exchange(
            "/api/v1/accounts/{accountId}/loans/",
            POST,
            new HttpEntity<>(loanRequest, headers()),
            LoanStatus.class,
            account);

    assertThat(response.getStatusCode()).isEqualTo(ACCEPTED);
    assertThat(response.getBody().getLocation().getUrl()).isEqualTo(format("/api/v1/accounts/%s/loans/%s", account, persisted.getId()));
    assertThat(response.getBody().getStatus()).isEqualTo("ok");
  }

  @ParameterizedTest
  @ValueSource(strings = {
          "{\"amount\": -10, \"durationInDays\": 10}",
          "{\"amount\": 10, \"durationInDays\": -10}",
  })
  void shouldNotBeAbleToRequestForANewLoanWithoutAccount(String invalidRequest) {
    ResponseEntity<LoanStatus> response = testRestTemplate.exchange(
            "/api/v1/accounts/{accountId}/loans/",
            POST,
            new HttpEntity<>(invalidRequest, headers()),
            LoanStatus.class,
            account);

    assertThat(response.getStatusCode()).isEqualTo(BAD_REQUEST);
  }

  private static HttpHeaders headers() {
    var headers = new HttpHeaders();
    headers.add(ACCEPT, APPLICATION_JSON_VALUE);
    headers.add(CONTENT_TYPE, APPLICATION_JSON_VALUE);
    return headers;
  }
}
