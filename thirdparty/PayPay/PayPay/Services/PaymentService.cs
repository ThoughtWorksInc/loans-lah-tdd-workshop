using System;
using System.Collections.Generic;
using PayPay.Exceptions;

namespace PayPay.Services
{
  public class PaymentService
  {
    private IDictionary<int, String> merchantSecrets;

    private IDictionary<Guid, Payment> payments = new Dictionary<Guid, Payment>(); 

    public PaymentService()
    {
      this.merchantSecrets = new Dictionary<int, String>();
    }
    public PaymentService(IDictionary<int, String> merchantSecrets)
    {
      this.merchantSecrets = merchantSecrets;
    }
    public virtual Guid pay(int amount, int merchantId, int merchantRef, String cardNumber)
    {
      if (!merchantSecrets.ContainsKey(merchantId))
        throw new UnknownMerchantException();

      var payment = new Payment(merchantId, merchantRef, amount);
      var paymentId = Guid.NewGuid();
      payments.Add(paymentId, payment);
      return paymentId;
    }

    public virtual PaymentClaimResult claim(int amount, int merchantId, int merchantRef, Guid paymentId, String merchantSecret)
    {
      if (!merchantSecrets.ContainsKey(merchantId))
        throw new UnknownMerchantException();
      if (merchantSecrets[merchantId] != merchantSecret)
        throw new InvalidMerchantSecretException();
      if (!payments.TryGetValue(paymentId, out var paymentMade))
        throw new PaymentNotFoundException();
      if (paymentMade.MerchantId != merchantId)
        throw new PaymentMerchantMismatchException();
      
      var paymentClaimed = new Payment(merchantId, merchantRef, amount);
      var valid = paymentMade.Equals(paymentClaimed);
      if (valid) {
        var claimDate = DateTime.Now;
        paymentMade.DateClaimed = claimDate;
        paymentClaimed.DateClaimed = claimDate;
        payments[paymentId] = paymentMade;
      }
      
      return new PaymentClaimResult(valid, paymentMade, paymentClaimed);
    }
  }
}