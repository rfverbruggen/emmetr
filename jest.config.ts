import type { Config } from 'jest';

const config: Config = {
    preset: "ts-jest",
    collectCoverage: true,
    collectCoverageFrom: ["./src/**/*.ts"],
    coverageThreshold: {
        "global": {
            "lines": 80
        }
    },
    testEnvironment: "jsdom"
};

export default config;