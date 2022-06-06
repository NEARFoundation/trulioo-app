import bodyParser from "express";

export const rawBody = bodyParser.json({
  verify: function(req, res, buf) {
    req.rawBody = buf.toString();
  }
});

export const loggingRequestAndResponse = (req, res, next) => {
  if (req.url.match(/\/\w+\/trulioo-api\/\w+/) || req.url.match(/\/\w+\/api\/\w+/)) {
    const resSend = res.send;

    res.send = function (chunk, ...args) {
      if (typeof chunk === 'string') {
        console.log(`${(new Date()).toISOString()} Url: ${req.path}`);
        console.log(`Request: ${req.rawBody}`);
        console.log(`Response: ${chunk}`);
      }
      resSend.apply(res, [chunk, ...args]);
    }
  }
  next();
}
