const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './data.txt'), 'utf8', function (err, data) {
  if (err) throw err;
  const checksum = data.split('\n').reduce((sum, val, i, arr) => {
    const row = val.split(/\s/).map(num => parseInt(num));
    const max = row.reduce((max, cur) => Math.max(max, cur));
    const min = row.reduce((min, cur) => Math.min(min, cur));
    return sum + max - min;
  }, 0);

  console.log(checksum); // 30994
});
