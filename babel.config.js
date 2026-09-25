// preset-typescript only strips the types, which is all webpack and jest need: tsc checks them separately.
module.exports = { presets: ["@babel/preset-env", "@babel/preset-typescript"] };
