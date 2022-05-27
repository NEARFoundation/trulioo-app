import bodyParser from "express";

export const rawBody = bodyParser.json({
  verify: function(req, res, buf) {
    req.rawBody = buf.toString();
  }
});

export const loggingRequestAndResponse = (req, res, next) => {
  let resWrite = res.write;
  let resEnd = res.end;
  let chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    resWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    let body = chunks.join();

    console.log("Url: " + req.path);
    console.log("Request:");
    console.log(req.rawBody);
    console.log("Response:");
    console.log(body);

    resEnd.apply(res, arguments);
  };
  next();
}
