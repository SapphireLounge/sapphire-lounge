// This file is used to declare CSS module types
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare Tailwind directives to prevent TypeScript errors
declare namespace CSS {
  interface AtRule {
    tailwind: unknown;
    apply: unknown;
    layer: unknown;
    screen: unknown;
  }
}
