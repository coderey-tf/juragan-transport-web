module.exports = {
  apps: [{
    name: 'juragan-web',
    cwd: '/var/www/juragan-transport',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3002',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
