module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'dropbox-reader',
      externals: {
        react: 'React'
      }
    }
  }
}
