using Microsoft.AspNetCore.Identity;
using SimplePasswordManagerService.Models;

namespace SimplePasswordManagerService.Repositories;

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
}
