// required modules
const fs = require('fs');

// load homepage
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// respond to requests with the homepage
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// exporting function
module.exports.getIndex = getIndex;
