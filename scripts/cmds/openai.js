require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	config: {
		name: "chatgpt",
		aliases: ["gpt", "assistant", "openai"],
		version: "1.0",
		author: "ChatGPT 👾😉",
		countDown: 5,
		role: 0,
		shortDescription: "A full ChatGPT-powered assistant",
		longDescription: "Interact with ChatGPT for dynamic and intelligent responses.",
		category: "fun",
		guide: "{pn} [your message]"
	},

	onStart: async function ({ message, args }) {
		// Check if user provided input
		const userInput = args.join(" ");
		if (!userInput) {
			return message.send({
				body: "Please provide a message to interact with ChatGPT! 😊"
			});
		}

		// Call OpenAI API
		try {
			const response = await openai.createChatCompletion({
				model: "gpt-3.5-turbo", // Use "gpt-4" if available
				messages: [{ role: "user", content: userInput }],
				max_tokens: 100, // Limit tokens for shorter responses
				temperature: 0.7 // Adjust creativity
			});

			// Extract and send ChatGPT's response
			const gptResponse = response.data.choices[0].message.content.trim();
			message.send({
				body: gptResponse
			});
		} catch (error) {
			console.error("Error with OpenAI API:", error);
			message.send({
				body: "Oops! Something went wrong while connecting to ChatGPT. Please try again later. 🤖"
			});
		}
	}
};
