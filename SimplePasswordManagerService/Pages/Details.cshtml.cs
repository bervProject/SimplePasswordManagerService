using Microsoft.AspNetCore.Mvc.RazorPages;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

namespace SimplePasswordManagerService.Pages;

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
    Data = _credentialRepo.GetCredentialsById(id, true);
  }
}
