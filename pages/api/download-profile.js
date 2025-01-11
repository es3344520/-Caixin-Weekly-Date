import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  // 确保路径正确指向你的 JSON 文件
  const filePath = path.join(process.cwd(), 'profile.json');

  res.setHeader('Content-disposition', 'attachment; filename=profile.json');
  res.setHeader('Content-Type', 'application/json');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}