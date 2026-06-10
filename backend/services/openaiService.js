const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResumeWithAI = async (resumeText) => {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API Key is missing. Returning null for AI feedback.');
    return null;
  }

  try {
    const prompt = `
      You are an expert technical recruiter and ATS software simulator.
      Please analyze the following resume text and provide comprehensive feedback.
      
      Respond STRICTLY with a JSON object following this exact schema:
      {
        "summary": "A brief summary of the candidate's professional profile",
        "atsFeedback": "Overall feedback on ATS compatibility and formatting",
        "missingSections": ["Array of standard resume sections that are missing"],
        "improvementSuggestions": ["Array of specific, actionable suggestions to improve the resume"],
        "skillRecommendations": ["Array of skills the candidate should consider adding based on their experience"]
      }

      Resume Text:
      ${resumeText}
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that analyzes resumes and outputs only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    });

    const aiFeedbackString = completion.choices[0].message.content;
    const aiFeedback = JSON.parse(aiFeedbackString);

    return aiFeedback;
  } catch (error) {
    console.error('Error in OpenAI resume analysis:', error);
    return null;
  }
};

module.exports = {
  analyzeResumeWithAI,
};
