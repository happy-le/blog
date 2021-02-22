const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("请求开始...", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  req.cookie = {
    userId: "123123",
  };
  next();
});

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200,
    };
    next();
  }, 1000);
});

app.use("/api", (req, res, next) => {
  console.log("处理API理由");
  next();
});

app.get("/api", (req, res, next) => {
  console.log("get 处理API理由");
  next();
});

app.post("/api", (req, res, next) => {
  console.log("post 处理API理由");
  next();
});

function loginChekcout(req, res, next) {
  console.log("登陆失败！");
  setTimeout(() => {
    res.json({
      errno: 0,
      message: "登陆失败！"
    })
  });
}

app.get("/api/get-cookie", loginChekcout, (req, res, next) => {
  console.log("get /api/get-cookie");
  res.json({
    errno: 0,
    data: req.cookie,
  });
});

app.post("/api/get-post-data", (req, res, next) => {
  console.log("psot /api/get-post-data");
  res.json({
    errno: 0,
    data: req.body,
  });
});

app.use((req, res, next) => {
  console.log("处理404");
  res.json({
    errno: -1,
    message: "404 Not Found",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
