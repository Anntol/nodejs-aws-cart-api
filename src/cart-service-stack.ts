import * as cdk from 'aws-cdk-lib';
import { AuthorizationType, LambdaIntegration, LambdaRestApi, ResponseType, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';

require('dotenv').config();

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    const cartApiLambda = new lambda.Function(this, "CartApiLambda", {
      code: lambda.Code.fromAsset("dist"),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "main.handler",
    });

    const api = new LambdaRestApi(this, "CartApi", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["*"],
        allowOrigins: ["*"],
        allowMethods: ["*"],
        allowCredentials: true
      },
      handler: cartApiLambda
    });

    api.addGatewayResponse("GatewayResponse4XX", {
      type: ResponseType.DEFAULT_4XX,
      responseHeaders: {
        "Access-Control-Allow-Origin": "'*'",
        "Access-Control-Allow-Headers":
          "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "Access-Control-Allow-Methods": "'OPTIONS,GET,PUT'"
      },
    });

    new cdk.CfnOutput(this, "cartApiUrl", {value: api.url});
  }
}
