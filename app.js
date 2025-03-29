import express from 'express';
import { makeChatRequest } from './gptUtils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/chat', async (req, res) => {
  const response = await makeChatRequest([{
    role: "user",
    content: "안녕, 너는 누구니? " 
  }]);
  res.send(response);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});