using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Utils;

namespace SimplePasswordManagerService.Repositories;

public class CredentialRepo : ICredentialRepo
{
  private readonly IMongoCollection<Credentials> _collection;
  private readonly ILogger<CredentialRepo> _logger;
  private readonly EncryptSettings _settings;
  public CredentialRepo(IMongoClient client, ILogger<CredentialRepo> logger, IOptions<EncryptSettings> options)
  {
    _logger = logger;
    var database = client.GetDatabase("spms");
    _collection = database.GetCollection<Credentials>("credentials");
    _settings = options.Value;
  }

  /// <inheritdoc />
  public Credentials CreateCredentials(CredentialsRequest request, string userId)
  {
    // TODO: using secret managers
    var encryptedEmail = CryptoManager.Encrypt(request.Email,  _settings.SecretKey);
    _logger.LogInformation($"Result: {encryptedEmail}");
    // TODO: using secret managers
    var encryptedPassword = CryptoManager.Encrypt(request.Password, _settings.SecretKey);
    var newCred = new Credentials()
    {
      Id = Guid.NewGuid(),
      Email = encryptedEmail,
      Password = encryptedPassword,
      SiteUrl = request.SiteUrl,
      Description = request.Description,
      CreatedBy = userId,
      UpdatedBy = userId,
      CreateDateTime = DateTime.Now,
      UpdatedDateTime = DateTime.Now,
    };
    _collection.InsertOne(newCred);
    return newCred;
  }

  /// <inheritdoc />
  public List<Credentials> GetCredentials(string userId)
  {
    var builder = new FilterDefinitionBuilder<Credentials>();
    var filter = builder.Where(x => x.CreatedBy == userId);
    var result = new List<Credentials>();
    var cursor = _collection.FindSync(filter, new FindOptions<Credentials>());
    while (cursor.MoveNext())
    {
      result.AddRange(cursor.Current);
    }
    return result;
  }

  public void DeleteCredentials(Guid id)
  {
    _collection.DeleteOne(x => x.Id == id);
  }

  public Credentials? GetCredentialsById(Guid id, bool decrypt = false)
  {
    var data = new List<Credentials>();
    var result = _collection.FindSync(x => x.Id == id, new FindOptions<Credentials>()
    {
      Limit = 1,
    });
    while (result.MoveNext())
    {
      data.AddRange(result.Current);
    }
    var resultData = data.FirstOrDefault();
    if (resultData != null && decrypt)
    {
      // TODO: using secret managers
      resultData.Email = CryptoManager.Decrypt(resultData.Email, _settings.SecretKey);
      resultData.Password = CryptoManager.Decrypt(resultData.Password, _settings.SecretKey);
    }
    return resultData;
  }
}
