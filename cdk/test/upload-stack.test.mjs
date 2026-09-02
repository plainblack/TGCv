import assert from 'node:assert/strict';
import test from 'node:test';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import constants from '../lib/constants.mjs';
import { UploadStack } from '../lib/upload-stack.mjs';
import { generateSuffix } from '../lib/utils.mjs';

test('an existing developer stack can be targeted by its stable suffix', () => {
  assert.deepEqual(constants.devEnvironments['20ae0cc3'], {
    owner: 'Colin',
    uploadProcessorMemorySize: 256,
  });
  assert.deepEqual(constants.devEnvironments['4c319b07'], {
    owner: 'JT',
    uploadProcessorMemorySize: 1024,
  });
  assert.equal(generateSuffix('dev', '20ae0cc3'), '20ae0cc3');
  assert.throws(
    () => generateSuffix('dev', 'not-a-hash'),
    /exactly eight lowercase hexadecimal characters/,
  );
  assert.throws(
    () => generateSuffix('prod', '20ae0cc3'),
    /only be used with the dev stage/,
  );
});

test('development upload infrastructure identifies its owner and uses Node.js 24', () => {
  const app = new App();
  const stack = new UploadStack(app, 'TestUploadStack', {
    stage: 'dev',
    constants,
    stageConfig: constants.stages.dev,
    environmentOwner: 'JT',
    formatName: (name) => `tgcv-dev-${name}4c319b07`,
  });
  const template = Template.fromStack(stack);

  assert.equal(
    template.toJSON().Description,
    "Hardware app development upload stack for JT",
  );

  const [uploadFunction] = Object.values(template.findResources('AWS::Lambda::Function'));
  assert.equal(uploadFunction.Properties.Runtime, 'nodejs24.x');
  assert.equal(
    uploadFunction.Properties.Description,
    "Hardware app upload processor for JT's dev environment",
  );
  assert.deepEqual(
    uploadFunction.Properties.Tags.find(({ Key }) => Key === 'Application'),
    { Key: 'Application', Value: 'Hardware' },
  );
  assert.deepEqual(
    uploadFunction.Properties.Tags.find(({ Key }) => Key === 'Owner'),
    { Key: 'Owner', Value: 'JT' },
  );

  const [nodeModulesLayer] = Object.values(
    template.findResources('AWS::Lambda::LayerVersion'),
  );
  assert.deepEqual(nodeModulesLayer.Properties.CompatibleRuntimes, ['nodejs24.x']);
});
