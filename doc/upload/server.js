const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 创建上传基础目录
const uploadBaseDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadBaseDir)) {
    fs.mkdirSync(uploadBaseDir);
}

// 使用 CORS 中间件
app.use(cors());

// 设置 multer 存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 获取请求的 host，并去掉端口号
        const host = req.headers.host.split(':')[0]; // 只取主机部分
        const uploadDir = path.join(uploadBaseDir, host);

        // 检查主机目录是否存在，如果不存在，创建它
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // 添加 { recursive: true } 以确保创建多级目录
        }

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
    // 动态获取协议和 host
    const protocol = req.protocol; // 获取请求的协议
    const host = req.headers.host.split(':')[0]; // 只取主机部分
    const fileUrl = `${protocol}://${req.headers.host}/uploads/${host}/${req.file.filename}`; // 构建完整的文件 URL
    res.send({ url: fileUrl }); // 返回包含 URL 的 JSON 对象
});

// 静态文件服务
app.use('/uploads', express.static(uploadBaseDir));

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
