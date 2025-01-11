const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, 'profile.json');
  
  // 设置响应头，使文件被当作附件下载
  res.setHeader('Content-Disposition', 'attachment; filename=profile.json');
  res.setHeader('Content-Type', 'application/json');

  // 发送文件内容给客户端
  fs.createReadStream(filePath).pipe(res);
};
