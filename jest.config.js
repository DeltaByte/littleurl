const targetCoverage = 50

module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    'tests',
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
    '**/tests/**/*.js'
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  }
}
