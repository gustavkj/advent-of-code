declare module 'aoc-loader' {
  export default function getInput(
    year: number,
    day: number,
    session?: string,
  ): Promise<string>;
}
