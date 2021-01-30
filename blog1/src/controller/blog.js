const { exec } = require("../db/mysql");

// 获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc`;
  return exec(sql);
};

// 获取博客详情
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => rows[0]);
};

// 新建博客
const newBlog = (blogData = {}) => {
  // blogData包含title,content等属性
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();

  let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createtime}' )`;

  return exec(sql).then((insertData) => {
    return {id: insertData.insertId};
  });
};

const updateBlog = (id, blogData = {}) => {
  return false;
};

const deleteBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
