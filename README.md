# Advanced Discord Bot# Advanced Discord Bot

A feature-rich Discord bot with slash commands, error handling, cooldowns, permissions, pagination, and more.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Configuration](#configuration)
- [Command System](#command-system)
- [Logging System](#logging-system)
- [Cooldowns and Permissions](#cooldowns-and-permissions)
- [Pagination Utility](#pagination-utility)
- [Adding New Commands](#adding-new-commands)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- Slash command support
- Error handling and graceful degradation
- Cooldown system
- Permission-based command access
- Pagination for long responses
- Interactive help menu
- Moderation tools
- Logging system

## Setup

1. Clone the repository
2. Install dependencies:

```
npm install
```
3. Copy `config.example.json` to `config.json` and fill in your bot token, client ID, and guild ID3. Copy `config.example.json` to `config.json` and fill in your bot token, client ID, and guild ID
4. Register slash commands:

```
node deploy-commands.js
```

5. Start the bot:

```
node index.js
```

## File Structure

```
discord-bot/
│
├── commands/
│   ├── fun/
│   │   └── choose.js
│   ├── general/
│   │   └── help.js
│   └── moderation/
│       └── kick.js
│
├── logs/
│   ├── errors.log
│   ├── servers.log
│   ├── commands.log
│   └── server_list.log
│
├── utils/
│   └── pagination.js
│
├── config.json
├── deploy-commands.js
├── index.js
├── logger.js
└── README.md
```

## Configuration

Edit `config.json` to customize the bot's behavior:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID",
  "guildId": "YOUR_GUILD_ID",
  "logging": {
    "errors": true,
    "servers": true,
    "commands": true
  },
  "cooldowns": {
    "general": 3,
    "moderation": 5,
    "fun": 2,
    "utility": 3
  },
  "permissions": {
    "general": "SEND_MESSAGES",
    "moderation": "MODERATE_MEMBERS",
    "fun": "SEND_MESSAGES",
    "utility": "SEND_MESSAGES"
  }
}
```

## Command System

Commands are organized into categories (folders) within the `commands/` directory. Each command is a separate file that exports an object with the following structure:

```javascript
 module.exports = {module.exports = {
  category: 'category_name',
  data: new SlashCommandBuilder()
    .setName('command_name')
    .setDescription('Command description'),
  async execute(interaction) {
    // Command logic here
  },
};
```

## Logging System

The bot automatically creates a `logs/` directory with the following log files:

- `errors.log`: Any errors encountered during bot operation
- `servers.log`: Server join/leave events
- `commands.log`: Command usage
- `server_list.log`: Up-to-date list of servers the bot is in


Logging can be configured in `config.json`.

## Cooldowns and Permissions

Cooldowns and permissions are defined in `config.json` for each command category. The bot automatically applies these settings to all commands within a category.

## Pagination Utility

The `utils/pagination.js` file provides a utility for paginating long responses. Use it in your commands like this:

```javascript
 const pagination = require('../../utils/pagination');const pagination = require('../../utils/pagination');

// ... in your command's execute function:
const pages = [
  new EmbedBuilder().setDescription('Page 1 content'),
  new EmbedBuilder().setDescription('Page 2 content'),
  // ... more pages
];

pagination(interaction, pages);
```

## Adding New Commands

1. Create a new file in the appropriate category folder within `commands/`
2. Use the following template:


```javascript
 const { SlashCommandBuilder } = require('discord.js');const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  category: 'category_name',
  data: new SlashCommandBuilder()
    .setName('command_name')
    .setDescription('Command description'),
  async execute(interaction) {
    // Command logic here
  },
};

```

3. Run `node deploy-commands.js` to register the new command with Discord


## Deployment

1. Ensure all your changes are committed and pushed to your repository
2. Set up a hosting platform (e.g., Heroku, DigitalOcean, or a VPS)
3. Configure environment variables for your bot token and other sensitive information
4. Deploy your bot to the hosting platform
5. Ensure the bot starts correctly and can connect to Discord


## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


Please ensure your code follows the existing style and includes appropriate documentation.

## License

This project is licensed under the MIT License.
