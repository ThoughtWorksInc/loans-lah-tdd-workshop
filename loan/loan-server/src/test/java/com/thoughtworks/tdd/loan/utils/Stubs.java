package com.thoughtworks.tdd.loan.utils;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class Stubs {
  private static AtomicLong LONG_SEQ = new AtomicLong(1);

  public static String uuid() {
    return UUID.randomUUID().toString();
  }

  public static Long id() {
    return LONG_SEQ.incrementAndGet();
  }
}
