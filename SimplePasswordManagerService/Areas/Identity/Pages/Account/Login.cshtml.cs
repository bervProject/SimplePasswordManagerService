using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SimplePasswordManagerService.Areas.Identity.Pages.Account;

public class Login : PageModel
{
  private readonly string? _redirectUri;
  public Login(IConfiguration configuration)
  {
    _redirectUri = configuration["Authentication:Microsoft:RedirectUri"];
  }
  public IActionResult OnGet()
  {
    var props = new AuthenticationProperties();
    props.RedirectUri = _redirectUri;
    return Challenge(props);
  }
}
