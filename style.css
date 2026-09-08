const ADMIN_PIN = "1234"; // Yahan aap apna secret PIN change kar sakte hain

const defaultSkills = [
    {
        category: "BUG BOUNTY",
        icon: "fa-solid fa-bug",
        skills: ["Bug Bounty Hunting", "Web Vulnerabilities", "Recon & Target Analysis", "OWASP Top Basics"]
    },
    {
        category: "COMPUTER NETWORK",
        icon: "fa-solid fa-network-wired",
        skills: ["TCP/IP Model", "Routing & Subnetting", "Wireshark Analysis", "Ports & Protocols"]
    },
    {
        category: "PYTHON",
        icon: "fa-brands fa-python",
        skills: ["Automation Scripting", "Socket Programming", "API Requests", "CLI Tooling"]
    },
    {
        category: "C++",
        icon: "fa-solid fa-code",
        skills: ["Object-Oriented Programming", "Memory Management", "Data Structures", "Custom Utilities"]
    }
];

let skillsData = JSON.parse(localStorage.getItem('nav_skills')) || defaultSkills;

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    container.innerHTML = '';

    skillsData.forEach(group => {
        const box = document.createElement('div');
        box.className = 'content-box';

        let badgesHTML = '';
        group.skills.forEach(skill => {
            badgesHTML += `<div class="tool-badge"><i class="${group.icon}"></i> ${skill}</div>`;
        });

        box.innerHTML = `
            <span class="box-tag">${group.category}</span>
            <div class="tools-grid" style="margin-top: 15px;">
                ${badgesHTML}
            </div>
        `;

        container.appendChild(box);
    });
}

renderSkills();

// Admin Login Function
function adminLogin() {
    let userPin = prompt("Enter Admin PIN to add skills:");
    if (userPin === ADMIN_PIN) {
        document.getElementById('admin-panel').style.display = 'block';
        alert("Access Granted! You can now add skills.");
    } else if (userPin !== null) {
        alert("Incorrect PIN! Access Denied.");
    }
}

// Lock / Logout Admin Panel
function adminLogout() {
    document.getElementById('admin-panel').style.display = 'none';
}

// Handle Form Submission
const addSkillForm = document.getElementById('add-skill-form');
if (addSkillForm) {
    addSkillForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const categorySelect = document.getElementById('skill-category').value;
        const skillInput = document.getElementById('new-skill-name').value.trim();

        if (!skillInput) return;

        const categoryObj = skillsData.find(item => item.category === categorySelect);
        if (categoryObj) {
            if (!categoryObj.skills.includes(skillInput)) {
                categoryObj.skills.push(skillInput);
            }
        }

        localStorage.setItem('nav_skills', JSON.stringify(skillsData));
        renderSkills();
        document.getElementById('new-skill-name').value = '';
        alert("Skill added successfully!");
    });
}
