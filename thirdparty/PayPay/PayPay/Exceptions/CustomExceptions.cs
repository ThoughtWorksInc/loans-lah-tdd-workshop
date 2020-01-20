using System;

namespace PayPay.Exceptions
{
  public class UnknownMerchantException : Exception {}
  public class InvalidMerchantSecretException : Exception {}
  public class PaymentNotFoundException : Exception {}
  public class PaymentMerchantMismatchException : Exception {}
}