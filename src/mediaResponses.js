// required modules
const fs = require('fs');
const path = require('path');

// respond to requests with the homepage
const getParty = (request, response) => {
  const partyFile = path.resolve(__dirname, '../client/party.mp4');

  fs.stat(partyFile, (err, stats) => {
    if (err) {
      if (err === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end();
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = end - start + 1;

    response.writeHead(206, {
      'Content-Type': 'video/mp4',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
    });

    const stream = fs.createReadStream(partyFile, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

// exporting function
module.exports = {
  getParty,
};
