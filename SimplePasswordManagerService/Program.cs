using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;
using MongoDB.Driver;
using SimplePasswordManagerService.Business.Models;
using SimplePasswordManagerService.Business.Repositories;

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

// Add services to the container.
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddControllersWithViews()
    .AddMicrosoftIdentityUI();

builder.Services.AddAuthorization(options =>
{
  // By default, all incoming requests will be authorized according to the default policy
  options.FallbackPolicy = options.DefaultPolicy;
});

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor()
    .AddMicrosoftIdentityConsentHandler();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
  options.ForwardedHeaders =
      ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

app.UseForwardedHeaders();

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

app.MapControllers();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();

public partial class Program { }
