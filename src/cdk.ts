import * as cdk from 'aws-cdk-lib';
import { CartServiceStack } from './cart-service-stack';

const app = new cdk.App();
new CartServiceStack(app, 'CartServiceStack', {});