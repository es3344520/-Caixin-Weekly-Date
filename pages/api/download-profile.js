import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  // 确保路径正确指向你的 profile.json 文件位置
  const filePath = path.join(process.cwd(), 'profile.json');

  // 设置响应头以触发下载行为
  res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
  res.setHeader('Content-Type', 'application/json');

  // 读取文件并发送给客户端
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  // 处理可能的错误，例如文件未找到
  fileStream.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  });
}
