import { usernameSync } from 'username';
import { miniHash } from '../../ving/utils/miniHash.mjs';
import constants from '../lib/constants.mjs';

export function generatePrefix(stage) {
    return `${constants.shortName}-${stage}`;
}

export function generateSuffix(stage, devSuffixOverride) {
    if (devSuffixOverride !== undefined) {
        if (stage !== 'dev') {
            throw new Error('devSuffix can only be used with the dev stage.');
        }
        if (!/^[0-9a-f]{8}$/.test(devSuffixOverride)) {
            throw new Error('devSuffix must be exactly eight lowercase hexadecimal characters.');
        }
        return devSuffixOverride;
    }
    return stage == 'dev' ? miniHash(usernameSync()) : '';
}
