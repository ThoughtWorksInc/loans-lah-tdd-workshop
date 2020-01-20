using System;
using NUnit.Framework;
using PayPay.Exceptions;
using PayPay.Services;
using System.Collections.Generic;

namespace PayPay.Tests.Services
{
  public class PaymentServiceTest
  {
    IDictionary<int, String> secrets;

    [SetUp]
    public void SetUp()
    {
      secrets = new Dictionary<int, String>();
      secrets.Add(5, "Merchant5Secret");
    }

    [Test]
    public void PayReturnsNonEmptyGuid()
    {
      var paymentService = new PaymentService(secrets);
      var result = paymentService.pay(100, 5, 1, "5000-4000-3000-2000");
      Assert.That(result, Is.Not.Null);
      Assert.That(result, Is.Not.EqualTo(Guid.Empty));
    }

    [Test]
    public void PayThrowsIfMerchantNotRecognised()
    {
      var paymentService = new PaymentService(secrets);
      Assert.Throws<UnknownMerchantException>(() => paymentService.pay(100, 4, 1, "5000-4000-3000-2000"));
    }

    [Test]
    public void ValidateReturnsValidPaymentWhenGoodPaymentValidated()
    {
      var payment = new Payment(5, 1, 100);
      var paymentService = new PaymentService(secrets);
      var paymentId = paymentService.pay(100, 5, 1, "5000-4000-3000-2000");
      var result = paymentService.claim(100, 5, 1, paymentId, "Merchant5Secret");
      Assert.That(result.Valid, Is.True);
      Assert.That(result.Claimed, Is.EqualTo(result.Made));
      Assert.That(result.Claimed.Amount, Is.EqualTo(payment.Amount));
      Assert.That(result.Claimed.MerchantId, Is.EqualTo(payment.MerchantId));
      Assert.That(result.Claimed.MerchantRef, Is.EqualTo(payment.MerchantRef));
      Assert.That(result.Claimed.DateClaimed, Is.Not.Null);
    }

    [Test]
    public void ValidateThrowsIfMerchantNotRecognised()
    {
      var paymentService = new PaymentService(secrets);
      Assert.Throws<UnknownMerchantException>(() => paymentService.claim(100, 4, 1, Guid.NewGuid(), "secret"));
    }

    [Test]
    public void ValidateThrowsIfMerchantSecretWrong()
    {
      var paymentService = new PaymentService(secrets);
      Assert.Throws<InvalidMerchantSecretException>(() => paymentService.claim(100, 5, 1, Guid.NewGuid(), "bad secret"));
    }

    [Test]
    public void ValidateReturnsPaymentNotFoundIfItHasNotBeenMade()
    {
      var paymentService = new PaymentService(secrets);
      Assert.Throws<PaymentNotFoundException>(() => paymentService.claim(100, 5, 1, Guid.NewGuid(), "Merchant5Secret"));
    }

    [Test]
    public void ValidateReturnsPaymentNotFoundIfItHasBeenMadeByAnotherMerchant()
    {
      secrets.Add(7, "AnotherSecret");
      var paymentService = new PaymentService(secrets);
      var paymentId = paymentService.pay(100, 7, 1, "5000-4000-3000-2000");
      Assert.Throws<PaymentMerchantMismatchException>(() => paymentService.claim(100, 5, 1, paymentId, "Merchant5Secret"));
    }

    [Test]
    public void ValidateReturnsInvalidPaymentWhenAmountDiffers()
    {
      var paymentMade = new Payment(5, 1, 100);
      var paymentValidated = new Payment(5, 1, 200);
      var paymentService = new PaymentService(secrets);
      var paymentId = paymentService.pay(100, 5, 1, "5000-4000-3000-2000");
      var result = paymentService.claim(200, 5, 1, paymentId, "Merchant5Secret");
      Assert.That(result, Is.EqualTo(new PaymentClaimResult(false, paymentMade, paymentValidated)));
    }

    [Test]
    public void ValidateReturnsInvalidPaymentWhenMerchantRefDiffers()
    {
      var paymentMade = new Payment(5, 1, 100);
      var paymentValidated = new Payment(5, 2, 100);
      var paymentService = new PaymentService(secrets);
      var paymentId = paymentService.pay(100, 5, 1, "5000-4000-3000-2000");
      var result = paymentService.claim(100, 5, 2, paymentId, "Merchant5Secret");
      Assert.That(result, Is.EqualTo(new PaymentClaimResult(false, paymentMade, paymentValidated)));
    }

    [Test]
    public void ValidateReturnsInvalidWhenGoodPaymentValidatedTwice()
    {
      var payment = new Payment(5, 1, 100);
      var paymentService = new PaymentService(secrets);
      var paymentId = paymentService.pay(100, 5, 1, "5000-4000-3000-2000");
      var firstResult = paymentService.claim(100, 5, 1, paymentId, "Merchant5Secret");
      Assume.That(firstResult.Valid, Is.True);
      var result = paymentService.claim(100, 5, 1, paymentId, "Merchant5Secret");
      Assert.That(result.Valid, Is.False);
    }
  }
}