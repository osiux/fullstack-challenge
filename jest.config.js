module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    snapshotSerializers: ['jest-emotion'],
    moduleNameMapper: {
        '^@client(.*)$': '<rootDir>/src/client/$1',
        '^@server(.*)$': '<rootDir>/src/server/$1',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(ky)/)',
    ],
};
