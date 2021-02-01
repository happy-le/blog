const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");

// 读
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data.toString());
// });

// 写
// const content = "内容111内容111内容111内容111\n";
// const opt = {
//   flag: "a",
// };

// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// 判断文件是否存在
var exist = fs.existsSync(fileName);
console.log("exist is: ", exist);
