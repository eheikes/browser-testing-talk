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
    }
  }
};
