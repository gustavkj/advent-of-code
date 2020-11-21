const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 4, config.aocSessionCookie).then(data => {
  const noValid = data.split('\n').reduce((sum, passphrase) => {
    const words = passphrase.split(/\s/).map(word => {
      return word.split('').sort().join('');
    });

    for (let i = 0; i < words.length - 1; i++) {
      for (var k = i + 1; k < words.length; k++) {
        if (words[i] === words[k]) {
          return sum;
        }
      }
    }
    return sum + 1;
  }, 0);

  console.log(noValid); // 265
}, err => {
  if (err) throw err;
});



// const fs = require('fs');
// const path = require('path');
//
// fs.readFile(path.join(__dirname, './example_part2.txt'), 'utf8', function (err, data) {
//   if (err) throw err;
//   const noValid = data.split('\n').reduce((sum, passphrase) => {
//     const words = passphrase.split(/\s/).map(word => {
//       return word.split('').sort().join('');
//     });
//
//     for (let i = 0; i < words.length - 1; i++) {
//       for (var k = i + 1; k < words.length; k++) {
//         if (words[i] === words[k]) {
//           return sum;
//         }
//       }
//     }
//     return sum + 1;
//   }, 0);
//
//   console.log(noValid);
// });