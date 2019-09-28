package com.thoughtworks.tdd.loan.infrastructure.http;

public class Location {
  private String url;

  private Location() {
  }

  public Location(String url) {
    this.url = url;
  }

  public String getUrl() {
    return url;
  }
}