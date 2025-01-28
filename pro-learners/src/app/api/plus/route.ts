import { NextResponse } from 'next/server';
import {
	HarmBlockThreshold,
	HarmCategory,
	VertexAI,
} from '@google-cloud/vertexai';

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
	project: process.env.GOOGLE_CLOUD_PROJECT_ID,
	location: process.env.GOOGLE_CLOUD_LOCATION,
});
const model = 'gemini-1.5-flash-002';

// Instantiate the model
const generativeModel = vertex_ai.preview.getGenerativeModel({
	model: model,
	generationConfig: {
		maxOutputTokens: 8192,
		temperature: 1,
		topP: 0.95,
	},
	safetySettings: [
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
	],
});

export async function POST(request: Request) {
	try {
		const { query, interests, education, country, customMsg, skills } =
			await request.json();
		console.log(query);

		const prompt = {
			text: `You are a personalized roadmap generator. Your task is to create a JSON roadmap for users based on their goals and personal information. The roadmap should break down the user's goal into smaller, achievable milestones. Each milestone should include resources and expected outcomes.

The JSON output must be valid and follow this structure:

\`\`\`json
{
  "goal": "User's Goal",
  "milestones": [
    {
      "title": "Milestone Title",
      "outcome": "Achievable Outcome",
      "how_to": [
        {"type": "course/resource/activity", "description": "Description of the resource/activity"},
        ...
      ]
    },
    ...
  ]
}
\`\`\`

Follow these steps:

1. Analyze the user's goal, skills, interests, education, country, and custom message.
2. Break down the goal into smaller, achievable milestones.
3. For each milestone:
    * Create a descriptive title.
    * Define a clear, achievable outcome.
    * Provide a list of resources and activities under "how_to." Each item in "how_to" should have a "type" (course, resource, activity) and a "description." **Provide direct links to reputable websites and resources, instead of instructing the user to search for them.** 
4. Ensure the final JSON output is valid and adheres to the specified structure.

User Goal: ${query}
User Skills: None
User Interests: ${interests}
User Education: ${education}
User Country: ${country}
Custom Message: ${customMsg}`,
		};

		const req = {
			contents: [{ role: 'user', parts: [prompt] }],
		};

		const response = await generativeModel.generateContent(req);
		const result = await response.response;

		if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
			return NextResponse.json({}, { status: 400 });
		}
		//console.log(result.candidates[0].content);

		try {
			const rawText = result.candidates[0].content.parts[0].text;

			// Strip markdown formatting (e.g., ```json and ```)
			const cleanText = rawText.replace(/```json|```/g, '');

			// Parse the cleaned JSON string
			const roadmapData = JSON.parse(cleanText);
			console.log(roadmapData);
			return NextResponse.json(roadmapData);
		} catch (parseError) {
			console.error('Error parsing JSON response:', parseError);
			return NextResponse.json({}, { status: 400 });
		}
	} catch (error) {
		console.error('Error generating roadmap:', error);
		return NextResponse.json(
			{ error: 'Failed to generate roadmap' },
			{ status: 500 }
		);
	}
}
