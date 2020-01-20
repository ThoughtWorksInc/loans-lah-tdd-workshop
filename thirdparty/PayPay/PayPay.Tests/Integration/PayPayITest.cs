using NUnit.Framework;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;

namespace PayPay.Tests.Integration
{
  public class PayPayITest
  {
    WebApplicationFactory<Startup> appFactory;
    HttpClient client;

    [SetUp]
    public void SetUp()
    {
      appFactory = new WebApplicationFactory<Startup>();
      client = appFactory.CreateClient();
    }

    [TearDown]
    public void TearDown()
    {
      client.Dispose();
      appFactory.Dispose();
    }

    [Test]
    public async Task HappyPath()
    {
      var paymentBody = new StringContent(@"
      {
        ""amount"": 500,
	      ""merchantRef"": 1,
	      ""cardNumber"": ""500-1234""
      }
      ", Encoding.UTF8, "application/json");
      var paymentResponse = await client.PostAsync("/payment/5", paymentBody);
      Assert.That(paymentResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));
      var paymentRef = await paymentResponse.Content.ReadAsStringAsync();
      
      var claimBody = new StringContent(@"
      {
        ""amount"": 500,
	      ""merchantRef"": 1,
	      ""merchantSecret"": ""loansLahSecret""
      }
      ", Encoding.UTF8, "application/json");
      var claimResponse = await client.PostAsync($"/payment/5/claim/{paymentRef}", claimBody);
      Assert.That(claimResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));
      var claimResult = await claimResponse.Content.ReadAsStringAsync();

      using (JsonDocument doc = JsonDocument.Parse(claimResult)){
        var validElement = doc.RootElement.EnumerateObject().FirstOrDefault(it => it.Name == "valid");
        Assert.That(validElement.Value.GetBoolean, Is.True);
      }
    }
  }
}