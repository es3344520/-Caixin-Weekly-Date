import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'profile.json');

  // 设置正确的响应头来触发下载
  res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
  res.setHeader('Content-Type', 'application/json');

  // 确保文件存在并发送文件流
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ message: 'File not found' });
      }
      return res.status(500).json({ message: 'Server error' });
    }

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('open', () => {
      fileStream.pipe(res);
    });
    fileStream.on('error', () => {
      res.end();
    });
  });
}
