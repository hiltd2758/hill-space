emailjs.init("IdZindU3V5A_y8F2Q");

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateForm()) return;

        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send(
            'service_jovlfaz',
            'template_j0chp08',
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'hiltd2758@ut.edu.vn'
            }
        )
        .then(function(response) {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(function(error) {
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        document.querySelectorAll('.resource-category').forEach(category => {
            category.style.display = (filter === 'all' || category.dataset.category === filter) ? 'block' : 'none';
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    window.addEventListener("scroll", function () {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });
});

document.querySelectorAll(".cta-button").forEach(button => {
    button.addEventListener("click", function(e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");

        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

document.querySelectorAll('.rating-stars i').forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = Array.from(this.parentElement.children).indexOf(this) + 1;
        const projectCard = this.closest('.project-feed-card');
        
        this.parentElement.querySelectorAll('i').forEach((s, index) => {
            s.className = index < ratingValue ? 'fas fa-star' : 'far fa-star';
        });

        const ratingCount = projectCard.querySelector('.rating-count');
        const currentCount = parseInt(ratingCount.textContent.match(/\d+/)[0]);
        ratingCount.textContent = `(${currentCount + 1} ratings)`;

        const thankYou = document.createElement('div');
        thankYou.className = 'rating-thanks';
        thankYou.textContent = 'Thanks for rating!';
        this.parentElement.appendChild(thankYou);
        setTimeout(() => thankYou.remove(), 2000);
    });
});

document.querySelectorAll('.comment-input').forEach(input => {
    const button = input.querySelector('.comment-btn');
    const textInput = input.querySelector('input');

    button.addEventListener('click', () => {
        if (textInput.value.trim()) {
            const commentsSection = input.closest('.project-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <img src="/api/placeholder/32/32" alt="User" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-author">You</span>
                    <p>${textInput.value}</p>
                </div>
            `;
            commentsSection.querySelector('.comments-preview').prepend(newComment);
            textInput.value = '';

            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
                newComment.style.transition = 'all 0.3s ease';
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
            });
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') button.click();
    });
});

const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.project-feed-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const techStack = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) ||
                           techStack.some(tech => tech.includes(searchTerm));
            
            card.style.display = matches ? 'block' : 'none';
        });
    });
}

const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    let page = 1;
    loadMoreBtn.addEventListener('click', async () => {
        try {
            loadMoreBtn.textContent = 'Loading...';
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const projectsGrid = document.querySelector('.projects-feed-grid');
            const template = document.querySelector('.project-feed-card').cloneNode(true);
            template.querySelector('h3').textContent = `New Project ${page + 1}`;
            projectsGrid.appendChild(template);
            
            page++;
            if (page >= 3) {
                loadMoreBtn.style.display = 'none';
            }
            
            loadMoreBtn.textContent = 'Load More Projects';
        } catch (error) {
            loadMoreBtn.textContent = 'Error Loading Projects';
        }
    });
}

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('bookmarked');
        const icon = this.querySelector('i');
        if (this.classList.contains('bookmarked')) {
            icon.className = 'fas fa-bookmark';
        } else {
            icon.className = 'far fa-bookmark';
        }
    });
});

function animateStats() {
    document.querySelectorAll('.project-stats span').forEach(stat => {
        const value = parseInt(stat.textContent.match(/\d+/)[0]);
        let current = 0;
        const increment = value / 20;
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(interval);
            }
            stat.textContent = stat.textContent.replace(/\d+/, Math.round(current));
        }, 50);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.project-feed-card').forEach(card => {
    observer.observe(card);
});


const initializeMobileNav = () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbar = document.querySelector('.navbar');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbar && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbar.classList.toggle('active');
            navbarMenu.classList.toggle('active'); // thêm toggle
        });

        document.querySelectorAll('.navbar-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNav();
});


// terminal-mode
document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.createElement("div");
    terminal.classList.add("terminal-mode");
    document.body.appendChild(terminal);

    const terminalHeader = document.createElement("div");
    terminalHeader.classList.add("terminal-header");
    terminal.appendChild(terminalHeader);

    const terminalTitle = document.createElement("div");
    terminalTitle.classList.add("terminal-title");
    terminalTitle.textContent = "Hil Tran Terminal";
    terminalHeader.appendChild(terminalTitle);

    const terminalControls = document.createElement("div");
    terminalControls.classList.add("terminal-controls");
    terminalHeader.appendChild(terminalControls);

    const minimizeBtn = document.createElement("span");
    minimizeBtn.classList.add("terminal-btn", "minimize");
    minimizeBtn.innerHTML = "&#9472;";
    terminalControls.appendChild(minimizeBtn);

    const closeBtn = document.createElement("span");
    closeBtn.classList.add("terminal-btn", "close");
    closeBtn.innerHTML = "&#10005;";
    terminalControls.appendChild(closeBtn);

    const terminalOutput = document.createElement("div");
    terminalOutput.classList.add("terminal-text");
    terminal.appendChild(terminalOutput);

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");
    terminal.appendChild(inputWrapper);

    const promptSymbol = document.createElement("span");
    promptSymbol.classList.add("prompt-symbol");
    promptSymbol.textContent = ">";
    inputWrapper.appendChild(promptSymbol);

    const terminalInput = document.createElement("input");
    terminalInput.classList.add("terminal-input");
    terminalInput.setAttribute("type", "text");
    terminalInput.setAttribute("placeholder", "Type a command...");
    inputWrapper.appendChild(terminalInput);


    let terminalActive = false;
    let commandHistory = JSON.parse(localStorage.getItem("command-history") || "[]");
    let historyIndex = commandHistory.length;
    let lastCommand = "";
    let isMinimized = false;
    let isDragging = false;
    let offsetX, offsetY;


    let themes = {
        "monokai": { 
            bg: "#272822", 
            text: "#f8f8f2",
            headerBg: "#1e1f1c",
            promptColor: "#a6e22e",
            linkColor: "#66d9ef",
            font: "'JetBrains Mono', monospace" 
        },
        "dracula": { 
            bg: "#282a36", 
            text: "#f8f8f2",
            headerBg: "#1e1e2e",
            promptColor: "#bd93f9",
            linkColor: "#8be9fd",
            font: "'Fira Code', monospace" 
        },
        "nord": { 
            bg: "#2e3440", 
            text: "#d8dee9",
            headerBg: "#272c36",
            promptColor: "#88c0d0",
            linkColor: "#81a1c1",
            font: "'Source Code Pro', monospace"
        },
        "github-dark": { 
            bg: "#0d1117", 
            text: "#c9d1d9",
            headerBg: "#161b22",
            promptColor: "#58a6ff",
            linkColor: "#58a6ff",
            font: "'SF Mono', monospace"
        },
        "tokyo-night": { 
            bg: "#1a1b26", 
            text: "#a9b1d6",
            headerBg: "#16161e",
            promptColor: "#7aa2f7",
            linkColor: "#bb9af7",
            font: "'Cascadia Code', monospace"
        },
        "hacker": { 
            bg: "#000", 
            text: "#00ff00",
            headerBg: "#0a0a0a",
            promptColor: "#00ff00",
            linkColor: "#33ff33",
            font: "'VT323', monospace"
        },
        "matrix": {
            bg: "#0c0c0c",
            text: "#33ff33",
            headerBg: "#080808",
            promptColor: "#00cc00",
            linkColor: "#99ff99",
            font: "'Matrix Code NFI', monospace"
        }
    };


    let position = JSON.parse(localStorage.getItem("terminal-position") || '{"x": "20px", "y": "20px"}');
    terminal.style.left = position.x;
    terminal.style.top = position.y;


    let currentTheme = localStorage.getItem("terminal-theme") || "monokai";
    applyTheme(currentTheme);

    terminalHeader.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", dragTerminal);
    document.addEventListener("mouseup", stopDrag);

    function startDrag(e) {
        if (e.target === minimizeBtn || e.target === closeBtn) return;
        isDragging = true;
        const rect = terminal.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        terminal.style.opacity = "0.8";
    }

    function dragTerminal(e) {
        if (!isDragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        terminal.style.left = `${x}px`;
        terminal.style.top = `${y}px`;
    }

    function stopDrag() {
        if (isDragging) {
            isDragging = false;
            terminal.style.opacity = "1";

            localStorage.setItem("terminal-position", JSON.stringify({
                x: terminal.style.left,
                y: terminal.style.top
            }));
        }
    }


    document.addEventListener("keydown", function (event) {
        if (event.key === "`") {
            event.preventDefault();
            toggleTerminal();
        }
        if (event.key === "Escape" && terminalActive) toggleTerminal(false);
        if (terminalActive && event.key === "ArrowUp") navigateHistory("up");
        if (terminalActive && event.key === "ArrowDown") navigateHistory("down");
    });

    minimizeBtn.addEventListener("click", function() {
        if (isMinimized) {
            terminal.classList.remove("minimized");
            isMinimized = false;
        } else {
            terminal.classList.add("minimized");
            isMinimized = true;
        }
    });

    closeBtn.addEventListener("click", function() {
        toggleTerminal(false);
    });

    function toggleTerminal(state) {
        terminalActive = state !== undefined ? state : !terminalActive;
        terminal.style.display = terminalActive ? "flex" : "none";
        if (terminalActive) {
            terminalInput.focus();
            isMinimized = false;
            terminal.classList.remove("minimized");
            

            if (terminalOutput.innerHTML === "") {
                showWelcome();
            }
        }
    }

    function showWelcome() {
        const now = new Date();
        const hours = now.getHours();
        let greeting;
        
        if (hours >= 5 && hours < 12) {
            greeting = "Good morning!";
        } else if (hours >= 12 && hours < 18) {
            greeting = "Good afternoon! Time for some coffee? ☕";
        } else if (hours >= 18 && hours < 22) {
            greeting = "Good evening! Perfect time to chill and code! 🌙";
        } else if (hours >= 22 || hours < 2) {
            greeting = "Why are you still up? Đang fix bug hả người đẹp";
        } else if (hours >= 2 && hours < 5) {
            greeting = "Bro, it's demon hours. Ngủ được rồi nha người đẹp 🌚";
        } else {
            greeting = "Hello, time traveler! Are you coding from another dimension? ⏳🌀";
        }
        
        console.log(greeting);
        
        
        terminalOutput.innerHTML = `
            <div class="welcome-message">
                <div class="ascii-art">
████████╗██████╗  █████╗ ███╗   ██╗    ██╗  ██╗██╗██╗            ██╗ ██╗ 
╚══██╔══╝██╔══██╗██╔══██╗████╗  ██║    ██║  ██║██║██║         ██╗╚██╗╚██╗
   ██║   ██████╔╝███████║██╔██╗ ██║    ███████║██║██║         ╚═╝ ██║ ██║
   ██║   ██╔══██╗██╔══██║██║╚██╗██║    ██╔══██║██║██║         ██╗ ██║ ██║
   ██║   ██║  ██║██║  ██║██║ ╚████║    ██║  ██║██║███████╗    ╚═╝██╔╝██╔╝
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝╚══════╝       ╚═╝ ╚═╝ 
                </div>
                <p>${greeting}! Welcome to Hil Tran's Terminal v2.0</p>
                <p>Type <span class="cmd-highlight">help</span> for available commands</p>
            </div>
        `;
    }

    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = terminalInput.value.trim();
            if (command) {
                lastCommand = command;
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                
                if (commandHistory.length > 50) {
                    commandHistory = commandHistory.slice(-50);
                }
                
                localStorage.setItem("command-history", JSON.stringify(commandHistory));
                
                processCommand(command);
                

                setTimeout(() => {
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 0);
            }
            terminalInput.value = "";
        }
    });

    function processCommand(command) {

        const cmdElement = document.createElement("div");
        cmdElement.classList.add("command-entry");
        cmdElement.innerHTML = `<span class="prompt-text">> </span><span class="entered-command">${command}</span>`;
        terminalOutput.appendChild(cmdElement);

        const response = document.createElement("div");
        response.classList.add("command-response");

        const commandLower = command.toLowerCase();
        const args = command.split(" ");
        const mainCommand = args[0].toLowerCase();

        switch (mainCommand) {
            case "help":
                response.innerHTML = getHelpText();
                break;
            case "about":
                response.innerHTML = `
                    <div class="about-info">
                        <p>Hil Tran - A curious learner exploring software development!</p>
                        <p>Currently building web applications with modern technologies</p>
                        <p>Based in Vietnam • Developer • Creator • Explorer</p>
                    </div>
                `;
                break;
            case "skills":
                response.innerHTML = getSkillsHtml();
                break;
            case "projects":
                response.innerHTML = getProjectsHtml();
                break;
            case "contact":
                response.innerHTML = `
                    <div class="contact-info">
                        <p>Email: <a href="mailto:hiltd2758@ut.edu.vn" class="terminal-link">hiltd2758@ut.edu.vn</a></p>
                        <p>GitHub: <a href="https://github.com/hiltd2758" class="terminal-link" target="_blank">github.com/hiltd2758</a></p>
                        <p>LinkedIn: <a href="https://www.linkedin.com/in/hil-tr%E1%BA%A7n-68066233a/" class="terminal-link" target="_blank">linkedin.com/in/hil-tr%E1%BA%A7n-68066233a</a></p>
                    </div>
                `;
                break;
            case "clear":
                terminalOutput.innerHTML = "";
                return;
            case "time":
                const now = new Date();
                response.innerHTML = `Current time: ${now.toLocaleTimeString()} - ${now.toLocaleDateString()}`;
                break;
            case "theme":
                if (args.length > 1) {
                    let themeName = args[1];
                    if (themes[themeName]) {
                        applyTheme(themeName);
                        response.innerHTML = `Theme changed to <span class="highlight">${themeName}</span>`;
                    } else {
                        response.innerHTML = `Theme not found. Available themes: ${Object.keys(themes).join(", ")}`;
                    }
                } else {
                    response.innerHTML = `Current theme: <span class="highlight">${currentTheme}</span><br>Available themes: ${Object.keys(themes).join(", ")}`;
                }
                break;
            case "echo":
                const echoText = args.slice(1).join(" ");
                response.innerHTML = echoText || "<i>empty echo</i>";
                break;
            case "weather":
                simulateWeatherReport(response);
                break;
            case "joke":
                const jokes = [
                    "Why do programmers prefer dark mode? Because light attracts bugs!",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                    "Why do Java developers wear glasses? Because they don't C#!",
                    "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
                    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
                    "Why coders never get lost? Cuz they always stay on they path, no GPS needed. 🤷🏾‍♂️",
                    "How coders flirt? 'Ayo, you a syntax error? Cuz every time I see you, my heart throws exceptions.' 😏",
                    "Why did the JavaScript developer go broke? Cuz he couldn't find a 'return' statement. 🤷🏾‍♂️",
                    "C++ devs in relationships be like: 'I love you… but I need more pointers.' 👀",
                    "Why JS devs bad at commitments? Cuz they always async/awaitin'. 🤷🏾‍♂️",
                    "Why did the CSS developer go broke? Cuz he couldn't find a selector. 🤷🏾‍♂️",
                    "Why coders don’t drive? Cuz they tryna Ctrl + Z instead of hittin’ the brakes. 🚗💨",
                    "Why did the HTML developer go broke? Cuz he couldn't find a DOCTYPE. 🤷🏾‍♂️",
                    "Why I can’t date a front-end dev? Cuz they only care bout looks. "
                ];
                response.innerHTML = jokes[Math.floor(Math.random() * jokes.length)];
                break;
            case "exit":
                toggleTerminal(false);
                return;
            case "help":
                response.innerHTML = getHelpText();
                break;
            case "history":
                if (commandHistory.length === 0) {
                    response.innerHTML = "<i>Command history is empty</i>";
                } else {
                    const historyItems = commandHistory.map((cmd, index) => 
                        `<div><span class="history-num">${index + 1}</span> ${cmd}</div>`
                    ).join("");
                    response.innerHTML = `<div class="history-list">${historyItems}</div>`;
                }
                break;
                case "tictactoe":
                    response.innerHTML = `
                        <div class="tictactoe-container">
                            <div class="tictactoe-status">Game mới bắt đầu - Lượt của X</div>
                            <div class="tictactoe-board">
                                <div class="tictactoe-row">
                                    <div class="tictactoe-cell" data-index="0"></div>
                                    <div class="tictactoe-cell" data-index="1"></div>
                                    <div class="tictactoe-cell" data-index="2"></div>
                                </div>
                                <div class="tictactoe-row">
                                    <div class="tictactoe-cell" data-index="3"></div>
                                    <div class="tictactoe-cell" data-index="4"></div>
                                    <div class="tictactoe-cell" data-index="5"></div>
                                </div>
                                <div class="tictactoe-row">
                                    <div class="tictactoe-cell" data-index="6"></div>
                                    <div class="tictactoe-cell" data-index="7"></div>
                                    <div class="tictactoe-cell" data-index="8"></div>
                                </div>
                            </div>
                            <button class="tictactoe-reset">Chơi lại</button>
                        </div>
                    `;
                    const gameStyle = document.createElement('style');
                    gameStyle.textContent = `
                        .tictactoe-container {
                            padding: 10px;
                            margin-top: 10px;
                            font-family: monospace;
                        }
                        .tictactoe-status {
                            margin-bottom: 10px;
                            font-weight: bold;
                            color: var(--text-color, #33ff33);
                        }
                        .tictactoe-board {
                            display: inline-block;
                            background: var(--bg-secondary, #222);
                            border: 2px solid var(--text-color, #33ff33);
                        }
                        .tictactoe-row {
                            display: flex;
                        }
                        .tictactoe-cell {
                            width: 50px;
                            height: 50px;
                            border: 1px solid var(--text-color, #33ff33);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            cursor: pointer;
                            transition: background-color 0.2s;
                        }
                        .tictactoe-cell:hover {
                            background-color: rgba(51, 255, 51, 0.1);
                        }
                        .tictactoe-reset {
                            margin-top: 10px;
                            background: var(--bg-secondary, #222);
                            color: var(--text-color, #33ff33);
                            border: 1px solid var(--text-color, #33ff33);
                            padding: 5px 10px;
                            cursor: pointer;
                            font-family: monospace;
                        }
                        .tictactoe-reset:hover {
                            background-color: rgba(51, 255, 51, 0.1);
                        }
                    `;
                    document.head.appendChild(gameStyle);
                    

                    setTimeout(() => {
                        initTicTacToe(response);
                    }, 100);
                    break;
            default:

                response.innerHTML = `Gõ <span class="error-text"> sai chính tả </span> rồi á người đẹp ơi :3 <br>Command not found: <span class="error-text">${command}</span><br>Type <span class="cmd-highlight">help</span> for available commands.`;
        }
        
        terminalOutput.appendChild(response);
    }

    function getHelpText() {
        return `
            <div class="help-grid">
                <div class="help-category">
                    <h3>Basic Commands</h3>
                    <ul>
                        <li><span class="cmd-highlight">help</span> - Show help menu</li>
                        <li><span class="cmd-highlight">about</span> - About me</li>
                        <li><span class="cmd-highlight">skills</span> - See skills i'm still learning</li>
                        <li><span class="cmd-highlight">projects</span> - View tiny projects</li>
                        <li><span class="cmd-highlight">contact</span> - Get contact</li>
                    </ul>
                </div>
                <div class="help-category">
                    <h3>System Commands</h3>
                    <ul>
                        <li><span class="cmd-highlight">clear</span> - Clear terminal</li>
                        <li><span class="cmd-highlight">time</span> - Display current time</li>
                        <li><span class="cmd-highlight">theme [name]</span> - Change theme</li>
                        <li><span class="cmd-highlight">echo [text]</span> - Display text</li>
                        <li><span class="cmd-highlight">history</span> - Command history</li>
                        <li><span class="cmd-highlight">exit</span> - Close terminal</li>
                    </ul>
                </div>
                <div class="help-category">
                    <h3>Fun Commands</h3>
                    <ul>
                        <li><span class="cmd-highlight">weather</span> - Check simulated weather</li>
                        <li><span class="cmd-highlight">joke</span> - Tell a: <span class="error-text">&nbspdad&nbsp;joke</span></li>
                        <li><span class="cmd-highlight">tictactoe</span> - Play tic-tac-toe with me </li>
                    </ul>
                </div>
            </div>
            <p>Keyboard: Press <span class="kbd">Tab</span> to autocomplete, <span class="kbd">↑</span><span class="kbd">↓</span> for history</p>
        `;
    }

    function getSkillsHtml() {
        const frontendSkills = ["HTML5", "CSS3", "JavaScript", "React.js", "Vue.js", "Tailwind CSS", "Bootstrap"];
        const backendSkills = ["Node.js", "Express", "PHP", "MongoDB", "MySQL"];
        const toolsSkills = ["Git", "Webpack", "Docker", "VS Code", "Figma"];
        
        return `
            <div class="skills-container">
                <div class="skill-category">
                    <h3>Frontend</h3>
                    <div class="skill-badges">
                        ${frontendSkills.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
                    </div>
                </div>
                <div class="skill-category">
                    <h3>Backend</h3>
                    <div class="skill-badges">
                        ${backendSkills.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
                    </div>
                </div>
                <div class="skill-category">
                    <h3>Tools</h3>
                    <div class="skill-badges">
                        ${toolsSkills.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    function getProjectsHtml() {
        const projects = [
            {
                name: "Image to Text",
                tech: "OCR, JavaScript",
                desc: "Extract text from images using OCR technology for easy editing and accessibility."
            },
            {
                name: "Text to Voice",
                tech: "Web Speech API, JavaScript",
                desc: "Convert written text into speech using Web Speech API with adjustable voice settings."
            },
            {
                name: "Country Explorer",
                tech: "JavaScript, API",
                desc: "Explore countries with basic information, compare population, area, GDP, and time zones in a fun battle!"
            },
            {
                name: "AVL Tree Visualization",
                tech: "JavaScript, D3.js",
                desc: "A visualization project demonstrating AVL tree balancing and rotations."
            }
        ];
        
        
        return `
            <div class="projects-list">
                ${projects.map(project => `
                    <div class="project-card">
                        <h3>${project.name}</h3>
                        <div class="project-tech">${project.tech}</div>
                        <p>${project.desc}</p>
                    </div>
                `).join("")}
                <p>More at <a href="https://github.com/hiltd2758" class="terminal-link" target="_blank">github.com/hiltd2758</a></p>
            </div>
        `;
    }

    function simulateWeatherReport(element) {
        const weather = ["Sunny", "Cloudy", "Rainy", "Thunderstorm", "Snowy", "Windy", "Foggy"];
        const temp = Math.floor(Math.random() * 35) + 5; 
        const humidity = Math.floor(Math.random() * 60) + 30;
        const condition = weather[Math.floor(Math.random() * weather.length)];
        
        element.innerHTML = `
            <div class="weather-report">
                <div class="weather-main">
                    <span class="weather-condition">${condition}</span>
                    <span class="weather-temp">${temp}°C</span>
                </div>
                <div class="weather-details">
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind: ${Math.floor(Math.random() * 30)} km/h</p>
                </div>
                <p><i>Note: This is simulated weather data</i></p>
            </div>
        `;
    }

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;
        
        if (direction === "up") {
            historyIndex = Math.max(0, historyIndex - 1);
            terminalInput.value = commandHistory[historyIndex] || "";
        } else if (direction === "down") {
            historyIndex = Math.min(commandHistory.length, historyIndex + 1);
            terminalInput.value = commandHistory[historyIndex] || "";
        }
    }

    function applyTheme(theme) {
        if (!themes[theme]) theme = "monokai";
        
        const themeProps = themes[theme];
        document.documentElement.style.setProperty("--terminal-bg", themeProps.bg);
        document.documentElement.style.setProperty("--terminal-text", themeProps.text);
        document.documentElement.style.setProperty("--terminal-header", themeProps.headerBg);
        document.documentElement.style.setProperty("--prompt-color", themeProps.promptColor);
        document.documentElement.style.setProperty("--link-color", themeProps.linkColor);
        document.documentElement.style.setProperty("--terminal-font", themeProps.font);
        
        currentTheme = theme;
        localStorage.setItem("terminal-theme", theme);
        
        terminal.className = "terminal-mode";
        terminal.classList.add(`theme-${theme}`);
        
        if (theme === "hacker" || theme === "matrix") {
            terminal.classList.add("retro-effect");
        } else {
            terminal.classList.remove("retro-effect");
        }
    }

    terminalInput.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const currentInput = terminalInput.value.trim().toLowerCase();
            if (!currentInput) return;
            
            const commands = [
                "help", "about", "skills", "projects", "contact", 
                "clear", "time", "theme", "echo", "weather", 
                "joke", "exit", "history"
            ];
            
            if (currentInput.startsWith("theme ")) {
                const themePrefix = currentInput.split(" ")[1] || "";
                const matchingThemes = Object.keys(themes).filter(t => 
                    t.startsWith(themePrefix)
                );
                
                if (matchingThemes.length === 1) {
                    terminalInput.value = `theme ${matchingThemes[0]}`;
                }
                return;
            }
            
            const matchingCommands = commands.filter(cmd => 
                cmd.startsWith(currentInput)
            );
            
            if (matchingCommands.length === 1) {
                terminalInput.value = matchingCommands[0];
            }
        }
    });



});

function initTicTacToe(container) {
    const board = container.querySelector('.tictactoe-board');
    const cells = container.querySelectorAll('.tictactoe-cell');
    const status = container.querySelector('.tictactoe-status');
    const resetButton = container.querySelector('.tictactoe-reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.color = currentPlayer === 'X' ? '#33ff33' : '#ff3366';
        
        checkResult();
    }
    
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            status.textContent = `Người chơi ${currentPlayer} thắng!`;
            gameActive = false;
            return;
        }
        
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            status.textContent = 'Hòa!';
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Lượt của ${currentPlayer}`;
    }
    
    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = 'Game mới bắt đầu - Lượt của X';
        
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', restartGame);
    
    board.addEventListener('mousewheel', (e) => {
        e.stopPropagation();
    }, { passive: false });
}

const terminal = document.querySelector('.terminal');

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector('.terminal');

    if (terminal) {
        terminal.addEventListener("mouseenter", () => {
            document.body.style.overflow = "hidden"; 
        });

        terminal.addEventListener("mouseleave", () => {
            document.body.style.overflow = ""; 
        });
    } else {
        console.warn("Element .terminal not found!");
    }
});

