using Amazon.CDK;
using Amazon.CDK.AWS.ECR;
using Constructs;

namespace SimplePasswordManagerService.Infra {
  public class SpmsRepo : Stack {
    internal SpmsRepo(Construct scope, string id, IStackProps props = null) : base(scope, id, props)
    {
      var repository = new Repository(this, "spms-ecr", new RepositoryProps {
        RepositoryName = "spms",        
        ImageTagMutability = TagMutability.MUTABLE,
        RemovalPolicy = RemovalPolicy.RETAIN,
        ImageScanOnPush = false,
        Encryption = RepositoryEncryption.KMS,
        LifecycleRules = new LifecycleRule[] {
        new LifecycleRule {
          MaxImageAge = Duration.Days(7),
          RulePriority = 1,
          TagStatus = TagStatus.UNTAGGED,
        }}
      });

      new CfnOutput(this, "output-spms-ecr", new CfnOutputProps {
        Value = repository.RepositoryArn
      });
    }
  }
}
