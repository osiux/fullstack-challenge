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
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '^@client(.*)$': '<rootDir>/src/client/$1',
        '^@server(.*)$': '<rootDir>/src/server/$1',
    },
    transformIgnorePatterns: ['node_modules/(?!(ky)/)'],
};
