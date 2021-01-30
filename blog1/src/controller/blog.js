const { exec } = require("../db/mysql");

// 列表
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

// 详情
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => rows[0]);
};

// 新建
const newBlog = (blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();

  let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createtime}' )`;
  return exec(sql).then((insertData) => {
    return { id: insertData.insertId };
  });
};

// 更新
const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  let sql = `update blogs set title='${title}', content='${content}' where id=${id} `;
  return exec(sql).then((updateDate) => {
    if (updateDate.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

// 删除
const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id=${id} and author='${author}'`;
  return  exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
