import OpenAI from "openai";

// Service responsible for generating commands using the OpenAI API
export class CodexService {
    constructor(apiKey) {
        this.openai = new OpenAI({apiKey});
    }

    // Generates a command based on the given prompt
    async generateCommand(prompt) {
        const res = await this.openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt,
            max_tokens: 100,
            temperature: 0.3
        });

        return res.choices[0].text.trim();
    }
}
