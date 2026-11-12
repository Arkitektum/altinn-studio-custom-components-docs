module.exports = {
    testEnvironment: "jsdom",
    verbose: true,
    // No transform: jest's default, babel-jest, reads babel.config.js, which webpack uses too.
    // webpack resolves these through loaders, so jest needs stand-ins. Stylesheets contribute nothing to behaviour,
    // and an imported SVG is only ever used as an <img src>, so a string stands in for it.
    moduleNameMapper: {
        "\\.css$": "<rootDir>/test/styleMock.js",
        "\\.svg$": "<rootDir>/test/assetMock.js"
    },
    testMatch: ["<rootDir>/src/**/*.test.ts"]
};
