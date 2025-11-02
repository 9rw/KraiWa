import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import express from 'express';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;
const PORT = process.env.PORT || 3000;

const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(PORT, () => console.log(`✅ Keep-alive server running on port ${PORT}`));

// ---------------- Discord Bot ----------------
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const member = newState.member || oldState.member;
  const memberId = member.user.id
  const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (!logChannel) return;

  const nowSeconds = Math.floor(Date.now() / 1000);
  let embed;

  // Joined voice channel
  if (!oldState.channelId && newState.channelId) {
    embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setDescription(`🎙️ **<@${memberId}>** joined <#${newState.channelId}> — <t:${nowSeconds}:t>`);
  }

  // Left voice channel
  else if (oldState.channelId && !newState.channelId) {
    embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setDescription(`❌ **<@${memberId}>** left <#${oldState.channelId}> — <t:${nowSeconds}:t>`);
  }

  // Moved between channels
  else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
    embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setDescription(`➡️ **<@${memberId}>** moved from <#${oldState.channelId}> → <#${newState.channelId}> — <t:${nowSeconds}:t>`);
  }

  if (embed) logChannel.send({ embeds: [embed] });
});

client.login(process.env.DISCORD_TOKEN);
