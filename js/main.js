const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');
const inputLine = document.querySelector('.input-line');
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;

const themes = {
    red: {
        '--bg-color': '#000000',
        '--text-color': '#dfdfdf',
        '--prompt-color': '#ff2a2a',
        '--command-color': '#ff2a2a',
        '--error-color': '#ff5555',
        '--accent-color': '#bd93f9',
        '--matrix-color': '#ff2a2a',
        banner: '#ff2a2a',
        label: 'Red (Default)'
    },
    blue: {
        '--bg-color': '#000814',
        '--text-color': '#ccaef6',
        '--prompt-color': '#00b4d8',
        '--command-color': '#00b4d8',
        '--error-color': '#ef233c',
        '--accent-color': '#9b5de5',
        '--matrix-color': '#00b4d8',
        banner: '#00b4d8',
        label: 'Blue'
    },
    green: {
        '--bg-color': '#000b05',
        '--text-color': '#bbf7d0',
        '--prompt-color': '#4ade80',
        '--command-color': '#4ade80',
        '--error-color': '#ef233c',
        '--accent-color': '#facc15',
        '--matrix-color': '#4ade80',
        banner: '#4ade80',
        label: 'Green'
    },
    yellow: {
        '--bg-color': '#0a0a00',
        '--text-color': '#fffbeb',
        '--prompt-color': '#facc15',
        '--command-color': '#facc15',
        '--error-color': '#ef233c',
        '--accent-color': '#4ade80',
        '--matrix-color': '#facc15',
        banner: '#facc15',
        label: 'Yellow'
    },
    purple: {
        '--bg-color': '#090014',
        '--text-color': '#ede9fe',
        '--prompt-color': '#a78bfa',
        '--command-color': '#a78bfa',
        '--error-color': '#ef233c',
        '--accent-color': '#f472b6',
        '--matrix-color': '#a78bfa',
        banner: '#a78bfa',
        label: 'Purple'
    },
    white: {
        '--bg-color': '#0f0f14',
        '--text-color': '#f8f8f2',
        '--prompt-color': '#e2e8f0',
        '--command-color': '#e2e8f0',
        '--error-color': '#ea580c',
        '--accent-color': '#38bdf8',
        '--matrix-color': '#cbd5e1',
        banner: '#e2e8f0',
        label: 'White'
    },
    cyan: {
        '--bg-color': '#001219',
        '--text-color': '#e0f2fe',
        '--prompt-color': '#22d3ee',
        '--command-color': '#22d3ee',
        '--error-color': '#ea580c',
        '--accent-color': '#f472b6',
        '--matrix-color': '#22d3ee',
        banner: '#22d3ee',
        label: 'Cyan'
    },
    orange: {
        '--bg-color': '#0f0800',
        '--text-color': '#fff7ed',
        '--prompt-color': '#fb923c',
        '--command-color': '#fb923c',
        '--error-color': '#ef233c',
        '--accent-color': '#38bdf8',
        '--matrix-color': '#fb923c',
        banner: '#fb923c',
        label: 'Orange'
    },
    pink: {
        '--bg-color': '#14000b',
        '--text-color': '#fce7f3',
        '--prompt-color': '#f472b6',
        '--command-color': '#f472b6',
        '--error-color': '#ef233c',
        '--accent-color': '#a78bfa',
        '--matrix-color': '#f472b6',
        banner: '#f472b6',
        label: 'Pink'
    }
};

let currentTheme = 'red';

function applyTheme(name) {
    if (!themes[name]) return false;
    currentTheme = name;
    const root = document.documentElement;
    Object.entries(themes[name]).forEach(([k, v]) => {
        if (k.startsWith('--')) root.style.setProperty(k, v);
    });
    return true;
}

function buildColorPalette() {
    return `
    <div class="color-palette">
    ${Object.keys(themes).map(t => `<div class="color-block" style="background: ${themes[t]['--prompt-color']};" title="${themes[t].label}"></div>`).join('')}
    </div>`;
}

const getWelcomeBanner = () => `
<span style="color: ${themes[currentTheme].banner};">██████╗ ███████╗██████╗ ██████╗ ██╗████████╗██╗  ██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗██║╚══██╔══╝██║  ██║
██████╔╝█████╗  ██║  ██║██████╔╝██║   ██║   ███████║
██╔══██╗██╔══╝  ██║  ██║██╔══██╗██║   ██║   ██╔══██║
██║  ██║███████╗██████╔╝██████╔╝██║   ██║   ██║  ██║
╚═╝  ╚═╝╚══════╝╚═════╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝</span>

Welcome back. Connection established successfully.
Type '<span style="color: #50fa7b;">help</span>' to view the list of available commands.
--------------------------------------------------`;

// BURAYA KENDİ ORİJİNAL ASCII LOGONU YAPIŞTIR
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
let matrixInterval = null;

// --- CMatrix Sistem Yağmuru ---
function initMatrix() {
    if (!matrixCanvas || !matrixCtx) return;
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.width = window.innerWidth;

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCtx.fillStyle = themes[currentTheme]['--matrix-color'];
        matrixCtx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, 35);
}

function stopMatrix() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }
    if (matrixCanvas && matrixCtx) {
        matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    }
}

const commands = {
    'help': () => `
    Available Commands:
    <span style="color: #50fa7b;">help</span>            - Display available commands.
    <span style="color: #50fa7b;">whois</span>           - Learn more about redbithroot.
    <span style="color: #50fa7b;">ls</span>              - Fetch list of current public repositories from GitHub.
    <span style="color: #50fa7b;">cat [project]</span>   - View basic metadata about a project.
    <span style="color: #50fa7b;">theme [name]</span>    - Change terminal color palette.
    <span style="color: #50fa7b;">cmatrix</span>         - Toggle matrix digital rain effect.
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
        stopMatrix();
        setTimeout(() => { document.location.reload(true); }, 500);
        return null;
    },

    'clear': () => {
        terminalHistory.innerHTML = '';
        return null;
    },

    'theme': (args) => {
        if (!args || args.length === 0) {
            return `Available themes: <span style="color: #8be9fd;">${Object.keys(themes).join(', ')}</span><br>Usage: theme [theme_name]`;
        }
        const success = applyTheme(args[0].toLowerCase());
        if (success) {
            if (matrixInterval) initMatrix();
            return `Theme changed to <span style="color: var(--prompt-color); font-weight: bold;">${args[0]}</span> successfully.`;
        }
        return `<span class="error-text">Theme '${args[0]}' not found.</span>`;
    },

    'cmatrix': () => {
        if (matrixInterval) {
            stopMatrix();
            return "Matrix animation stopped.";
        } else {
            if (!matrixCanvas) return "<span class='error-text'>Error: Matrix canvas missing.</span>";
            initMatrix();
            return "Matrix animation initiated. Type 'cmatrix' to stop.";
        }
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

            let output = "<br><span style='color: var(--prompt-color); font-weight: bold;'>[ Public Repositories ]</span><br>";
            cachedRepos.forEach(repo => {
                output += `📁 <a href="${repo.html_url}" target="_blank" style="color: #50fa7b; font-weight: bold;">${repo.name}</a> - <span style="color: var(--text-color);">${repo.description || "No description provided."}</span><br>`;
            });
            return output;
        } catch (err) {
            return `<span class="error-text">Error fetching repositories.</span>`;
        }
    },

    'cat': async (args) => {
        if (!args || args.length === 0) return `<span class="error-text">Usage: cat [project_name]</span>`;
        const repoName = args[0].toLowerCase();

        if (cachedRepos.length === 0) {
            try {
                const response = await fetch('https://api.github.com/users/redbith/repos');
                cachedRepos = await response.json();
            } catch (err) { return `<span class="error-text">Error fetching project data.</span>`; }
        }

        const repo = cachedRepos.find(r => r.name.toLowerCase() === repoName);
        if (!repo) return `<span class="error-text">cat: ${repoName}: Project not found.</span>`;

        return `
<div style="border: 1px solid var(--prompt-color); padding: 10px; margin: 10px 0; background: rgba(255, 42, 42, 0.05);">
<span style="color: var(--prompt-color); font-weight: bold;">PROJECT: ${repo.name}</span>
--------------------------------------------------
<span style="color: #bd93f9; font-weight: bold;">Description:</span> ${repo.description || 'No description.'}
<span style="color: #bd93f9; font-weight: bold;">Language:</span> ${repo.language || 'Unknown'}
<span style="color: #bd93f9; font-weight: bold;">Stars:</span> ⭐ ${repo.stargazers_count}
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
        <span style="color: var(--prompt-color); font-weight: bold;">redbith</span>@<span style="color: var(--prompt-color); font-weight: bold;">github.com</span>
        -------------------------
        <span style="color: #ffffff; font-weight: bold;">OS</span>: EndeavourOS x86_64 (Custom Web Simulation)
        <span style="color: #ffffff; font-weight: bold;">Host</span>: GitHub Pages Cloud Host Engine
        <span style="color: #ffffff; font-weight: bold;">Kernel</span>: Linux 7.0.10-zen1-1-zen (Simulation Mode)
        <span style="color: #ffffff; font-weight: bold;">Uptime</span>: ${Math.floor(performance.now() / 60 / 1000)} mins
        <span style="color: #ffffff; font-weight: bold;">Shell</span>: fish 4.7.1 (redbith-sh)
        <span style="color: #ffffff; font-weight: bold;">Terminal</span>: kitty 0.46.2
        <span style="color: #ffffff; font-weight: bold;">CPU</span>: Simulated Core System (4) @ 4.10 GHz
        <span style="color: #ffffff; font-weight: bold;">Memory</span>: 3.54 GiB / 7.49 GiB (<span style="color: #50fa7b;">47%</span>)
        <span style="color: #ffffff; font-weight: bold;">Local Time</span>: ${dateString} ${timeString}
        
        ${buildColorPalette()}
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
                printOutput(getWelcomeBanner());
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

if (matrixCanvas) {
    window.addEventListener('resize', () => {
        if (matrixInterval) {
            matrixCanvas.height = window.innerHeight;
            matrixCanvas.width = window.innerWidth;
        }
    });
}

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
