
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./tests/jest.setup.js'],
    transformIgnorePatterns: [],
    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js']
}