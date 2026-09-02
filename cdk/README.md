# Welcome to your CDK JavaScript project

This is a blank project for CDK development with JavaScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

* `npm run test`         perform the infrastructure unit tests
* `npx cdk deploy`       deploy this stack to your default AWS account/region
* `npx cdk diff`         compare deployed stack with current state
* `npx cdk synth`        emits the synthesized CloudFormation template

Development stacks include owner metadata. Known environments are selected by their stable
suffix, so an existing environment can be managed without changing its CloudFormation identity:

```sh
npx cdk deploy -c stage=dev -c devSuffix=20ae0cc3
npx cdk deploy -c stage=dev -c devSuffix=4c319b07
```

For a new suffix, also pass `-c devOwner=<name>` until its durable owner mapping is added to
`lib/constants.mjs`.
