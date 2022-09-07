import bodyParser from 'express';

export const rawBody = bodyParser.json({
  verify(request, response, buf) {
    request.rawBody = buf.toString();
  },
});

export const loggingRequestAndResponse = (request, response, next) => {
  if (/\/\w+\/trulioo-api\/\w+/u.test(request.url) || /\/\w+\/api\/\w+/u.test(request.url)) {
    const responseSend = response.send;

    response.send = function (chunk, ...args) {
      if (typeof chunk === 'string') {
        console.log(`${new Date().toISOString()}`);
        console.log(request.path);
        console.log(`Request: ${request.rawBody}`);
        console.log(`Response: ${chunk}`);
        console.log(`__________________`);
      }

      responseSend.apply(response, [chunk, ...args]);
    };
  }

  next();
};
