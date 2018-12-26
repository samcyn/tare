/**
 * created by Samson Iyanda on 28/11/18
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

const { createWriteStream } = require('fs');
const shortid = require('shortid');


const storeUpload = async ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;

  return new Promise(
    (resolve, reject) => stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  );
};


const processUpload = async (upload) => {
  const {
    stream,
    filename,
    mimetype,
    encoding,
  } = await upload;
  const { id, path } = await storeUpload({ stream, filename });
  return {
    id,
    path,
    filename,
    mimetype,
    encoding,
  };
};


module.export = {
  processUpload,
};
