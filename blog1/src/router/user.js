const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 69 * 1000); // 24小时
  console.log("d.toGMTString() is:", d.toGMTString());
  return d.toGMTString();
};

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录接口
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then((data) => {
      if (data.username) {
        // 操作cookie
        res.setHeader(
          "Set-Cookie",
          `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`
        );

        return new SuccessModel();
      } else {
        return new ErrorModel("登陆失败！");
      }
    });
  }

  // 登陆验证
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({ "username:": req.cookie.username })
      );
    } else {
      return Promise.resolve(new ErrorModel("尚未登陆"));
    }
  }
};

module.exports = handleUserRouter;
