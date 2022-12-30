using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using MongoDB.Driver;
using SimplePasswordManagerService.Models;
using SimplePasswordManagerService.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add mongo
var mongoConnectionString = builder.Configuration.GetConnectionString("mongo");

// Add secret settings
builder.Services.Configure<EncryptSettings>(builder.Configuration.GetSection("EncryptSettings"));

if (!string.IsNullOrWhiteSpace(mongoConnectionString))
{
  var mongoClient = new MongoClient(mongoConnectionString);
  builder.Services.AddSingleton<IMongoClient>(mongoClient);
}
builder.Services.AddScoped<ICredentialRepo, CredentialRepo>();
// add authentication
builder.Services.AddAuthentication(
  options =>
  {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = MicrosoftAccountDefaults.AuthenticationScheme;
  })
  .AddCookie()
  .AddMicrosoftAccount(microsoftOptions =>
{
  var clientId = builder.Configuration["Authentication:Microsoft:ClientId"];
  var clientSecret = builder.Configuration["Authentication:Microsoft:ClientSecret"];
  if (string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(clientSecret)) return;
  microsoftOptions.ClientId = clientId;
  microsoftOptions.ClientSecret = clientSecret;
  microsoftOptions.SaveTokens = true;
});
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();

public partial class Program { }
