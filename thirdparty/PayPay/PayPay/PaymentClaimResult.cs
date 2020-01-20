using System;

namespace PayPay
{
  public struct PaymentClaimResult
  {
    public PaymentClaimResult(bool valid, Payment made, Payment claimed)
    {
      Valid = valid;
      Made = made;
      Claimed = claimed;
    }
    
    public bool Valid { get; }
    public Payment Made { get; }
    public Payment Claimed { get; }
  }
}