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
