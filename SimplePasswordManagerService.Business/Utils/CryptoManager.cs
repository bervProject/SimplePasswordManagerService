using System.Security.Cryptography;
using System.Text;

namespace SimplePasswordManagerService.Business.Utils;

public static class CryptoManager
{
  /// <summary>
  /// Encrypt source
  /// </summary>
  /// <param name="source">Source string. TODO: use SecureString</param>
  /// <param name="password">Password/Key. TODO: use SecureString</param>
  /// <returns>TODO: use SecureString</returns>
  public static string Encrypt(string source, string password)
  {
    using var aes = Aes.Create();
    // get bytes
    byte[] passwordBytes = Encoding.ASCII.GetBytes(password);
    byte[] aesKey = SHA256.Create().ComputeHash(passwordBytes);
    byte[] aesIV = MD5.Create().ComputeHash(passwordBytes);
    // setup AES
    aes.Key = aesKey;
    aes.IV = aesIV;
    // create encryptor
    var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
    // init memory stream
    using var memoryStream = new MemoryStream();
    // init writer stream
    var byteStrings = Encoding.ASCII.GetBytes(source);
    using var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);
    cryptoStream.Write(byteStrings, 0, byteStrings.Length);
    cryptoStream.FlushFinalBlock();
    return Convert.ToBase64String(memoryStream.ToArray());
  }

  /// <summary>
  /// Decrypt source
  /// </summary>
  /// <param name="source"></param>
  /// <param name="password"></param>
  /// <returns></returns>
  public static string Decrypt(string source, string password)
  {
    using var aes = Aes.Create();
    // get bytes
    byte[] passwordBytes = Encoding.ASCII.GetBytes(password);
    byte[] aesKey = SHA256.Create().ComputeHash(passwordBytes);
    byte[] aesIV = MD5.Create().ComputeHash(passwordBytes);
    // setup AES
    aes.Key = aesKey;
    aes.IV = aesIV;
    // create decryptor
    var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
    // init memory stream
    using var memoryStream = new MemoryStream();
    // init writer stream
    using var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Write);
    var bytes = Convert.FromBase64String(source);
    cryptoStream.Write(bytes, 0, bytes.Length);
    cryptoStream.FlushFinalBlock();
    return Encoding.ASCII.GetString(memoryStream.ToArray());
  }
}
