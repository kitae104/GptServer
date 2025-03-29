import dotenv from 'dotenv';
import OpenAI from "openai";

// 환경변수 로드
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const makeChatRequest = async (messages, chatOptions) => {  
  const response = await openai.chat.completions.create({
    ...chatOptions,
    model: "gpt-3.5-turbo",
    messages,  // 대화 내용을 가져옴    
  });
  
  if(response.choices){
    let responseText = response.choices[0].message.content;
    // 모든 줄바꿈 문자(개행 문자)를 찾아서 빈 문자열("")로 바꾸는 작업
    return responseText.replace(/(\r\n|\n|\r)/gm, ""); 
  }
  throw new Error("응답이 지원되지 않는 형식입니다.");
}