using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SimplePasswordManagerService.Business.Models;

public record Credentials
{
  [BsonGuidRepresentation(GuidRepresentation.Standard)]
  public Guid Id { get; set; } = default!;
  /// <summary>
  /// Users Mapping
  /// </summary>
  public string CreatedBy { get; set; } = default!;
  /// <summary>
  /// Required
  /// </summary>
  public DateTime CreateDateTime { get; set; }
  /// <summary>
  /// Required to check updates
  /// </summary>
  public string UpdatedBy { get; set; } = default!;
  /// <summary>
  /// Required
  /// </summary>
  public DateTime UpdatedDateTime { get; set; }
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
  /// <summary>
  /// Decrypted Password
  /// </summary>
  [BsonIgnore]
  public string? DecryptedPassword { get; set; }
}
