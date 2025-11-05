# KraiWa — Discord voice log bot

A tiny Discord bot that posts concise voice channel join/leave/move messages to a configured log channel and exposes a small keep-alive endpoint at `/`.

Quick start
1. Rename the .env.example file to .env:

2. Update environment values:

```env
# Discord bot token — get this from https://discord.com/developers/applications
DISCORD_TOKEN=bot_token

# ID of the channel where the bot should post voice logs
LOG_CHANNEL_ID=text_channel_id

# Optional: Port for the web server (default: 3000)
PORT=3000 # optional
```

3. Install and run:

```bash
npm install
node bot.js
```

License: MIT.
