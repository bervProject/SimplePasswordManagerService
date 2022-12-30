using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

namespace SimplePasswordManagerService.Pages;

[Authorize]
public class ListCredsModel : PageModel
{
  private readonly ICredentialRepo _credentialRepo;

  public ListCredsModel(ICredentialRepo credentialRepo)
  {
    _credentialRepo = credentialRepo;
  }

  [BindProperty] public List<Credentials> _listCredentials { get; set; } = new();

  public void OnGet()
  {
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
    {
      return;
    }
    _listCredentials = _credentialRepo.GetCredentials(userId);
  }

  public IActionResult OnPostDeleteCred(Guid id)
  {
    _credentialRepo.DeleteCredentials(id);
    return RedirectToPage("/ListCreds");
  }
}
