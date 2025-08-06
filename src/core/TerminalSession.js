import chalk from "chalk";

// Coordinates execution between Codex (OpenAI) and Shell
export class TerminalSession {
    constructor(codexService, shellService) {
        this.codex = codexService;
        this.shell = shellService;
    }

    async start() {
        this.shell.onOutput(() => {
        });

        const prompts = [
            "List files in the current directory",
            "Show current working directory",
            "Print date and time",
            "Exit terminal"
        ];

        for (const prompt of prompts) {
            // Log the full response to the file
            const fullPrompt = `${prompt}\nExplain the command and provide the raw terminal command inside quotes.`;
            const response = await this.codex.generateCommand(fullPrompt);
            const explanation = chalk.yellow(`\n🤖 Codex response to "${prompt}":\n${response}\n`);
            process.stdout.write(explanation);
            this.shell.logFile.write(`\n🤖 Codex response to "${prompt}":\n${response}\n`);
            let command = null;
            const match = response.match(/["'`](.*?)["'`]/);
            if (match) {
                command = match[1].trim();
            } else {
                const lines = response.split('\n');
                command = lines.find(line => /^[a-zA-Z0-9_-]+/.test(line))?.trim() || "echo ERROR";
            }
            const prettyCmd = chalk.blueBright(`\n> ${command}\n`);
            process.stdout.write(prettyCmd);
            this.shell.logFile.write(`\n> ${command}\n`);
            this.shell.sendCommand(command);
            await new Promise((r) => setTimeout(r, 1500));
        }

        this.shell.close();
    }
}
