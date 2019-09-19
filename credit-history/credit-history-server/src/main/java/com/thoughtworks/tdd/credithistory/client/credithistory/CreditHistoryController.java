package com.thoughtworks.tdd.credithistory.client.credithistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Base64;

import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

@RestController
@RequestMapping("api/v1/history")
public class CreditHistoryController {

  @Autowired
  private ResourceLoader resourceLoader;

  @GetMapping(produces = TEXT_PLAIN_VALUE)
  public String history(@RequestParam(name = "passportNumber") String passportNumber) throws IOException {
    var resource = resourceLoader.getResource(String.format("classpath:%s.json", passportNumber));
    var bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
    var json = new String(bytes);
    var base64 = Base64.getEncoder().encode(json.getBytes());
    return new String(base64);
  }
}
