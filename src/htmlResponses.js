// required modules
const fs = require('fs');

// load pages
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

// respond to requests with the homepage
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// respond to requests with the homepage
const getPage2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page2);
  response.end();
};

// respond to requests with the homepage
const getPage3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page3);
  response.end();
};

// exporting function
module.exports = {
  getIndex,
  getPage2,
  getPage3,
};
