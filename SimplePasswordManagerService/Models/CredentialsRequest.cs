namespace SimplePasswordManagerService.Models;

public record CredentialsRequest
{
  /// <summary>
  /// Should be encrypted
  /// </summary>
  public string Email { get; set; } = default!;
  /// <summary>
  /// Should be encrypted
  /// </summary>
  public string Password { get; set; } = default!;
  /// <summary>
  /// Required to check the site
  /// </summary>
  public string SiteUrl { get; set; } = default!;
  /// <summary>
  /// Description input
  /// </summary>
  public string? Description { get; set; }
}
