const querystring = require("querystring");
const { access } = require("./src/utils/log");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 配置跨域设置
  res.setHeader("Access-Control-Allow-Origin", "*"); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
  // res.setHeader("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
  // res.setHeader("Access-control-max-age", 1000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
  res.setHeader("Content-type", "application/json"); // 设置返回格式JSON

  // 放行options请求
  if (req.method === "OPTIONS") {
    return res.end();
  }

  // 记录access Log
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()}`
  );

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((element) => {
    if (!element) {
      return;
    }
    const arr = element.split("=");
    key = arr[0].trim();
    value = arr[1].trim();
    req.cookie[key] = value;
  });

  // 处理postData
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userdata) => {
        res.end(JSON.stringify(userdata));
      });
      return;
    }

    // 404
    res.writeHead(404, { "Content-typ": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
