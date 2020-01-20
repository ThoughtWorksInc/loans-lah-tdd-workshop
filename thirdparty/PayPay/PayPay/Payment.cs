using System;

namespace PayPay
{
  public struct Payment
  {
    public Payment(int merchantId, int merchantRef, int amount)
    {
      MerchantId = merchantId;
      MerchantRef = merchantRef;
      Amount = amount;
      dateClaimed = null;
    }
    public int MerchantId { get; }
    public int MerchantRef { get; }
    public int Amount { get; }

    private DateTime? dateClaimed;
    public DateTime? DateClaimed { 
      get
      {
        return dateClaimed;
      }
      set
      {
        if (dateClaimed == null) dateClaimed = value;
      }
    }
  }
}