using Amazon.CDK;
using Amazon.CDK.AWS.AppRunner.Alpha;
using Amazon.CDK.AWS.ECR;
using Constructs;
using System.Collections.Generic;

namespace SimplePasswordManagerService.Infra {
  public class SimplePasswordManagerServiceInfraStack : Stack {
    internal SimplePasswordManagerServiceInfraStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props) {
      // 0.0 ECR
      var repository = Repository.FromRepositoryName(this, "spms-ecr", "spms");

      // 1.0 AppRunner
      var appRunnerSecret = Amazon.CDK.AWS.SecretsManager.Secret.FromSecretNameV2(this, "apprunner-secret", "dev/AppRunner/spms");

      var imageTag = new CfnParameter(this, "imageTag", new CfnParameterProps {
        Type = "String",
        Description = "Target tag"
      });

      var appRunner = new Service(this, "spms-apprunner", new ServiceProps {
        Source = Source.FromEcr(new EcrProps {
          Repository = repository,
          ImageConfiguration = new ImageConfiguration {
            Port = 80,
            EnvironmentSecrets = new Dictionary<string, Secret> {
              {"AzureAd__ClientId", Secret.FromSecretsManager(appRunnerSecret, "Authentication__Microsoft__ClientId")},
              {"AzureAd__ClientSecret", Secret.FromSecretsManager(appRunnerSecret, "Authentication__Microsoft__ClientSecret")},
              {"ConnectionStrings__mongo", Secret.FromSecretsManager(appRunnerSecret, "ConnectionStrings__mongo")},
            },
            EnvironmentVariables = new Dictionary<string, string> {
              {"ASPNETCORE_FORWARDEDHEADERS_ENABLED", "true" }
            }
          },
          TagOrDigest = imageTag.ValueAsString
        }),
      });

      new CfnOutput(this, "output-spms-apprunner-url", new CfnOutputProps {
        Value = appRunner.ServiceUrl
      });
    }
  }
}
