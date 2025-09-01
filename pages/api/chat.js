import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { messages } = req.body;
    if (!messages) return res.status(400).json({ error: 'No messages' });
    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 800,
    });
    const assistant = response.data.choices[0].message;
    return res.status(200).json({ assistant });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
