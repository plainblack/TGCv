export default {
    shortName: 'tgcv',
    uploadsBucketName: 'uploads',
    thumbnailsBucketName: 'thumbnails',
    stages: {
        dev: {
            region: 'us-east-1',
            account: '041977924901',
            uploadsLambdaSettings: {
                memorySize: 1024, // megabytes
                timeout: 60, // seconds
            },
        },
        prod: {
            region: 'us-east-1',
            account: '041977924901',
            uploadsLambdaSettings: {
                memorySize: 1024, // megabytes
                timeout: 60, // seconds
            },
            auroraSettings: {
                adminUser: 'root',
                minCapacity: 0.5,
                maxCapacity: 2,
                backupRetention: 7, // days
            },
            uploadsBucketNameOverride: 'tgcv-uploads.thegamecrafter.com',
            thumbnailsBucketNameOverride: 'tgcv-thumbnails.thegamecrafter.com',
        },
    }
};
