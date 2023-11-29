module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.component.ts',
        'src/**/*.service.ts',
        'src/**/*.pipe.ts'
    ],
    coveragePathIgnorePatterns: [
        '.app.component.ts'
    ],
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/test/setup-jest.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
    transformIgnorePatterns: ['node_modules/(?!@angular)'],
};
