const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题一",
      content: "内容一",
      createTime: 1600233926431,
      author: "作者一"
    },
    {
      id: 2,
      title: "标题二",
      content: "内容二",
      createTime: 1600233962073,
      author: "作者二"
    },
    {
      id: 2,
      title: "标题三",
      content: "内容三",
      createTime: 1600233963073,
      author: "作者三"
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: "标题一",
    content: "内容一",
    createTime: 1600233926431,
    author: "作者一"
  };
}

const newBlog = (blogData = {}) => {
  console.log("new blogData blogData:", blogData)
  // blogData包含title,content等属性
  return {
    id: 3,
  }
}

module.exports = {
  getList,
  getDetail,
  newBlog
}