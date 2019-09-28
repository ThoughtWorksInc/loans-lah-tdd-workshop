package com.thoughtworks.tdd.loan.infrastructure.http;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoanStatus {
  @JsonProperty("status")
  private String status;
  @JsonProperty("location")
  private Location location;

  private LoanStatus() {
  }

  public LoanStatus(String status, String urlLocation) {
    this.status = status;
    this.location = new Location(urlLocation);
  }

  public String getStatus() {
    return status;
  }

  public Location getLocation() {
    return location;
  }
}
