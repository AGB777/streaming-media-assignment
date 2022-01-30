// required modules
const http = require('http');
const url = require('url');
// const query = require('querystring');

// required scripts
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// port#
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// struct for recognized urls
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/page2': htmlHandler.getPage2,
  '/page3': htmlHandler.getPage3,
  '/party.mp4': mediaHandler.getParty,
  '/bird.mp4': mediaHandler.getBird,
  '/bling.mp3': mediaHandler.getBling,
};

const onRequest = (request, response) => {
  /*

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
  */

  const theurl = url.parse(request.url);

  console.log(theurl.pathname);

  // not using this yet
  // const params = query.parse(theurl.query);

  // check if the url's path is a key in urlStruct
  if (urlStruct[theurl.pathname]) {
    // if it is, call the associated function
    urlStruct[theurl.pathname](request, response);
  } else {
    // dont recognize this path, 404
    response.writeHead(404);
    response.end();
  }
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
