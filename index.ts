import aocLoader from 'aoc-loader';
import config from './config';

const year = Number(process.argv[2]);
const day = Number(process.argv[3]);

if (!year && !day) {
  throw new Error(
    'Please supply a year and a day to test using the format `npm start {year} {day}`',
  );
}

type PartExecuter = (input: string) => string | number;

interface Day {
  part1: PartExecuter;
  part2: PartExecuter;
}

aocLoader(year, day, config.aocSessionCookie)
  .then(async (data) => {
    const dayFile = (await import(`./${year}/day${day}`)) as Day;

    if (dayFile.part1) {
      const before = new Date().getTime();
      console.log(`Part 1: ${dayFile.part1(data)}`);
      console.log(`  Took: ${(new Date().getTime() - before).toFixed(3)} sek`);
    } else {
      console.log('Missing part 1');
    }

    if (dayFile.part2) {
      const before = new Date().getTime();
      console.log(`Part 2: ${dayFile.part2(data)}`);
      console.log(`  Took: ${(new Date().getTime() - before).toFixed(3)} sek`);
    } else {
      console.log('Missing part 2');
    }
  })
  .catch(console.error);
