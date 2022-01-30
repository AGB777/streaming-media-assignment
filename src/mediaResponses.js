// required modules
const fs = require('fs');
const path = require('path');

// calculates data about the data and records it in the response header
// returns the start and end values to be passed to the streamSetup function
const recordStats = (stats, request, response) => {
  // check the total file size
  const total = stats.size;

  // check the byte range
  let { range } = request.headers;

  if (!range) {
    range = 'bytes=0-';
  }

  // parse byte range into start and end ints
  const positions = range.replace(/bytes=/, '').split('-');

  let start = parseInt(positions[0], 10);
  const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

  if (start > end) {
    start = end - 1;
  }

  const chunkSize = end - start + 1;

  // write response header
  response.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${total}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
  });

  return { start, end };
};

// set up the ReadableStream to read data from the file into the response
const streamSetup = (response, mediaFile, byteBounds) => {
  const stream = fs.createReadStream(mediaFile, byteBounds);

  stream.on('open', () => {
    stream.pipe(response);
  });

  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });

  return stream;
};

const mediaResponse = (err, stats, request, response, mediaFile) => {
  // check for an error
  if (err) {
    if (err === 'ENOENT') {
      response.writeHead(404);
    }
    return response.end();
  }
  const byteBounds = recordStats(stats, request, response);

  // setup the stream
  return streamSetup(response, mediaFile, byteBounds);
};

// public function to get party vid
// gets the correct file and passes it to the media response function
const getParty = (request, response) => {
  const mediaFile = path.resolve(__dirname, '../client/party.mp4');
  response.setHeader('Content-Type', 'video/mp4');

  fs.stat(mediaFile, (err, stats) => {
    mediaResponse(err, stats, request, response, mediaFile);
  });
};

// public function to get bird vid
const getBird = (request, response) => {
  const mediaFile = path.resolve(__dirname, '../client/bird.mp4');
  response.setHeader('Content-Type', 'video/mp4');

  fs.stat(mediaFile, (err, stats) => {
    mediaResponse(err, stats, request, response, mediaFile);
  });
};

// public function to get bling audio
const getBling = (request, response) => {
  const mediaFile = path.resolve(__dirname, '../client/bling.mp3');
  response.setHeader('Content-Type', 'audio/mp3');

  fs.stat(mediaFile, (err, stats) => {
    mediaResponse(err, stats, request, response, mediaFile);
  });
};

// exporting function
module.exports = {
  getParty,
  getBird,
  getBling,
};
