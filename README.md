# [redbith.github.io](https://redbith.github.io)
An aggressive, minimalist, and hyper-realistic web terminal simulator acting as a personal command-center hub, landing page, and developer portfolio. Built from scratch to mimic a low-level Linux runtime environment inside a modern browser container.

## Preview

[![ff} Preview](https://i.hizliresim.com/keyktrv.gif)](https://hizliresim.com/keyktrv)
## How It Works

This simulator drops all standard front-end framework bloat—0% React, 0% Vue, and 0% external UI libraries—to achieve instantaneous rendering, custom terminal prompt bindings, and strict environment control.

When a user lands on the page, the input vector is locked while a native script handles system initialization simulations. Once the environment is ready, control is handed over to a custom JavaScript multiplexer that reads input strings, logs command history, and routes execution tokens to internal web applets.

## Features

### Systemd Boot Sequence Simulation

On page load, the interface streams an accurate sequence of core systemd initialization logs (including PipeWire Daemon, NetworkManager, Custom KVM Hypervisor hooks, and rpc-htop background helper routing) with randomized millisecond delays.

### True-to-Life Redfetch Engine

Executing the `redfetch` command clears the screen buffer and builds a rigid dual-column layout.

The left column forces a pure red, perfectly aligned Braille ASCII art glyph matrix.

The right column prints real-time runtime environment details:

- OS
- Kernel
- Shell
- Display
- Memory

followed by an exact 8-block color palette test matrix.

### Dynamic Asynchronous API Layer

The `ls` command natively talks to the GitHub API, executing an async/await fetch wrapper to map live public repositories, descriptions, and URLs into the file system array layout dynamically.

### Native Input Handling

Implements custom event listeners for:

- Command History array tracking
- ArrowUp navigation
- ArrowDown navigation
- Auto-scrolling line streams

## Supported System Commands

| Command | Description | Subsystem Processed |
|----------|-------------|---------------------|
| `help` | Evaluates and prints active terminal command layout | Internal Applet |
| `whois` | Outputs personal developer profile detailing security research philosophy | Core Biography |
| `ls` | Fetches and renders public code repositories in real-time | GitHub API Client |
| `whoami` | Prints current session access verification token | Root Environment |
| `redfetch` | Spawns custom system metrics and red Braille block layout | Neofetch Applet |
| `social` | Lists confirmed contact points and external networks | Networking Stack |
| `clear` | Flushes the current DOM layout tree of the terminal history | Buffer Reset |
| `reboot` | Dispatches a full hardware window interface reload event | Kernel Simulation |

## Project Repository Structure

```text
redbith.github.io/
├── index.html         # Core DOM layout and native prompt input container
├── css/
│   └── style.css      # JetBrains Mono font configuration & color variables
└── js/
    └── main.js        # Core multiplexer, systemd engine & applet router
```

## Design Specifications

### Color Variables

- Deep Absolute Black (`#000000`) background
- Hard Aggressive Red (`#ff2a2a`) for prompt tokens and welcome logos
- Terminal Green (`#50fa7b`) for verified input strings and successful outputs


to ensure flawless horizontal character alignment inside the ASCII and Braille render blocks.

## Build & Local Deployment

### Prerequisites

Since this environment architecture is engineered with zero external compiler dependencies or asset bundlers, you only need a web browser or a basic local web server to test execution.

### Quick Start

Clone the repository locally:

```bash
git clone https://github.com/redbith/redbith.github.io.git
cd redbith.github.io
```

Spin up a lightweight local server:

```bash
python3 -m http.server 8080
```

Open your browser and navigate to:

```text
http://localhost:8080
```

## Roadmap

Future iterations of the simulator aim to implement:

- [ ] Integration of an interactive, customized htop task monitoring widget interface
- [ ] Execution of local file read simulation applets using custom mock data structures
- [ ] Additional core shell environment configuration options

## License

This project is licensed under the MIT License.

See the `LICENSE` file for details.
