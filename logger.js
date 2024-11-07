const fs = require('fs');
const path = require('path');

class Logger {
  constructor(config) {
    this.config = config;
    this.logsDir = path.join(__dirname, 'logs');
    this.logFiles = ['errors', 'servers', 'commands', 'server_list'];
    
    this.initializeLogsFolder();
  }

  initializeLogsFolder() {
    // Create logs folder if it doesn't exist
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir);
      console.log('Created logs folder');
    }

    // Create log files if they don't exist
    this.logFiles.forEach(file => {
      const filePath = path.join(this.logsDir, `${file}.log`);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        console.log(`Created ${file}.log`);
      }
    });
  }

  log(type, message) {
    if (this.config.logging[type]) {
      const logFile = path.join(this.logsDir, `${type}.log`);
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ${message}\n`;

      fs.appendFileSync(logFile, logMessage);
    }
  }

  logError(error) {
    this.log('errors', `Error: ${error.message}\nStack: ${error.stack}`);
  }

  logServerJoin(guild) {
    this.log('servers', `Bot joined server: ${guild.name} (ID: ${guild.id})`);
    this.updateServerList();
  }

  logServerLeave(guild) {
    this.log('servers', `Bot left server: ${guild.name} (ID: ${guild.id})`);
    this.updateServerList();
  }

  updateServerList() {
    if (this.config.logging.servers) {
      const serverListFile = path.join(this.logsDir, 'server_list.log');
      const servers = Array.from(this.config.client.guilds.cache.values());
      const serverList = servers.map(guild => `${guild.name} (ID: ${guild.id})`).join('\n');
      fs.writeFileSync(serverListFile, serverList);
    }
  }
}

module.exports = Logger;