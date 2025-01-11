const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'profile.json');
  res.download(file, 'profile.json', (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
