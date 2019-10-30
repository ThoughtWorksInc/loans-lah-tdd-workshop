package com.thoughtworks.tdd.loan.infrastructure.http;

public class NewLoan {
  private int amount;
  private int durationInDays;

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public int getDurationInDays() {
    return durationInDays;
  }

  public void setDurationInDays(int durationInDays) {
    this.durationInDays = durationInDays;
  }
}
