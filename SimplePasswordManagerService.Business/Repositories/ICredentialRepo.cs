using SimplePasswordManagerService.Business.Models;

namespace SimplePasswordManagerService.Business.Repositories;

public interface ICredentialRepo
{
  /// <summary>
  /// Create Credentials
  /// </summary>
  /// <param name="request"></param>
  /// <param name="userId"></param>
  /// <returns></returns>
  Credentials CreateCredentials(CredentialsRequest request, string userId);
  /// <summary>
  /// Get Credentials
  /// </summary>
  /// <param name="userId">User Id</param>
  /// <returns></returns>
  List<Credentials> GetCredentials(string userId);
  /// <summary>
  /// Delete credentials
  /// </summary>
  /// <param name="id"></param>

  void DeleteCredentials(string userId, Guid id);

  /// <summary>
  /// Get Credentials by Id
  /// </summary>
  /// <param name="id"></param>
  /// <param name="decrypt"></param>

  Credentials? GetCredentialsById(Guid id, string userId, bool decrypt = false);
}
