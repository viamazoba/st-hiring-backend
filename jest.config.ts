import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/src/**/*.test.ts',
    ],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
    ],
};

export default config;