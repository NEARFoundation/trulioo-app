import bodyParser from "express";

export const rawBody = bodyParser.json({
  verify(request, res, buf) {
    request.rawBody = buf.toString();
  }
});

export const loggingRequestAndResponse = (request, res, next) => {
  if (/\/\w+\/trulioo-api\/\w+/.test(request.url) || /\/\w+\/api\/\w+/.test(request.url)) {
    const resSend = res.send;

    res.send = function (chunk, ...args) {
      if (typeof chunk === 'string') {
        console.log(`${(new Date()).toISOString()} Url: ${request.path}`);
        console.log(`Request: ${request.rawBody}`);
        console.log(`Response: ${chunk}`);
      }

      resSend.apply(res, [chunk, ...args]);
    }
  }

  next();
}
