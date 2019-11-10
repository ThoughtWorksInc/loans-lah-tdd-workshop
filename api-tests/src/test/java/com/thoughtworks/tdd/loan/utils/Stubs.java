package com.thoughtworks.tdd.loan.utils;

import java.util.UUID;

public class Stubs {
  public static String uuid() {
    return UUID.randomUUID().toString();
  }
}
