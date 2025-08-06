import {spawn} from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";

// Service that controls the terminal session and records logs
export class ShellService {
    constructor() {
        this.shell = spawn("bash", [], {stdio: "pipe"});
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const logPath = path.join("logs", `session-${timestamp}.log`);
        this.logFile = fs.createWriteStream(logPath);
    }

    // Handle terminal output and log it to the terminal
    onOutput(callback) {
        const log = (type, data) => {
            const text = data.toString();
            const formattedForLog = type === "stderr" ? `[stderr] ${text}` : text;
            const formattedForTerminal =
                type === "stderr"
                    ? chalk.red(formattedForLog)
                    : chalk.green(formattedForLog);

            process.stdout.write(formattedForTerminal);
            this.logFile.write(formattedForLog);
            callback(formattedForLog);
        };
        this.shell.stdout.on("data", (data) => log("stdout", data));
        this.shell.stderr.on("data", (data) => log("stderr", data));
    }

    // Send a command to the terminal
    sendCommand(cmd) {
        const prettyCmd = chalk.blueBright(`\n> ${cmd}\n`);
        process.stdout.write(prettyCmd);
        this.logFile.write(`\n> ${cmd}\n`);
        this.shell.stdin.write(cmd + "\n");
    }

    // Ends the session and log
    close() {
        this.shell.stdin.end();
        this.logFile.end();
    }
}
