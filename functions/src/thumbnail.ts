import * as functions from 'firebase-functions';
const path = require('path');
const {storage} = require('./admin');
const spawn = require('child-process-promise').spawn;
const os = require('os');
const fs = require('fs');

module.exports = functions.storage.object().onFinalize((object) => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType;

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

    // Get the file name.
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = fileName.split('.')[0];
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
        console.log('Already a Thumbnail.');
        return null;
    }

    if (fileName.startsWith('overall') ||
        fileName.startsWith('itemlabel') ||
        fileName.startsWith('seal') ||
        fileName.startsWith('stitching') ||
        fileName.startsWith('insole') ||
        fileName.startsWith('boxlabel') ||
        fileName.startsWith('additional')
    ) {
        const bucket = storage.bucket(fileBucket);
        const tempFilePathPrev = path.join(os.tmpdir(), fileName);
        const tempFilePath = path.join(os.tmpdir(), fileNameWithoutExt + '.jpg');
        const metadata = {
            contentType: contentType,
        };

        return bucket.file(filePath).download({
            destination: tempFilePathPrev,
        }).then(() => {
            console.log('Image downloaded locally to', tempFilePathPrev);
            // Generate a thumbnail using ImageMagick.
            return spawn('convert', [tempFilePathPrev, '-thumbnail', '200x200>', '-gravity', 'center',
                 '-background', '#ecedec', '-extent', '200x200', tempFilePath]);
        }).then(() => {
            console.log('Thumbnail created at', tempFilePath);
            // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
            const thumbFileName = `thumb_${fileNameWithoutExt}`;
            const thumbFilePath = path.join(path.dirname(filePath), thumbFileName + '.jpg');
            // Uploading the thumbnail.
            return bucket.upload(tempFilePath, {
                destination: thumbFilePath,
                metadata: metadata,
            });
            // Once the thumbnail has been uploaded delete the local file to free up disk space.
        }).then(() => fs.unlinkSync(tempFilePath));

    }
});
