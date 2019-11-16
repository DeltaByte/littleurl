const targetCoverage = 0

module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    'test',
    'lib'
  ],
  coverageThreshold: {
    global: {
      branches: targetCoverage,
      functions: targetCoverage,
      lines: targetCoverage
    }
  },
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.js'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  }
}
