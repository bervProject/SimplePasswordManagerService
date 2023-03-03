using Amazon.CDK;
using Amazon.CDK.AWS.ECR;
using Constructs;

namespace SimplePasswordManagerService.Infra {
  public class SimplePasswordManagerServiceInfraStack : Stack {
    internal SimplePasswordManagerServiceInfraStack(Construct scope, string id, IStackProps props = null) : base(scope, id, props) {
      var repository = new Repository(this, "spms", new RepositoryProps {
        RepositoryName = "spms",
        ImageTagMutability = TagMutability.MUTABLE,
        RemovalPolicy = RemovalPolicy.DESTROY,
        ImageScanOnPush = true,
        Encryption = RepositoryEncryption.KMS,
        LifecycleRules = new LifecycleRule[] {
        new LifecycleRule {
          MaxImageAge = Duration.Days(7),
          RulePriority = 1,
          TagStatus = TagStatus.UNTAGGED,
        }}
      });
    }
  }
}
