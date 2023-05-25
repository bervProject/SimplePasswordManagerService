using SimplePasswordManagerService.Business.Utils;

namespace SimplePasswordManagerService.Business.Tests.Utils;

public class CryptoManagerTest
{
  [Theory]
  [InlineData("test-encrypt")]
  [InlineData("test-encrypt-2")]
  [InlineData("test-encrypt-3")]
  [InlineData("test-encrypt-4")]
  [InlineData("test-encrypt-5")]
  public void EncryptTestResultIsBase64(string source)
  {
    // act
    var result = CryptoManager.Encrypt(source, "my-password");
    // assert
    var byteResult = new Span<byte>(new byte[result.Length]);
    var isSuccess = Convert.TryFromBase64String(result, byteResult, out var bytesWritten);
    Assert.True(isSuccess);
    Assert.NotEqual(0, bytesWritten);
  }

  [Theory]
  [InlineData("test-encrypt")]
  [InlineData("test-encrypt-2")]
  [InlineData("test-please")]
  public void DecryptCorrectly(string testString)
  {
    // arrange
    const string pass = "my-password";
    var encrypted = CryptoManager.Encrypt(testString, pass);
    // act
    var result = CryptoManager.Decrypt(encrypted, pass);
    // assert
    Assert.Equal(testString, result);
  }

}
