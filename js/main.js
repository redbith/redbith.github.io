const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');
const inputLine = document.querySelector('.input-line');

// Tek renk saf kırmızı açılış logosu
const welcomeBanner = `
<span style="color: #ff2a2a;">██████╗ ███████╗██████╗ ██████╗ ██╗████████╗██╗  ██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██║  ██║
██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║   ███████║
██╔══██╗██╔══╝  ██║  ██║██╔══██╗██║   ██║   ██╔══██║
██║  ██║███████╗██████╔╝██████╔╝██║   ██║   ██║  ██║
╚═╝  ╚═╝╚══════╝╚═════╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝</span>

Welcome back. Connection established successfully.
Type '<span style="color: #50fa7b;">help</span>' to view the list of available commands.
--------------------------------------------------`;

const repoLogo = `⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣶⣴⣶⣤⣄⢀⠀⠀⠀⣀⣤⠀⠀⠀⠀⢀⣠⣴⣶⣷⣄⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣠⣾⡿⠃⠀⣀⣤⣾⣿⣿⣿⣿⣿⣿⣿⡕⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡿⠛⠛⡿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣴⣾⠿⠛⠛⠛⠿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⢸⡟⠁⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⡟⠋⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠰⢻⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⢁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣀⣀⣀⣤⣴⣾⡿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡿⠋⠙⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠋⠀⠀⠀⠀⢀⢿⣿⣿⣿⣿⣿⡇⠀⠈⠙⢻⣿⣿⣿⣿⣷⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣇⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣤⣠⣤⡶⠀⢿⣿⣿⣿⣿⣿⣦⣄⣠⣴⠆⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡿⠟⠛⠉⠀⠀⠁⠁⠉⠛⠿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⡛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

const bootLogs = [
    { text: ":: initiating initramfs v0.7-3...", type: "info" },
    { text: "Starting Journal Service...", type: "service" },
    { text: "Starting Load Kernel Modules...", type: "service" },
    { text: "Mounted /sys/kernel/config...", type: "info" },
    { text: "Starting Remount Root and Kernel File Systems...", type: "service" },
    { text: "Starting Coldplug All Udev Devices...", type: "service" },
    { text: "Starting Create Static Device Nodes in /dev...", type: "service" },
    { text: "Starting Accounts Service...", type: "service" },
    { text: "Starting Local Network Name Resolution...", type: "service" },
    { text: "Starting Network Time Synchronization...", type: "service" },
    { text: "Reached target System Initialization.", type: "target" },
    { text: "Starting Network Manager...", type: "service" },
    { text: "Starting Sound Service (PipeWire Daemon)...", type: "service" },
    { text: "Starting OpenSSH Daemon...", type: "service" },
    { text: "Starting Permit User Sessions...", type: "service" },
    { text: "Starting rpc-htop background helper...", type: "service" },
    { text: "Starting Custom KVM/Virt-Manager Hypervisor Hook...", type: "service" },
    { text: "Starting Simple Desktop Display Manager (SDDM)...", type: "service" },
    { text: "Loading KWin Wayland Compositor...", type: "info" },
    { text: "Reached target Multi-User System.", type: "target" },
    { text: "Reached target Graphical Interface.", type: "target" }
];

let commandHistory = [];
let historyIndex = -1;
let cachedRepos = [];

const commands = {
    'help': () => `
    Available Commands:
    <span style="color: #50fa7b;">help</span>            - Display available commands.
    <span style="color: #50fa7b;">whois</span>           - Learn more about redbithroot.
    <span style="color: #50fa7b;">ls</span>              - Fetch list of current public repositories from GitHub.
    <span style="color: #50fa7b;">cat [project]</span>   - View basic metadata about a project.
    <span style="color: #50fa7b;">whoami</span>          - Print current session user identity.
    <span style="color: #50fa7b;">redfetch</span>        - Clear terminal and display custom system statistics.
    <span style="color: #50fa7b;">reboot</span>          - Reload the terminal interface.
    <span style="color: #50fa7b;">clear</span>           - Clear display logs.
    <span style="color: #50fa7b;">social</span>          - Display social network accounts and contact data.`,

    'whois': () => `
    <b>redbithroot</b>: A cybersecurity and systems enthusiast from Azerbaijan.
    He has already achieved multiple personal milestones under his own scope, 
    yet everything done so far remains non-substantial to him as his vision is locked firmly on the absolute peak.
    Operating under the weight of imposter syndrome, he converts inadequacy into pure, 
    aggressive fuel to drive his technical evolution forward.
    <i>"Complacency is a slow death; dissatisfaction is the only catalyst for absolute perfection."</i>`,

    'whoami': () => `You are the root.`,

    'reboot': () => {
        printOutput("System rebooting...");
        setTimeout(() => { document.location.reload(true); }, 500);
        return null;
    },

    'clear': () => {
        terminalHistory.innerHTML = '';
        return null;
    },

    'social': () => `
    Instagram : <a href="https://instagram.com/redbithroot" target="_blank">@redbithroot</a>
    Gmail     : <a href="mailto:scriptpy777@gmail.com">scriptpy777@gmail.com</a>`,

    'ls': async () => {
        printOutput("<span style='color: #8be9fd;'>Fetching repository layout from GitHub API...</span>");
        try {
            const response = await fetch('https://api.github.com/users/redbith/repos');
            if (!response.ok) throw new Error();
            cachedRepos = await response.json();
            
            if (cachedRepos.length === 0) return "No public repositories found.";

            let output = "<br><span style='color: #ff2a2a; font-weight: bold;'>[ Public Repositories ]</span><br>";
            cachedRepos.forEach(repo => {
                const desc = repo.description ? repo.description : "No description provided.";
                output += `📁 <a href="${repo.html_url}" target="_blank" style="color: #50fa7b; font-weight: bold;">${repo.name}</a> - <span style="color: #c9d1d9;">${desc}</span><br>`;
            });
            output += `<br><span style="color: #c9d1d9; font-size: 12px;">Tip: Use 'cat [project]' for metadata.</span>`;
            return output;
        } catch (err) {
            return `<span class="error-text">Error fetching repositories: Check configuration or profile status.</span>`;
        }
    },

    'cat': async (args) => {
        if (!args || args.length === 0) {
            return `<span class="error-text">Usage: cat [project_name]</span>`;
        }

        const repoName = args[0].toLowerCase();

        if (cachedRepos.length === 0) {
            printOutput("<span style='color: #8be9fd;'>Fetching project data...</span>");
            try {
                const response = await fetch('https://api.github.com/users/redbith/repos');
                if (!response.ok) throw new Error();
                cachedRepos = await response.json();
            } catch (err) {
                return `<span class="error-text">Error: Could not fetch project data.</span>`;
            }
        }

        const repo = cachedRepos.find(r => r.name.toLowerCase() === repoName);

        if (!repo) {
            return `<span class="error-text">cat: ${repoName}: Project not found.</span>`;
        }

        return `
<div style="border: 1px solid #ff2a2a; padding: 10px; margin: 10px 0; background: rgba(255, 42, 42, 0.05); font-family: 'JetBrains Mono', monospace;">
<span style="color: #ff2a2a; font-weight: bold;">PROJECT: ${repo.name}</span>
--------------------------------------------------
<span style="color: #bd93f9; font-weight: bold;">Description:</span> ${repo.description || 'No description provided.'}
<span style="color: #bd93f9; font-weight: bold;">Language:</span> ${repo.language || 'Unknown'}
<span style="color: #bd93f9; font-weight: bold;">Stars:</span> ⭐ ${repo.stargazers_count}
<span style="color: #bd93f9; font-weight: bold;">Forks:</span> 🍴 ${repo.forks_count}
<span style="color: #bd93f9; font-weight: bold;">URL:</span> <a href="${repo.html_url}" target="_blank" style="color: #50fa7b;">${repo.html_url}</a>
--------------------------------------------------
</div>`;
    },

    'redfetch': () => {
        terminalHistory.innerHTML = '';

        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        const dateString = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        const container = document.createElement('div');
        container.className = 'fetch-container';

        const logoDiv = document.createElement('div');
        logoDiv.className = 'fetch-logo';
        logoDiv.textContent = repoLogo;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'fetch-info';
        infoDiv.innerHTML = `
        <span style="color: #ff2a2a; font-weight: bold;">redbith</span>@<span style="color: #ff2a2a; font-weight: bold;">github.com</span>
        -------------------------
        <span style="color: #ffffff; font-weight: bold;">OS</span>: EndeavourOS x86_64 (Custom Web Simulation)
        <span style="color: #ffffff; font-weight: bold;">Host</span>: GitHub Pages Cloud Host Engine
        <span style="color: #ffffff; font-weight: bold;">Kernel</span>: Linux 7.0.10-zen1-1-zen (Simulation Mode)
        <span style="color: #ffffff; font-weight: bold;">Uptime</span>: ${Math.floor(performance.now() / 60 / 1000)} mins
        <span style="color: #ffffff; font-weight: bold;">Shell</span>: fish 4.7.1 (redbith-sh)
        <span style="color: #ffffff; font-weight: bold;">Display</span>: ${window.screen.width}x${window.screen.height}
        <span style="color: #ffffff; font-weight: bold;">Terminal</span>: kitty 0.46.2
        <span style="color: #ffffff; font-weight: bold;">Terminal Font</span>: JetBrainsMonoNF-Regular (11pt)
        <span style="color: #ffffff; font-weight: bold;">CPU</span>: Simulated Core System (4) @ 4.10 GHz
        <span style="color: #ffffff; font-weight: bold;">Memory</span>: 3.54 GiB / 7.49 GiB (<span style="color: #50fa7b;">47%</span>)
        <span style="color: #ffffff; font-weight: bold;">Local Time</span>: ${dateString} ${timeString}
        <span style="color: #ffffff; font-weight: bold;">Status</span>: Aggr-Mode / Active

        <div class="color-palette">
        <div class="color-block" style="background: #282a36;"></div>
        <div class="color-block" style="background: #ff5555;"></div>
        <div class="color-block" style="background: #50fa7b;"></div>
        <div class="color-block" style="background: #f1fa8c;"></div>
        <div class="color-block" style="background: #bd93f9;"></div>
        <div class="color-block" style="background: #ff79c6;"></div>
        <div class="color-block" style="background: #8be9fd;"></div>
        <div class="color-block" style="background: #f8f8f2;"></div>
        </div>
        `;

        container.appendChild(logoDiv);
        container.appendChild(infoDiv);
        terminalHistory.appendChild(container);

        return null;
    }
};

// --- Boot Animasyonu ---
function startBootSequence() {
    inputLine.style.display = 'none';
    let logIndex = 0;

    function printNextLog() {
        if (logIndex < bootLogs.length) {
            const log = bootLogs[logIndex];
            let formattedText = "";

            if (log.type === "service") {
                formattedText = `<span style="color: #50fa7b; font-weight: bold;">[  OK  ]</span> ${log.text}`;
            } else if (log.type === "target") {
                formattedText = `<span style="color: #bd93f9; font-weight: bold;">[ TARGET ]</span> <span style="color: #ffffff; font-weight: bold;">${log.text}</span>`;
            } else {
                formattedText = `<span style="color: #8be9fd;">::</span> ${log.text}`;
            }

            printOutput(formattedText);
            logIndex++;

            const randomDelay = Math.floor(Math.random() * 140) + 80;
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLog, randomDelay);
        } else {
            setTimeout(() => {
                terminalHistory.innerHTML = '';
                printOutput(welcomeBanner);
                inputLine.style.display = 'flex';
                terminalInput.focus();
                window.scrollTo(0, 0);
            }, 600);
        }
    }

    printNextLog();
}

startBootSequence();
document.addEventListener('click', () => terminalInput.focus());

terminalInput.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
        const inputVal = this.value.trim();
        if (inputVal === '') return;

        commandHistory.push(inputVal);
        historyIndex = commandHistory.length;

        printOutput(`<span class="prompt">redbith@bohb-wax9 ~ $</span> <span style="color: var(--command-color);">${inputVal}</span>`);

        const parts = inputVal.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (commands[cmd]) {
            const result = await commands[cmd](args);
            if (result !== null) printOutput(result);
        } else {
            printOutput(`<span class="error-text">Error: Command '${cmd}' not found. Type 'help' for layout.</span>`);
        }

        this.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    }
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    }
});

function printOutput(text) {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = text;
    terminalHistory.appendChild(div);
}
