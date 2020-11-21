const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './data.txt'), 'utf8', function (err, data) {
  if (err) throw err;
  const checksum = data.split('\n').reduce((sum, val) => {
    const row = val.split(/\s/).map((num) => parseInt(num, 10));
    const max = row.reduce((maxVal, cur) => Math.max(maxVal, cur));
    const min = row.reduce((minVal, cur) => Math.min(minVal, cur));
    return sum + max - min;
  }, 0);

  console.log(checksum); // 30994
});
