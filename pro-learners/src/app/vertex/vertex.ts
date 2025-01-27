import {
	HarmBlockThreshold,
	HarmCategory,
	VertexAI,
} from '@google-cloud/vertexai';

const project = 'your-cloud-project';
const location = 'us-central1';
const textModel = 'gemini-1.0-pro';
const visionModel = 'gemini-1.0-pro-vision';

const vertexAI = new VertexAI({ project: project, location: location });

// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
	model: textModel,
	safetySettings: [
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	],
	generationConfig: { maxOutputTokens: 256 },
	systemInstruction: {
		role: 'system',
		parts: [
			{
				text: `you are a mentor which will help in forming roadmap for the user to acheive their goal.`,
			},
		],
	},
});

const generativeVisionModel = vertexAI.getGenerativeModel({
	model: visionModel,
});

export { generativeModel, generativeVisionModel };

