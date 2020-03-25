// Note: this file gets copied around, make sure you edit
// the UIconfig located at `gekko/web/vue/dist/UIconfig.js`.

// This config is used by both the frontend as well as the web server.
// see https://gekko.wizb.it/docs/installation/installing_gekko_on_a_server.html#Configuring-Gekko

const CONFIG = {
  headless: false,
  api: {
    host: '54.161.128.226',
    port: 7011,
    timeout: 120000 // 2 minutes
  },
  ui: {
    ssl: false,
    host: 'ec2-54-161-128-226.compute-1.amazonaws.com',
    port: 7011,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;
