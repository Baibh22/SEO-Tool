const axios = require('axios');

const analyzeSEO = async (content) => {
  try {
    const response = await axios.post(
      process.env.OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert. Analyze content and provide SEO score (0-100), keyword suggestions, and optimization recommendations. Return JSON format: {"seoScore": number, "keywords": [strings], "recommendations": [strings]}'
          },
          {
            role: 'user',
            content: `Analyze this content for SEO:\n\n${content}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    return JSON.parse(aiResponse);
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw new Error('Failed to analyze SEO');
  }
};

module.exports = { analyzeSEO };
