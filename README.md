# codex-terminal-app

This repository contains a **Next.js** application demonstrating the integration of **OpenAI Codex** with a terminal process that executes commands, streams output to both console and log files.

PS: needs to place a valid OPEN_API_KEY on the .env file:
OPENAI_API_KEY=sk##################

## Project Structure

- `pages/api/start-terminal.js`: Starts the Codex + shell session.
- `src/services/`: Contains Codex and shell handling services.
- `src/core/TerminalSession.js`: Orchestrates everything.

## Getting Started

```bash

cp .env.example .env
npm install
npm run dev
