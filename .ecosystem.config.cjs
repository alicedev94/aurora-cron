const path = require('path');

module.exports = {
  apps: [
    {
      name: 'aurora-cron',
      script: path.resolve(__dirname, './index.js'),
      env: {
        NODE_ENV: 'development',
        VERSION: '1.0.3-alpha.0',
      },
      env_production: {
        NODE_ENV: 'production',
        VERSION: '1.0.3-alpha.0',
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '1G',
      error_file: path.resolve(__dirname, './logs/pm2-err.log'),
      out_file: path.resolve(__dirname, './logs/pm2-out.log'),
      log_file: path.resolve(__dirname, './logs/pm2-combined.log'),
      time: true,
    },
  ],
};
