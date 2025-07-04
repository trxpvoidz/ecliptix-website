
import fs from 'fs';
import fetch from 'node-fetch';

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!webhookUrl) {
  console.error("No Discord webhook URL found. Make sure to set it in GitHub secrets.");
  process.exit(1);
}

const news = JSON.parse(fs.readFileSync('news-assets/news.json', 'utf8'));
const latest = news[news.length - 1];

const payload = {
  embeds: [{
    title: latest.title,
    description: latest.content || latest.message || "",
    timestamp: new Date(latest.date).toISOString(),
    color: 0x3498db
  }]
};

if (latest.image) {
  payload.embeds[0].image = { url: `https://YOUR-WEBSITE.com/news-assets/${latest.image}` };
}

if (latest.youtube) {
  const ytId = latest.youtube.split("v=")[1] || latest.youtube.split("/").pop();
  payload.embeds[0].url = `https://www.youtube.com/watch?v=${ytId}`;
  payload.embeds[0].thumbnail = { url: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` };
}

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
.then(res => {
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  console.log("✅ Posted to Discord successfully.");
})
.catch(err => console.error("❌ Failed to post to Discord:", err));
