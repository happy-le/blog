const mysql = require("mysql");

const { MYSQL_CONF } = require("../conf/db");

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始链接
con.connect((err) => {
  if (err) {
    console.log("数据库链接失败", err);
  } else {
    console.log("数据库链接成功");
  }
});

function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape
};

