module.exports = {
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/"],
    verbose: true,
    transform: {
        "^.+\\.[jt]sx?$": ["babel-jest", { presets: ["@babel/preset-env"] }]
    },
    // webpack resolves these through loaders, so jest needs stand-ins. Stylesheets contribute nothing to behaviour,
    // and an imported SVG is only ever used as an <img src>, so a string stands in for it.
    moduleNameMapper: {
        "\\.css$": "<rootDir>/test/styleMock.js",
        "\\.svg$": "<rootDir>/test/assetMock.js"
    },
    testMatch: ["<rootDir>/src/**/*.test.js"]
};
