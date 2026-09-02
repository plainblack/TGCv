#!/usr/bin/env node

import cdk from 'aws-cdk-lib';
import { UploadStack } from '../lib/upload-stack.mjs';
import { NetworkStack } from '../lib/network-stack.mjs';
import { DatabaseStack } from '../lib/database-stack.mjs';
import { WebStack } from '../lib/web-stack.mjs';
import { generatePrefix, generateSuffix } from '../lib/utils.mjs';
import constants from '../lib/constants.mjs';

const app = new cdk.App();
const stage = app.node.getContext('stage');

if (!stage) {
  throw new Error('Stage is not defined');
}

if (!constants.stages[stage]) {
  throw new Error(`Stage ${stage} is not a valid stage`);
}

const prefix = generatePrefix(stage);
const suffix = generateSuffix(stage, app.node.tryGetContext('devSuffix'));
const devEnvironment = stage === 'dev' ? constants.devEnvironments[suffix] : undefined;
const environmentOwner = stage === 'dev'
  ? app.node.tryGetContext('devOwner') || devEnvironment?.owner
  : undefined;
const stageConfig = devEnvironment
  ? {
      ...constants.stages[stage],
      uploadsLambdaSettings: {
        ...constants.stages[stage].uploadsLambdaSettings,
        memorySize: devEnvironment.uploadProcessorMemorySize,
      },
    }
  : constants.stages[stage];

if (stage === 'dev' && !environmentOwner) {
  throw new Error(
    `No owner is configured for dev environment ${suffix}. ` +
    'Pass -c devOwner=<name> so the stack and Lambda identify their owner.',
  );
}

new UploadStack(app, `${prefix}-UploadStack${suffix}`, {
  stage,
  constants,
  stageConfig,
  environmentOwner,
  formatName: (name) => `${prefix}-${name}${suffix}`,
  env: { account: constants.stages[stage].account, region: constants.stages[stage].region },
});

if (stage != 'dev') {

  /*
  const network = new NetworkStack(app, `${prefix}-NetworkStack${suffix}`, {
    stage,
    constants,
    stageConfig: constants.stages[stage],
    formatName: (name) => `${prefix}-${name}${suffix}`,
    env: { account: constants.stages[stage].account, region: constants.stages[stage].region },
  });
  */

  /*new DatabaseStack(app, `${prefix}-DatabaseStack${suffix}`, {
    vpc: network.vpc,
    stage,
    constants,
    stageConfig: constants.stages[stage],
    formatName: (name) => `${prefix}-${name}${suffix}`,
    env: { account: constants.stages[stage].account, region: constants.stages[stage].region },
  });
  */
  /*
    new WebStack(app, `${prefix}-WebStack${suffix}`, {
      vpc: network.vpc,
      stage,
      constants,
      stageConfig: constants.stages[stage],
      formatName: (name) => `${prefix}-${name}${suffix}`,
      env: { account: constants.stages[stage].account, region: constants.stages[stage].region },
    });
  */
}
