# redbith.github.io

A terminal-inspired personal portfolio built for the browser.

No frameworks. No unnecessary UI. Just a fast, interactive command-line experience that serves as a landing page, portfolio, and developer hub.

---

## Preview

![Demo](./assets/demo.gif)

> Replace with your own GIF or screenshot.

---

## Features

### Boot Sequence

A simulated Linux-style startup sequence runs when the page loads, displaying service initialization logs before handing control to the user.

### Interactive Terminal

Navigate the site through terminal commands instead of traditional UI elements.

Features include:

* Command history navigation
* Auto-scrolling output
* Real-time command execution
* Keyboard-first interaction

### GitHub Integration

The `ls` command fetches repositories directly from GitHub and displays them inside the terminal interface.

### Custom Neofetch

The `neofetch` command displays:

* ASCII branding
* Runtime information
* Environment details
* Terminal color palette

### Minimal Architecture

Built with:

* HTML
* CSS
* Vanilla JavaScript

No React, Vue, build tools, or external UI frameworks.

---

## Commands

| Command    | Description                  |
| ---------- | ---------------------------- |
| `help`     | Show available commands      |
| `whois`    | Display information about me |
| `whoami`   | Show current user            |
| `ls`       | List public repositories     |
| `neofetch` | Display system information   |
| `social`   | Show contact links           |
| `clear`    | Clear terminal output        |
| `reboot`   | Reload the environment       |

---

## Project Structure

```text
redbith.github.io/
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/redbith/redbith.github.io.git
cd redbith.github.io
```

Start a local server:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

---

## Roadmap

* [ ] Interactive htop-style monitor
* [ ] Additional terminal applications
* [ ] Expanded shell commands
* [ ] Local file system simulation
* [ ] Theme customization

---

## License

Released under the MIT License.
