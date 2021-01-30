const mysql = require("mysql");

// 创建链接对象
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "myblog",
});

// 开始链接
con.connect((err) => {
  if (err) {
    console.log("数据库链接失败", err);
  } else {
    console.log("数据库链接成功");
  }
});

// 查询
const sql = `insert into blogs (title, content, createtime, author) values("标题C", "内容C", 1611977333833, "zhangsan" )`;
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(result);
  }
});

// 关闭链接
con.end();
