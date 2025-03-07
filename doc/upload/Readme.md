# 把windows 本地目录搭建成图片上传目录
要在 Windows 上搭建一个本地目录以便进行图片上传，你可以使用简单的 Node.js 服务器配合一些静态文件处理库。以下是一步一步的教程：
## 前置条件
1. 安装 `Node.js`：
如果还没有安装，可以从 `Node.js` 官方网站 下载并安装。

2. 目录结构：
创建一个新文件夹来存放你的项目，例如 image-upload-server。

**步骤 1: 创建项目**
a. 打开命令行，导航到你的项目文件夹：

```bash
cd path\to\your\image-upload-server
```
b. 初始化一个新的 Node.js 项目：

```bash
npm init -y
```
c. 安装必要的库，主要是 `express`, `cors` 和 `multer`：

```bash
npm install express multer cors
```
**步骤 2: 创建服务器代码**
在你的项目根目录中创建一个新的 JavaScript 文件，比如 server.js，并写入以下内容：
```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 使用 CORS 中间件
app.use(cors());

// 设置 multer 存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 添加时间戳以避免文件名冲突
    }
});

const upload = multer({ storage });

// 路由处理上传
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // 构建文件的可访问 URL
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.send({ url: fileUrl }); // 返回包含 URL 的 JSON 对象
});

// 静态文件服务
app.use('/uploads', express.static(uploadDir));

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
```
**步骤 3: 运行服务器**
在项目根目录下运行以下命令启动服务器：

```bash
node server.js
```
**步骤 4: 测试上传功能**
在`MD`项目`上传图片`功能里选择`自定义代码`，粘贴下面内容
```javascript
const {file, util, okCb, errCb} = CUSTOM_ARG
const param = new FormData()
param.append('file', file)
util.axios.post('http://localhost:3000/upload', param, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then(res => {
  okCb(res.url)
  console.log(res.url)
}).catch(err => {
  errCb(err)
  console.log(err)
})
```
## 测试图片

![测试文件](http://localhost:3000/uploads/1739171742307.png "test")
