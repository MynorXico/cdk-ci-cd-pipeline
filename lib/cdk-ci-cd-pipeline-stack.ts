import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';


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
  }
}
