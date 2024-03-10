import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class CdkCiCdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // AWS CDK Pipeline
    const demoCiCdPipeline = new CodePipeline(this, 'demoCiCdPipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('MynorXico/cdk-ci-cd-pipeline', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

    const testingStage = demoCiCdPipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '842797708612', region: 'us-east-1' }
    }))
    testingStage.addPost(new ManualApprovalStep('Approve'));

    const prodStage = demoCiCdPipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '842797708612', region: 'us-east-1' }
    }));
  }
}
