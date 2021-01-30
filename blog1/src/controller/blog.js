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
  return {
    id: 1,
    title: "标题一",
    content: "内容一",
    createTime: 1600233926431,
    author: "作者一",
  };
};

// 新建博客
const newBlog = (blogData = {}) => {
  // blogData包含title,content等属性
  return {
    id: 3,
  };
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
