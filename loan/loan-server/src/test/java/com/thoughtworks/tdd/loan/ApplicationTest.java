package com.thoughtworks.tdd.loan;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
class ApplicationTest {

  @Autowired
  private ApplicationContext context;

  @Test
  void shouldInitializeSpringContext() {
    Assertions.assertThat(context).isNotNull();
  }
}