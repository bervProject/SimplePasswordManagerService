using Amazon.CDK;
using Amazon.CDK.AWS.ECS;
using Amazon.CDK.AWS.ECR;
using Amazon.CDK.AWS.IAM;
using Constructs;
using System.Collections.Generic;

namespace SimplePasswordManagerService.Infra {
  public class SimplePasswordManagerServiceInfraStack : Stack {
    internal SimplePasswordManagerServiceInfraStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props) {
      // 0.0 ECR
      var repository = Repository.FromRepositoryName(this, "spms-ecr", "spms");

      // 1.0 Parameters
      var secretArn = new CfnParameter(this, "secretArn", new CfnParameterProps {
        Type = "String",
        Description = "Full ARN of the Secrets Manager secret (e.g. arn:aws:secretsmanager:<region>:<account>:secret:dev/AppRunner/spms-AbCdEf)"
      });
      var secret = Amazon.CDK.AWS.SecretsManager.Secret.FromSecretCompleteArn(this, "ecs-secret", secretArn.ValueAsString);

      var imageTag = new CfnParameter(this, "imageTag", new CfnParameterProps {
        Type = "String",
        Description = "Target tag"
      });

      // 2.0 IAM Roles
      // Task Execution Role — pulls images from ECR and writes logs
      var taskExecutionRole = new Role(this, "spms-task-execution-role", new RoleProps {
        AssumedBy = new ServicePrincipal("ecs-tasks.amazonaws.com"),
        ManagedPolicies = new IManagedPolicy[] {
          ManagedPolicy.FromAwsManagedPolicyName("service-role/AmazonECSTaskExecutionRolePolicy")
        }
      });
      // Full ARN is passed in as a parameter, so no wildcard suffix is needed.
      taskExecutionRole.AddToPolicy(new PolicyStatement(new PolicyStatementProps {
        Effect = Effect.ALLOW,
        Actions = new[] { "secretsmanager:GetSecretValue" },
        Resources = new[] { secret.SecretArn }
      }));

      // Task Role — runtime permissions for the application
      var taskRole = new Role(this, "spms-task-role", new RoleProps {
        AssumedBy = new ServicePrincipal("ecs-tasks.amazonaws.com")
      });

      // Infrastructure Role — ECS Express Mode manages AWS resources on your behalf
      var infrastructureRole = new Role(this, "spms-infrastructure-role", new RoleProps {
        AssumedBy = new ServicePrincipal("ecs.amazonaws.com"),
        ManagedPolicies = new IManagedPolicy[] {
          ManagedPolicy.FromAwsManagedPolicyName("service-role/AmazonECSInfrastructureRoleforExpressGatewayServices")
        }
      });

      // 3.0 ECS Express Mode Service
      var imageUri = $"{repository.RepositoryUri}:{imageTag.ValueAsString}";

      var expressService = new CfnExpressGatewayService(this, "spms-ecs-express", new CfnExpressGatewayServiceProps {
        ServiceName = "spms-express-service",
        ExecutionRoleArn = taskExecutionRole.RoleArn,
        TaskRoleArn = taskRole.RoleArn,
        InfrastructureRoleArn = infrastructureRole.RoleArn,
        Cpu = "256",
        Memory = "512",
        HealthCheckPath = "/health",
        PrimaryContainer = new CfnExpressGatewayService.ExpressGatewayContainerProperty {
          Image = imageUri,
          ContainerPort = 8080,
          Environment = new [] {
            new CfnExpressGatewayService.KeyValuePairProperty { Name = "ASPNETCORE_FORWARDEDHEADERS_ENABLED", Value = "true" }
          },
          Secrets = new [] {
            new CfnExpressGatewayService.SecretProperty { Name = "AzureAd__ClientId",     ValueFrom = $"{secret.SecretArn}:Authentication__Microsoft__ClientId::" },
            new CfnExpressGatewayService.SecretProperty { Name = "AzureAd__ClientSecret", ValueFrom = $"{secret.SecretArn}:Authentication__Microsoft__ClientSecret::" },
            new CfnExpressGatewayService.SecretProperty { Name = "ConnectionStrings__mongo", ValueFrom = $"{secret.SecretArn}:ConnectionStrings__mongo::" }
          },
          AwsLogsConfiguration = new CfnExpressGatewayService.ExpressGatewayServiceAwsLogsConfigurationProperty {
            LogGroup = "/aws/ecs/spms-express",
            LogStreamPrefix = "spms"
          }
        },
        ScalingTarget = new CfnExpressGatewayService.ExpressGatewayScalingTargetProperty {
          AutoScalingMetric = "REQUEST_COUNT_PER_TARGET",
          AutoScalingTargetValue = 20,
          MinTaskCount = 1,
          MaxTaskCount = 3
        }
      });

      new CfnOutput(this, "output-spms-ecs-express-arn", new CfnOutputProps {
        Value = expressService.AttrServiceArn
      });

      new CfnOutput(this, "output-spms-ecs-express-endpoint", new CfnOutputProps {
        Value = expressService.AttrEndpoint
      });
    }
  }
}
