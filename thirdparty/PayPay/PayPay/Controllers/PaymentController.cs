using System;
using Microsoft.AspNetCore.Mvc;
using PayPay.Services;
using PayPay.Exceptions;
using Microsoft.Extensions.Logging;

namespace PayPay.Controllers
{

  [ApiController]
  [Route("payment")]
  public class PaymentController : ControllerBase
  {
    private readonly ILogger<PaymentController> _logger;
    private PaymentService paymentService;
    public PaymentController(PaymentService paymentService, ILogger<PaymentController> logger)
    {
      this.paymentService = paymentService;
      _logger = logger;
    }

    [HttpPost]
    [Route("{merchantId:int}")]
    public ActionResult<String> Pay(int merchantId, [FromBody] PayModel pay) {
      try
      {
        _logger.LogInformation($"Pay Merhcant: {merchantId}, {pay}");
        return paymentService.pay(pay.Amount, merchantId, pay.MerchantRef, pay.CardNumber).ToString();
      }
      catch (UnknownMerchantException)
      {
        _logger.LogInformation($"Merchant not found: {merchantId}");
        return NotFound();
      }
    }

    [HttpPost]
    [Route("{merchantId:int}/claim/{paymentId:Guid}")]
    public ActionResult<PaymentClaimResult> Claim(int merchantId, Guid paymentId, [FromBody] ClaimModel claim) {
      try
      {
        _logger.LogInformation($"Payment claim: {merchantId}, {paymentId}, {claim}");
        return paymentService.claim(claim.Amount, merchantId, claim.MerchantRef, paymentId, claim.MerchantSecret);
      }
      catch (UnknownMerchantException)
      {
        _logger.LogInformation($"Merhcant not found: {merchantId}");
        return NotFound();
      }
      catch (PaymentNotFoundException)
      {
        _logger.LogInformation($"Merhcant not found: {merchantId}, {paymentId}");
        return NotFound();
      }
      catch (InvalidMerchantSecretException)
      {
        _logger.LogInformation($"Merhcant Secret incorrect: {merchantId}");
        return NotFound();
      }
      catch (PaymentMerchantMismatchException)
      {
        _logger.LogInformation($"Merhcant Payment mismatch: {merchantId}, {paymentId}");
        return NotFound();
      }
    }
  }

  public struct PayModel
  {
    public int Amount { get; set; }
    public int MerchantRef { get; set; }
    public String CardNumber { get; set; }

    public override string ToString()
    {
      return $"PayModel[Amount: {Amount}, MerchantRef: {MerchantRef}, CardNumber: {CardNumber} ]";
    }
  }

  public struct ClaimModel 
  {
    public int Amount { get; set; }
    public int MerchantRef { get; set; }
    public String MerchantSecret { get; set; }

    public override string ToString()
    {
      return $"PayModel[Amount: {Amount}, MerchantRef: {MerchantRef}, MerchantSecret: --REDACTED-- ]";
    }
  }
}