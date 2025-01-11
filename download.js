// download.js
import path from 'path';
import { readFile } from 'fs/promises';

export default async function handler(req, res) {
  try {
    // 获取当前工作目录路径，并指定profile.json的位置
    const filePath = path.join(process.cwd(), 'profile.json');
    
    // 设置响应头以提示浏览器下载文件而不是显示它
    res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
    res.setHeader('Content-Type', 'application/json');

    // 同步读取文件并发送给客户端
    const fileData = await readFile(filePath);
    res.end(fileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while downloading the file.' });
  }
}
