package com.thoughtworks.tdd.loan.infrastructure.http;

import com.thoughtworks.tdd.loan.utils.Stubs;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static io.restassured.path.json.config.JsonPathConfig.jsonPathConfig;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class LoanControllerAcceptanceTest {

  private @LocalServerPort int port;
  private String accountId = uuid();

  @Test
  void shouldRequestNewLoanAndListAllOfThem() {
    var response =
    given().
            port(port).
            contentType(JSON).
    body("{\"amount\": \"200\", \"duration_in_days\": 10}").
    when().
            post("/api/v1/accounts/{accountId}/loans/", accountId).
    then().
            statusCode(202).
            body("status", equalTo("ok")).
            body("location.url", notNullValue()).
    extract();

    String newLoanUrl = response.body().jsonPath(jsonPathConfig()).getString("location.url");

    given().
            port(port).
    when().
            get(newLoanUrl).
    then().
          statusCode(200).
          body("$[0].amount", equalTo("200")).
          body("$[0].duration_in_days", equalTo(10));
  }
}