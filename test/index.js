const http = require("http");
const querystring = require("querystring")

var server  = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = querystring.parse(url.split("?")[1])

  // 设置返回数据格式
  res.setHeader("Content-type", "application/json")

  // 返回数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if(method === "GET") {
    res.end(JSON.stringify(resData))
  }
  if( method === "POST") {
    let postData = ""
    req.on("data", chunk => {
      postData += chunk.toString()
    })
    req.on("end", () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
});

server.listen(8000);
console.log("OK")

