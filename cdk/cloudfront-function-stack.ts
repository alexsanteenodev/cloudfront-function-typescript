import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";

export class CloudFrontFunctionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new cloudfront.Function(this, "ExampleFunction", {
      functionName: "example-function",
      code: cloudfront.FunctionCode.fromFile({
        filePath: "dist/src/viewerRequestFunction.js",
      }),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    });
  }
}
