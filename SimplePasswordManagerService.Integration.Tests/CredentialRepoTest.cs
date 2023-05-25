using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using SimplePasswordManagerService.Business.Models;
using SimplePasswordManagerService.Business.Repositories;

namespace SimplePasswordManagerService.Integration.Tests;

public class CredentialRepoTest : IClassFixture<WebApplicationFactory<Program>>, IDisposable
{
  private readonly ICredentialRepo _repo;
  private readonly IMongoCollection<Credentials> _mongoCollection;

  public CredentialRepoTest(WebApplicationFactory<Program> factory)
  {
    var scopeFactory = (IServiceScopeFactory)factory.Services.GetRequiredService(typeof(IServiceScopeFactory));
    using (var scope = scopeFactory.CreateScope())
    {
      _repo = (ICredentialRepo)scope.ServiceProvider.GetRequiredService(typeof(ICredentialRepo));
    }
    var client = (IMongoClient)factory.Services.GetRequiredService(typeof(IMongoClient));
    var database = client.GetDatabase("spms");
    _mongoCollection = database.GetCollection<Credentials>("credentials");
  }

  public void Dispose()
  {
    _mongoCollection.DeleteMany(x => true);
  }

  [Fact]
  public void InsertSuccess()
  {
    // arrange
    const string userId = "mock-user";
    var credRequest = new CredentialsRequest()
    {
      Email = "hello@hello.hello",
      Password = "testtest",
      Description = "Yes",
      SiteUrl = "ok"
    };
    // act
    var result = _repo.CreateCredentials(credRequest, userId);
    // assert
    Assert.NotNull(result);
    Assert.NotEqual(Guid.Empty, result.Id);
    Assert.Equal(userId, result.CreatedBy);
    Assert.Equal(userId, result.UpdatedBy);
    Assert.Equal("Yes", result.Description);
    Assert.Equal("ok", result.SiteUrl);
    Assert.NotEqual("hello@hello.hello", result.Email);
    Assert.NotEqual("testtest", result.Password);
    // check actual data
    var data = _mongoCollection.FindSync(x => x.Id == result.Id);
    var allData = new List<Credentials>();
    while (data.MoveNext())
    {
      allData.AddRange(data.Current);
    }
    var currentData = allData.FirstOrDefault();
    Assert.NotNull(currentData);
    Assert.Equal(result.Id, currentData.Id);
  }

  [Fact]
  public void DeleteSuccess()
  {
    // arrange
    const string userId = "mock-user";
    var credRequest = new CredentialsRequest()
    {
      Email = "hello@hello.hello",
      Password = "testtest",
      Description = "Yes",
      SiteUrl = "ok"
    };
    var result = _repo.CreateCredentials(credRequest, userId);
    // act
    _repo.DeleteCredentials(userId, result.Id);
    // assert
    var data = _mongoCollection.FindSync(x => x.Id == result.Id);
    var allData = new List<Credentials>();
    while (data.MoveNext())
    {
      allData.AddRange(data.Current);
    }
    var currentData = allData.FirstOrDefault();
    Assert.Null(currentData);
  }

  [Fact]
  public void GetListSuccess()
  {
    // arrange
    const string userId = "mock-user";
    var credRequest = new CredentialsRequest()
    {
      Email = "hello@hello.hello",
      Password = "testtest",
      Description = "Yes",
      SiteUrl = "ok"
    };
    var result = _repo.CreateCredentials(credRequest, userId);
    // act
    var listData = _repo.GetCredentials(userId);
    // assert
    Assert.NotNull(listData);
    Assert.Single(listData);
    var firstData = listData.Single();
    Assert.Equal(result.Id, firstData.Id);
  }

  [Fact]
  public void GetByIdSuccess()
  {
    // arrange
    const string userId = "mock-user";
    var credRequest = new CredentialsRequest()
    {
      Email = "hello@hello.hello",
      Password = "testtest",
      Description = "Yes",
      SiteUrl = "ok"
    };
    var result = _repo.CreateCredentials(credRequest, userId);
    // act
    var creds = _repo.GetCredentialsById(result.Id, userId);
    // assert
    Assert.NotNull(creds);
    Assert.Equal(result.Id, creds.Id);
  }
}
