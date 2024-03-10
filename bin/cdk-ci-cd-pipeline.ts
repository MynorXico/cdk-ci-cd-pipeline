#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCiCdPipelineStack } from '../lib/cdk-ci-cd-pipeline-stack';

const app = new cdk.App();
new CdkCiCdPipelineStack(app, 'CdkCiCdPipelineStack', {
  env: { account: '842797708612', region: 'us-east-1' }
});