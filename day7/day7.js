const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './example.txt'), 'utf8', function (err, data) {
  if (err) throw err;
  let rows = data.split('\n');
  
  // ([a-z]*)\s\(([0-9]*)\)(?:\s->(?:\s([a-z]*),?)*)?$
});
