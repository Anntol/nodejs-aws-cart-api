import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';

require('dotenv').config();

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartApiLambda = new lambda.Function(this, "CartApiLambda", {
      code: lambda.Code.fromAsset("dist"),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "main.handler"
    });

    const api = new RestApi(this, "Api");
    const cartResource = api.root.addResource("cart");
    cartResource.addProxy({
      defaultIntegration: new LambdaIntegration(cartApiLambda, { proxy: true }),
    });

    new cdk.CfnOutput(this, "cartApiUrl", {value: api.url});
  }
}
