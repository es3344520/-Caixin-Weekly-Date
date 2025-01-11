// pages/api/download-profile.js
import path from 'path';
import fs from 'fs/promises'; // 使用异步文件系统方法
import { createReadStream } from 'fs';

export default async function handler(req, res) {
  try {
    // 构建文件路径
    const filePath = path.join(process.cwd(), 'profile.json');

    // 检查文件是否存在
    await fs.access(filePath);

    // 设置响应头以触发下载
    res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
    res.setHeader('Content-Type', 'application/json');

    // 创建读取流并将内容发送给客户端
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);

  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).json({ message: 'File not found' });
    }
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

// 确保函数不会被缓存
export const config = {
  api: {
    responseLimit: false, // 允许大文件传输
  },
};
