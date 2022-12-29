using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SimplePasswordManagerService.Areas.Identity.Pages.Account;

public class Logout : PageModel
{
  public async Task<IActionResult> OnPostAsync()
  {
    await HttpContext.SignOutAsync();
    return RedirectToPage("/Index");
  }
}
