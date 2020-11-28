const inputLoader = require('aoc-loader');
const config = require('../../config');

function balanceDisc(disc) {
  if (disc.children.length !== 0 && !disc.isBalanced) {
    const childWeights = disc.children.map(balanceDisc);

    // eslint-disable-next-line no-param-reassign
    disc.isBalanced = !!childWeights.reduce((a, b) => (a === b ? a : NaN));

    // eslint-disable-next-line no-param-reassign
    disc.totalWeight = disc.weight + childWeights.reduce((total, weight) => total + weight);

    if (!disc.isBalanced) {
      const weights = {};
      for (let i = 0; i < childWeights.length; i += 1) {
        if (typeof weights[childWeights[i]] === 'undefined') {
          weights[childWeights[i]] = 1;
        } else {
          weights[childWeights[i]] += 1;
        }
      }

      let faultyWeight;
      let rightWeight;

      if (weights[childWeights[0]] === 1) {
        [faultyWeight, rightWeight] = childWeights;
      } else {
        [rightWeight, faultyWeight] = childWeights;
      }
      const faultyChild = disc.children.find((child) => child.totalWeight === faultyWeight);

      // console.log(disc);
      console.log(faultyChild.key); // ptshtrn
      console.log(faultyChild.weight + rightWeight - faultyWeight); // 521

      faultyChild.weight += rightWeight - faultyWeight;
      faultyChild.totalWeight += rightWeight - faultyWeight;

      // eslint-disable-next-line no-param-reassign
      disc.totalWeight += rightWeight - faultyWeight;

      // eslint-disable-next-line no-param-reassign
      disc.isBalanced = true;
    }

    return disc.totalWeight;
  }

  // eslint-disable-next-line no-param-reassign
  disc.isBalanced = true;

  // eslint-disable-next-line no-param-reassign
  disc.totalWeight = disc.weight;
  return disc.weight;
}

inputLoader(2017, 7, config.aocSessionCookie).then(
  (data) => {
    const rows = data.split('\n');

    const discs = rows.map((row) => {
      const matches = row.match(/([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/);
      return {
        key: matches[1],
        weight: parseInt(matches[2], 10),
        children: [],
        childKeys: typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [],
        hasParent: false,
        isBalanced: false,
        totalWeight: 0,
      };
    });

    discs.forEach((disc, i, arr) => {
      if (disc.childKeys.length !== 0) {
        // eslint-disable-next-line no-param-reassign
        disc.children = disc.childKeys.map((childKey) => {
          const childIndex = arr.findIndex((element) => {
            return element.key === childKey;
          });

          // eslint-disable-next-line no-param-reassign
          arr[childIndex].hasParent = true;

          return arr[childIndex];
        });
      }
    });

    console.log(balanceDisc(discs.find((element) => !element.hasParent)));
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
//   const rows = data.split('\n');
//
//   let discs = rows.map(row => {
//     let matches = row.match(/([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/)
//     return {
//       key: matches[1],
//       weight: parseInt(matches[2], 10),
//       children: [],
//       childKeys: (typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [] ),
//       hasParent: false,
//       isBalanced: false,
//       totalWeight: 0
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
//   // console.log(discs.find(element => !element.hasParent).key);
//
//   // console.log(balanceDisc(discs.find(element => !element.hasParent)));
//
//   //console.log(discs);
// });
