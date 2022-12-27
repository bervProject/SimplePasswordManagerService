using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Utils;

namespace SimplePasswordManagerService.Repositories;

public class CredentialRepo : ICredentialRepo
{
  private readonly IMongoCollection<Credentials> _collection;
  private readonly ILogger<CredentialRepo> _logger;

  public CredentialRepo(IMongoClient client, ILogger<CredentialRepo> logger)
  {
    _logger = logger;
    var database = client.GetDatabase("spms");
    _collection = database.GetCollection<Credentials>("credentials");
  }

  /// <inheritdoc />
  public Credentials CreateCredentials(CredentialsRequest request, string userId)
  {
    var encryptedEmail = CryptoManager.Encrypt(request.Email,  "my-pass");
    _logger.LogInformation($"Result: {encryptedEmail}");
    var encryptedPassword = CryptoManager.Encrypt(request.Password, "my-pass");
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
}
