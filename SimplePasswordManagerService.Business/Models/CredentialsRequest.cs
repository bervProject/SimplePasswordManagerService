using System.ComponentModel.DataAnnotations;

namespace SimplePasswordManagerService.Business.Models;

public record CredentialsRequest
{
  /// <summary>
  /// Should be encrypted
  /// </summary>
  [Required]
  public string Email { get; set; } = default!;
  /// <summary>
  /// Should be encrypted
  /// </summary>
  [Required]
  public string Password { get; set; } = default!;
  /// <summary>
  /// Required to check the site
  /// </summary>
  [Required]
  public string SiteUrl { get; set; } = default!;
  /// <summary>
  /// Description input
  /// </summary>
  public string? Description { get; set; }
}
