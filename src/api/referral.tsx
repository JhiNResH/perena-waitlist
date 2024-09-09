const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 模擬數據庫
const referralCodes = new Map();

app.post('/api/generate-referral', (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  // 生成一個簡短的唯一代碼
  const referralCode = crypto.createHash('sha256').update(address).digest('hex').slice(0, 8);

  // 存儲關聯
  referralCodes.set(referralCode, address);

  res.json({ referralCode });
});

app.get('/api/validate-referral', (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Referral code is required' });
  }

  const address = referralCodes.get(code);

  if (address) {
    res.json({ valid: true, address });
  } else {
    res.json({ valid: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));