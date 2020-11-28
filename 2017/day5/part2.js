const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 5, config.aocSessionCookie).then(
  (data) => {
    const jumps = data.split('\n').map((num) => parseInt(num, 10));

    let steps = 0;
    let i = 0;

    while (i >= 0 && i < jumps.length) {
      const prevIndex = i;
      if (jumps[i] >= 3) {
        i += jumps[i];
        jumps[prevIndex] -= 1;
      } else {
        i += jumps[i];
        jumps[prevIndex] += 1;
      }
      steps += 1;
    }
    console.log(steps); // 30513679
  },
  (err) => {
    if (err) throw err;
  },
);

// const fs = require('fs');
// const path = require('path');
//
// fs.readFile(path.join(__dirname, './example.txt'), 'utf8', function (err, data) {
//   if (err) throw err;
//   const jumps = data.split('\n').map(num => parseInt(num));
//
//   let steps = 0;
//   let i = 0;
//
//   while (i >= 0 && i < jumps.length) {
//     if (jumps[i] >= 3) {
//       i += jumps[i]--;
//     } else {
//       i += jumps[i]++;
//     }
//     steps++;
//   }
//   console.log(steps);
// });
