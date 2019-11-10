package com.thoughtworks.tdd.loan;

import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

import java.util.Collections;

import static com.thoughtworks.tdd.loan.utils.Stubs.uuid;
import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static io.restassured.path.json.config.JsonPathConfig.jsonPathConfig;
import static org.hamcrest.core.IsEqual.equalTo;

class LoanLahApiTest {

  private static final String BEARER = "Bearer ";

  private int port = 8910;
  private String userName = uuid();
  private String password = uuid();

  @ApiTest
  void shouldVerifyIfNewUserCanRegisterIntoAnApplicationAndApplyForALoan() {

      given().
              port(port).
              contentType(JSON).
              body(String.format("{\"name\": \"%s\", \"password\": \"%s\"}", userName, password)).
      when().
              post("/api/users").
      then().
              statusCode(201);

      var loginResponse =
      given().
              port(port).
              contentType(JSON).
              body(String.format("{\"name\": \"%s\", \"password\": \"%s\"}", userName, password)).
      when().
              post("/api/users/login").
      then().
              statusCode(200).extract();

      String bearerToken = extractJwt(loginResponse);

      given().
              port(port).
              header(authorizationHeader(bearerToken)).
      when().
              get("/api/loans/").
      then().
              statusCode(200).
      body("$", equalTo(Collections.emptyList()));

      given().
              port(port).
              contentType(JSON).
              header(authorizationHeader(bearerToken)).
              body("{\"amount\": 100, \"durationInDays\": 10}").
      when().
              post("/api/loans").
      then().
              statusCode(200);

      given().
              port(port).
              contentType(JSON).
              header(authorizationHeader(bearerToken)).
      when().
              get("/api/loans/").
      then().
              statusCode(200).
              body("[0].amount", equalTo(100)).
              body("[0].durationInDays", equalTo(10));
  }

  private static String extractJwt(ExtractableResponse<Response> loginResponse) {
    return loginResponse.body().jsonPath(jsonPathConfig()).getString("jwt");
  }

  private static Header authorizationHeader(String bearerToken) {
    return new Header("Authorization", BEARER + bearerToken);
  }
}