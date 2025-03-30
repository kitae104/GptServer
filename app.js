import express from 'express';
import { makeChatRequest, makeImageRequest } from './gptUtils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // JSON 파서

app.post('/chat', async (req, res) => {
  const {messages, chatOptions} = req.body;  
  
  if (!messages || !Array.isArray(messages || messages.length === 0)) {
    return res.status(400).send("'messages' 필드가 없거나 배열이 아니거나 비어있는 경우 입니다.");
  }

  try {
    const response = await makeChatRequest(messages, chatOptions); // messages와 chatOptions를 전달합니다.
    return res.json({response});
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('서버 오류가 발생했습니다.');    
  }  
});

app.post('/image', async (req, res) => {
  const {prompt} = req.body;  
  
  if (!prompt) {
    return res.status(400).send("'prompt' 필드가 필요합니다.");
  } 

  try {
    const response = await makeImageRequest(prompt); // prompt를 전달합니다.
    return res.json({response});
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('서버 오류가 발생했습니다.');    
  }  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});