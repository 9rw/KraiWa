# KraiWa — Discord voice log bot

A tiny Discord bot that posts concise voice channel join/leave/move messages to a configured log channel and exposes a small keep-alive endpoint at `/`.

Quick start
1. Create a `.env` in the project root with:

```env
DISCORD_TOKEN=your_discord_bot_token
LOG_CHANNEL_ID=123456789012345678
PORT=3000 # optional
```

2. Install and run:

```bash
npm install
node bot.js
```

License: MIT.
