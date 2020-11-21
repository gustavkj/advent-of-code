const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './data.txt'), 'utf8', function (err, data) {
  if (err) throw err;
  const checksum = data.split('\n').reduce((sum, val, i, arr) => {
    const row = val.split(/\s/).map(num => parseInt(num));
    for (let i = 0; i < row.length; i++) {
      for (let k = 0; k < row.length; k++) {
        if (i !== k && row[i] % row[k] === 0) {
          return sum + row[i] / row[k];
        }
      }
    }
  }, 0);

  console.log(checksum); // 233
});
