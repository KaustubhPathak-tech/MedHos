import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.HARPERDB_URL);
export default async function harperSaveMessage(message, Email, Room,__createdtime__) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  const data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        Email,
        Room,
        __createdtime__,
      },
    ],
  });

  const config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return JSON.stringify(response.data);
  } catch (error) {
    throw error;
  }
}
