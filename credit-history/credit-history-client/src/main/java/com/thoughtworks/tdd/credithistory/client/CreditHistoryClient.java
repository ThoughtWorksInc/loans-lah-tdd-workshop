package com.thoughtworks.tdd.credithistory.client;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Base64;

public class CreditHistoryClient {

  public static CreditHistory getCreditHistoryByPassportNumber(String url, String passportNumber) throws IOException {
    try {
      String response = new RestTemplate().getForObject(String.format("%/api/v1/history?passportNumber=%s", url, passportNumber), String.class);

      byte[] decodedResponse = Base64.getDecoder().decode(response);
      return new ObjectMapper().readValue(decodedResponse, CreditHistory.class);

    } catch (Exception ex) {
      return null;
    }
  }

}
