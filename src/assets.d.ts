// Webpack turns these into URLs through asset/resource, so an import of one is a string at runtime. TypeScript has
// no way to know that on its own.
declare module "*.svg" {
    const source: string;
    export default source;
}

declare module "*.css" {
    const content: string;
    export default content;
}
