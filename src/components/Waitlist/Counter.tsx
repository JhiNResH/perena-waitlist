import React, { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
// 使用環境變量存儲敏感信息
const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const WaitlistCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
        console.error('Missing environment variables');
        return;
      }

      try {
        const jwt = new JWT({
          email: CLIENT_EMAIL,
          key: PRIVATE_KEY,
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // 假設數據在第一個工作表
        await sheet.loadHeaderRow(); // 加載標題行

        const rows = await sheet.getRows(); // 獲取所有行
        setCount(rows.length); // 設置計數為行數
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchWaitlistCount();
  }, []);

  if (count === null) {
    return null; // 或者顯示一個加載指示器
  }

  return (
    <div className="text-xl text-brand-purple text-center">
      Join <span className="font-bold">{count}</span> others on our waitlist!
    </div>
  );
};

export default WaitlistCounter;