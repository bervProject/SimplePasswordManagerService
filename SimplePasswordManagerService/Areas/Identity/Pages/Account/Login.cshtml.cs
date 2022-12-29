using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SimplePasswordManagerService.Areas.Identity.Pages.Account;

public class Login : PageModel
{
  public IActionResult OnGet()
  {
    var props = new AuthenticationProperties();
    props.RedirectUri = "/";
    return Challenge(props);
  }
}
