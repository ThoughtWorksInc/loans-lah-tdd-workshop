package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.domain.LoanRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static com.thoughtworks.tdd.loan.utils.Stubs.id;
import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.HttpEntity.EMPTY;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@SpringBootTest(webEnvironment = RANDOM_PORT)
public class LoanControllerTest {

  @Autowired
  private TestRestTemplate testRestTemplate;
  @MockBean
  private LoanRepository loanRepository;

  private String account = uuid();
  private Long loanId = id();

  @Test
  void shouldResponseNotFoundWhenUsersLoanCanNotBeFound() {
    when(loanRepository.findByIdAndAccount(loanId, account)).thenReturn(Optional.empty());

    ResponseEntity<LoanDetails> response = testRestTemplate.exchange(
            "/api/v1/accounts/{account}/loans/{loanId}",
            GET,
            EMPTY,
            LoanDetails.class,
            account,
            loanId);

    assertThat(response.getStatusCode()).isEqualTo(NOT_FOUND);
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
