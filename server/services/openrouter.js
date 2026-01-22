const axios = require('axios');

const analyzeSEO = async (content) => {
  try {
    const apiUrl = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    if (!content || content.trim().length === 0) {
      throw new Error('Content is empty');
    }

    const response = await axios.post(
      apiUrl,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert. Analyze content and provide SEO score (0-100), keyword suggestions, and optimization recommendations. Return ONLY valid JSON in this exact format: {"seoScore": number, "keywords": ["keyword1", "keyword2"], "recommendations": ["rec1", "rec2"]}'
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
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/Baibh22/SEO-Tool',
          'X-Title': 'AI Content Optimizer'
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    // Try to parse JSON, handle potential markdown code blocks
    let jsonStr = aiResponse.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```\n?/g, '');
    }
    
    const result = JSON.parse(jsonStr);
    
    // Validate response structure
    if (!result.seoScore || !result.keywords || !result.recommendations) {
      throw new Error('Invalid response format from AI');
    }
    
    return result;
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      throw new Error('Invalid OpenRouter API key');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later');
    } else if (error.message.includes('JSON')) {
      throw new Error('Failed to parse AI response');
    }
    
    throw new Error(error.message || 'Failed to analyze SEO');
  }
};

module.exports = { analyzeSEO };
