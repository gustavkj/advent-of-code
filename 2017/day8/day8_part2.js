const inputLoader = require('aoc-loader');
const config = require('../../config');

inputLoader(2017, 8, config.aocSessionCookie).then(data => {
  let rows = data.split('\n');
  let regs = {};
  let max = 0;

  rows.map(row => {
    let inst = row.split(/\s/);
    inst[2] = parseInt(inst[2], 10);
    inst[6] = parseInt(inst[6], 10);

    if (typeof regs[inst[0]] === 'undefined') {
      regs[inst[0]] = 0;
    }

    if (typeof regs[inst[4]] === 'undefined') {
      regs[inst[4]] = 0;
    }

    if (operators[inst[5]](regs[inst[4]], inst[6])) {
      regs[inst[0]] = incOrDec(regs[inst[0]], inst[1], inst[2]);
    }

    max = Math.max(max, ...Object.values(regs));

  });
  console.log(max); // 6366
}, err => {
  if (err) throw err;
});

// const fs = require('fs');
// const path = require('path');
//
// fs.readFile(path.join(__dirname, './example.txt'), 'utf8', function (err, data) {
//   if (err) throw err;
//   let rows = data.split('\n');
//   let regs = {};
//   let max = 0;
//
//   rows.map(row => {
//     let inst = row.split(/\s/);
//     inst[2] = parseInt(inst[2], 10);
//     inst[6] = parseInt(inst[6], 10);
//
//     if (typeof regs[inst[0]] === 'undefined') {
//       regs[inst[0]] = 0;
//     }
//
//     if (typeof regs[inst[4]] === 'undefined') {
//       regs[inst[4]] = 0;
//     }
//
//     if (operators[inst[5]](regs[inst[4]], inst[6])) {
//       regs[inst[0]] = incOrDec(regs[inst[0]], inst[1], inst[2]);
//     }
//
//     max = Math.max(max, ...Object.values(regs));
//
//   });
//   console.log(max);
// });

function incOrDec(reg, op, amount) {
  if (op === 'inc') {
    reg += amount;
  } else if (op === 'dec') {
    reg -= amount;
  }
  return reg;
}

const operators = {
  '==': (a,b) => {
    return a == b;
  },
  '!=': (a,b) => {
    return a != b;
  },
  '>': (a,b) => {
    return a > b;
  },
  '>=': (a,b) => {
    return a >= b;
  },
  '<': (a,b) => {
    return a < b;
  },
  '<=': (a,b) => {
    return a <= b;
  }
};