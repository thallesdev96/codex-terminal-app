import {CodexService} from '../../src/services/CodexService.js';
import {ShellService} from '../../src/services/ShellService.js';
import {TerminalSession} from '../../src/core/TerminalSession.js';

// Start the terminal session via API route
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const codex = new CodexService(process.env.OPENAI_API_KEY);
    const shell = new ShellService();
    const session = new TerminalSession(codex, shell);

    await session.start();
    res.status(200).json({status: 'Codex terminal session completed.'});
}
