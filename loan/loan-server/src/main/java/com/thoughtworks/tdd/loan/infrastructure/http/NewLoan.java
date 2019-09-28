package com.thoughtworks.tdd.loan.infrastructure.http;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class NewLoan {
  private BigDecimal amount;
  @JsonProperty("duration_in_days")
  private int durationInDays;

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public int getDurationInDays() {
    return durationInDays;
  }

  public void setDurationInDays(int durationInDays) {
    this.durationInDays = durationInDays;
  }
}
