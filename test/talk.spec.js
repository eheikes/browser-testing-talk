module.exports = {
  'Initial loading': function(browser) {
    browser
      .init()
      .waitForElementVisible('div.flowtime', 1000)
      .assert.visible('h1')
      .assert.containsText('h1', 'Automate Your Browser Testing')
      .end();
  }
};
