const express = require('express');
const app = express();
const port = 3000;

const validKeys = ['YOUR_LICENSE_KEY_1', 'YOUR_LICENSE_KEY_2'];  // Add valid keys here

app.use(express.json());

app.post('/validate-license', (req, res) => {
  const { licenseKey } = req.body;

  if (validKeys.includes(licenseKey)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});