// required modules
const http = require('http');

// required scripts
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// port#
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/party.mp4':
      mediaHandler.getParty(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
