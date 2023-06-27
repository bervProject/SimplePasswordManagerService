namespace SimplePasswordManagerService.Healths;

using Microsoft.Extensions.Diagnostics.HealthChecks;
using SimplePasswordManagerService.Business.Repositories;

public class MongoHealthCheck : IHealthCheck
{
    private readonly ICredentialRepo _credRepo;

    public MongoHealthCheck(ICredentialRepo credRepo)
    {
        _credRepo = credRepo;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            var healthy = await _credRepo.IsHealthy();
            return healthy ? HealthCheckResult.Healthy() : HealthCheckResult.Unhealthy();
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy();
        }
    }
}
