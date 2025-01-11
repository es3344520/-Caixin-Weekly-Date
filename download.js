// download.js 使用 CommonJS 语法
const path = require('path');
const { readFile } = require('fs').promises;

module.exports = async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'profile.json'); // 直接指向根目录
    
    // 设置响应头以提示浏览器下载文件而不是显示它
    res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
    res.setHeader('Content-Type', 'application/json');

    // 读取文件内容并发送给客户端
    const fileData = await readFile(filePath);
    res.end(fileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while downloading the file.' });
  }
}
