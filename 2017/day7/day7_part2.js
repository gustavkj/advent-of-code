const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 7, config.aocSessionCookie).then(data => {
  const rows = data.split('\n');

  let discs = rows.map(row => {
    let matches = row.match(/([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/)
    return {
      key: matches[1],
      weight: parseInt(matches[2], 10),
      children: [],
      childKeys: (typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [] ),
      hasParent: false,
      isBalanced: false,
      totalWeight: 0
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

  console.log(balanceDisc(discs.find(element => !element.hasParent)));
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

function balanceDisc(disc, i, arr) {
  if (disc.children.length !== 0 && !disc.isBalanced) {
    let childWeights = disc.children.map(balanceDisc);
    disc.isBalanced = !!childWeights.reduce((a,b) => (a === b ? a : NaN));
    disc.totalWeight = disc.weight + childWeights.reduce((total,weight) => total + weight);

    if (!disc.isBalanced) {
      let weights = {};
      for (var i = 0; i < childWeights.length; i++) {
        if (typeof weights[childWeights[i]] === 'undefined') {
          weights[childWeights[i]] = 1
        } else {
          weights[childWeights[i]]++;
        }
      }

      let faultyWeight;
      let rightWeight;

      if (weights[childWeights[0]] === 1) {
        faultyWeight = childWeights[0];
        rightWeight = childWeights[1];
      } else {
        faultyWeight = childWeights[1];
        rightWeight = childWeights[0];
      }
      const faultyChild = disc.children.find(child => child.totalWeight === faultyWeight);

      console.log(disc);
      console.log(faultyChild.key); // ptshtrn
      console.log(faultyChild.weight + rightWeight - faultyWeight); // 521

      faultyChild.weight += rightWeight - faultyWeight;
      faultyChild.totalWeight += rightWeight - faultyWeight;
      disc.totalWeight += rightWeight - faultyWeight;
      disc.isBalanced = true;
    }

    return disc.totalWeight;
  } else {
    disc.isBalanced = true;
    disc.totalWeight = disc.weight;
    return disc.weight;
  }
}
