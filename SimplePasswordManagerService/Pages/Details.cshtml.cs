using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

namespace SimplePasswordManagerService.Pages;

[Authorize]
public class Details : PageModel
{
  private readonly ICredentialRepo _credentialRepo;

  public Details(ICredentialRepo credentialRepo)
  {
    _credentialRepo = credentialRepo;
  }
  public Credentials? Data { get; set; }

  public void OnGet(Guid id)
  {
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
    {
      return;
    }
    Data = _credentialRepo.GetCredentialsById(id, userId, true);
  }
}
