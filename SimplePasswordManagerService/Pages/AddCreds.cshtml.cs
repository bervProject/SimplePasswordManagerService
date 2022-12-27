using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

namespace SimplePasswordManagerService.Pages;

[Authorize]
public class AddCredsModel : PageModel
{
  private readonly ILogger<AddCredsModel> _logger;
  private readonly ICredentialRepo _credentialRepo;

  public AddCredsModel(ICredentialRepo credentialRepo, ILogger<AddCredsModel> logger)
  {
    _logger = logger;
    _credentialRepo = credentialRepo;
  }

  public void OnGet()
  {

  }

  [BindProperty]
  public CredentialsRequest Creds { get; set; } = default!;

  public void OnPost()
  {
    if (!ModelState.IsValid)
    {
      return;
    }

    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
    {
      return;
    }

    var user = _credentialRepo.CreateCredentials(Creds, userId);
    _logger.LogInformation($"Created by: {user.CreatedBy}");
  }
}

