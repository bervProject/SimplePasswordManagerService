using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

namespace SimplePasswordManagerService.Pages;

public class ListCredsModel : PageModel
{
  private readonly ICredentialRepo _credentialRepo;

  public ListCredsModel(ICredentialRepo credentialRepo)
  {
    _credentialRepo = credentialRepo;
  }

  [BindProperty] public List<Credentials> _listCredentials { get; set; } = default!;

  public void OnGet()
  {
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
    {
      return;
    }
    _listCredentials = _credentialRepo.GetCredentials(userId);
  }
}
