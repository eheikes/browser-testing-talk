module.exports = {
  src_folders: 'test',
  output_folder: false,
  test_settings: {
    default: {
      launch_url: 'http://localhost:8080/',
      filter: '*.spec.js',
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },
    saucelabs: {
      selenium_host: 'ondemand.saucelabs.com',
      selenium_port: 80,
      username: '${SAUCE_USER}',
      access_key: '${SAUCE_ACCESS_KEY}',
      use_ssl: false,
      silent: true,
      output: true,
      screenshots: {
        enabled: false,
        on_failure: true,
        path: ''
      },
      selenium: {
        start_process: false
      }
    }
  }
};
