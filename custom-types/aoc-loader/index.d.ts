declare module 'aoc-loader' {
  export default function getInput(
    year: number,
    day: number,
    session?: string | undefined,
  ): Promise<string | undefined>;
}
