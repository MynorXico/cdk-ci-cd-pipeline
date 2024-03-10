import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props);

        const demolambda = new lambda.Function(this, 'LambdaFunction', {
            runtime: lambda.Runtime.PYTHON_3_10,
            handler: 'index.handler',
            code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
        })
    }
}