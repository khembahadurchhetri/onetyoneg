import { stdin, stdout, exit } from "node:process";
import { randomBytes, scryptSync } from "node:crypto";

if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
  console.error("Run this script in an interactive terminal.");
  exit(1);
}

stdout.write("Enter the initial admin password (input hidden): ");
stdin.setRawMode(true);
stdin.setEncoding("utf8");
stdin.resume();

let password = "";
stdin.on("data", (key) => {
  if (key === "\u0003") {
    stdout.write("\nCancelled.\n");
    stdin.setRawMode(false);
    exit(1);
  }
  if (key === "\r" || key === "\n") {
    stdin.setRawMode(false);
    stdin.pause();
    stdout.write("\n");
    if (password.length < 12) {
      console.error("Use an admin password with at least 12 characters.");
      exit(1);
    }
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64).toString("hex");
    password = "";
    console.log(`scrypt$${salt}$${hash}`);
    return;
  }
  if (key === "\u007f" || key === "\b") {
    password = password.slice(0, -1);
    return;
  }
  if (key.length === 1 && key >= " ") password += key;
});
