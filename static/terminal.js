const terminal = document.getElementById("terminal");
const terminalWindow = document.getElementById("terminal-window");

function activateTerminal() {
    terminalWindow.classList.remove("disabled-button");
    terminal.textContent = "Waiting to start...";
}

function deactivateTerminal() {
    terminalWindow.classList.add("disabled-button");
    terminal.textContent = "Upload an APK file first.";
}

//  export these functions
export { activateTerminal, deactivateTerminal };