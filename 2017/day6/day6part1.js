const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 6, config.aocSessionCookie).then(data => {
  let banks = data.split(/\s/).map(num => parseInt(num));
  let cycles = 0;
  let preComb = [];

  console.log(banks);

  while (!preComb.includes(banks.join(''))) {
    preComb.push(banks.join(''));


    let max = banks.reduce((max, curVal, curInd) => {
      return {
        val: Math.max(max.val, curVal),
        ind: (curVal > max.val ? curInd : max.ind)
      };
    }, {val: 0, ind: 0});


    let i = (max.ind + 1) % banks.length;
    let remaining = max.val;
    let dist = Math.ceil(max.val/banks.length);

    while (i !== max.ind && (remaining - dist) >= 0) {
      banks[i] += dist;
      remaining -= dist;
      i = (i + 1) % banks.length;
    }

    banks[max.ind] = remaining;

    console.log(banks);

    cycles++;
  }
  console.log(cycles); // 11137
}, err => {
  if (err) throw err;
});

// const fs = require('fs');
// const path = require('path');
//
// fs.readFile(path.join(__dirname, './example.txt'), 'utf8', function (err, data) {
//   if (err) throw err;
//   let banks = data.split(/\s/).map(num => parseInt(num));
//   let cycles = 0;
//   let preComb = [];
//
//   console.log(banks);
//
//   while (!preComb.includes(banks.join(''))) {
//     preComb.push(banks.join(''));
//
//
//     let max = banks.reduce((max, curVal, curInd) => {
//       return {
//         val: Math.max(max.val, curVal),
//         ind: (curVal > max.val ? curInd : max.ind)
//       };
//     }, {val: 0, ind: 0});
//
//
//     let i = (max.ind + 1) % banks.length;
//     let remaining = max.val;
//     let dist = Math.ceil(max.val/banks.length);
//
//     while (i !== max.ind && (remaining - dist) >= 0) {
//       banks[i] += dist;
//       remaining -= dist;
//       i = (i + 1) % banks.length;
//     }
//
//     banks[max.ind] = remaining;
//
//     console.log(banks);
//
//     cycles++;
//   }
//   console.log(cycles);
// });