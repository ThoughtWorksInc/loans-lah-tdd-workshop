using System;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using PayPay.Controllers;
using PayPay.Services;
using PayPay.Exceptions;
using Moq;
using Microsoft.Extensions.Logging;

namespace PayPay.Tests.Controllers
{
  public class PaymentControllerTest
  {
    Mock<ILogger<PaymentController>> logger = new Mock<ILogger<PaymentController>>();
    [Test]
    public void PayReturnsPaymentId()
    {
      var paymentService = new Mock<PaymentService>();

      var expectedId = Guid.NewGuid();

      paymentService.Setup((m) => m.pay(100, 5, 1, "1234")).Returns(expectedId);

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var payment = new PayModel{
        Amount = 100,
        MerchantRef = 1,
        CardNumber = "1234"
      };
      var result = controller.Pay(5, payment);

      Assert.That(result.Value, Is.EqualTo(expectedId.ToString()));
    }

    [Test]
    public void PayReturnsNotFoundForMerchantUnknown()
    {
      var paymentService = new Mock<PaymentService>();

      var expectedId = Guid.NewGuid();

      paymentService.Setup((m) => m.pay(100, 5, 1, "1234")).Throws(new UnknownMerchantException());

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var payment = new PayModel{
        Amount = 100,
        MerchantRef = 1,
        CardNumber = "1234"
      };
      var result = controller.Pay(5, payment);

      Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
    }

    [Test]
    public void ValidateReturnsTheValidationResult()
    {
      var paymentService = new Mock<PaymentService>();

      var expected = new PaymentClaimResult(true, new Payment(1,2,3), new Payment(4,5,6));
      var paymentId = Guid.NewGuid();

      paymentService.Setup((m) => m.claim(100, 5, 3, paymentId, "Shh!")).Returns(expected);

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var validate = new ClaimModel{
        Amount = 100, 
        MerchantRef = 3, 
        MerchantSecret = "Shh!"
      };

      var result = controller.Claim(5, paymentId, validate);

      Assert.That(result.Value, Is.EqualTo(expected));
    }

    [Test]
    public void ValidateReturnsNotFoundForUnkownMerchant()
    {
      var paymentService = new Mock<PaymentService>();

      var paymentId = Guid.NewGuid();

      paymentService.Setup((m) => m.claim(100, 5, 3, paymentId, "Shh!")).Throws(new UnknownMerchantException());

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var validate = new ClaimModel{
        Amount = 100,
        MerchantRef = 3,
        MerchantSecret = "Shh!"
      };

      var result = controller.Claim(5, paymentId, validate);

      Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
    }

    [Test]
    public void ValidateReturnsNotFoundForPaymentNotFound()
    {
      var paymentService = new Mock<PaymentService>();

      var paymentId = Guid.NewGuid();

      paymentService.Setup((m) => m.claim(100, 5, 3, paymentId, "Shh!")).Throws(new PaymentNotFoundException());

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var validate = new ClaimModel{
        Amount = 100,
        MerchantRef = 3,
        MerchantSecret = "Shh!"
      };

      var result = controller.Claim(5, paymentId, validate);

      Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
    }

    [Test]
    public void ValidateReturnsNotFoundForInvalidMerchantSecretException()
    {
      var paymentService = new Mock<PaymentService>();

      var paymentId = Guid.NewGuid();

      paymentService.Setup((m) => m.claim(100, 5, 3, paymentId, "Shh!")).Throws(new InvalidMerchantSecretException());

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var validate = new ClaimModel{
        Amount = 100,
        MerchantRef = 3,
        MerchantSecret = "Shh!"
      };

      var result = controller.Claim(5, paymentId, validate);

      Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
    }

    [Test]
    public void ValidateReturnsNotFoundForPaymentMerchantMismatchException()
    {
      var paymentService = new Mock<PaymentService>();

      var paymentId = Guid.NewGuid();

      paymentService.Setup((m) => m.claim(100, 5, 3, paymentId, "Shh!")).Throws(new PaymentMerchantMismatchException());

      var controller = new PaymentController(paymentService.Object, logger.Object);
      var validate = new ClaimModel{
        Amount = 100,
        MerchantRef = 3,
        MerchantSecret = "Shh!"
      };

      var result = controller.Claim(5, paymentId, validate);

      Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
    }
  } 
}