const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 7, config.aocSessionCookie).then(data => {
  const rows = data.split('\n');

  let discs = rows.map(row => {
    let matches = row.match(/([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/)
    return {
      key: matches[1],
      weight: matches[2],
      children: [],
      childKeys: (typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [] ),
      hasParent: false
    };
  });

  discs.forEach((disc, i, arr) => {
    if (disc.childKeys.length !== 0) {
      disc.children = disc.childKeys.map(childKey => {
        let childIndex = arr.findIndex(element => {
          return element.key === childKey;
        });

        arr[childIndex].hasParent = true;

        return arr[childIndex];
      });
    }
  });

  console.log(discs.find(element => !element.hasParent).key); // dtacyn
}, err => {
  if (err) throw err;
});

// const fs = require('fs');
// const path = require('path');
//
// fs.readFile(path.join(__dirname, './example.txt'), 'utf8', function (err, data) {
//   if (err) throw err;
//   const rows = data.split('\n');
//
//   let discs = rows.map(row => {
//     let matches = row.match(/([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/)
//     return {
//       key: matches[1],
//       weight: matches[2],
//       children: [],
//       childKeys: (typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [] ),
//       hasParent: false
//     };
//   });
//
//   discs.forEach((disc, i, arr) => {
//     if (disc.childKeys.length !== 0) {
//       disc.children = disc.childKeys.map(childKey => {
//         let childIndex = arr.findIndex(element => {
//           return element.key === childKey;
//         });
//
//         arr[childIndex].hasParent = true;
//
//         return arr[childIndex];
//       });
//     }
//   });
//
//   console.log(discs.find(element => !element.hasParent).key);
// });
