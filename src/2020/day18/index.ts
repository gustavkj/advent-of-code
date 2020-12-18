const operators = ['+', '*'];

function operate(operator: string, num1: number, num2: number): number {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '*':
      return num1 * num2;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

export function calc1(mathString: string): number {
  try {
    const chars = mathString.replace(/\s/g, '').split('');

    const opStore: string[] = [];
    const numberStore: number[] = [];
    let i = 0;

    while (i < chars.length) {
      const char = chars[i];

      if ([...operators, '('].includes(char)) {
        opStore.push(char);
      } else if (char === ')') {
        opStore.pop();

        const lastOp = opStore.pop();

        const lastNum = numberStore.pop();
        const secondToLastNum = numberStore.pop();

        if (
          lastOp !== undefined &&
          operators.includes(lastOp) &&
          lastNum !== undefined &&
          secondToLastNum !== undefined
        ) {
          numberStore.push(operate(lastOp, secondToLastNum, lastNum));
        } else {
          if (lastOp !== undefined) {
            opStore.push(lastOp);
          }
          if (secondToLastNum !== undefined) {
            numberStore.push(secondToLastNum);
          }
          if (lastNum !== undefined) {
            numberStore.push(lastNum);
          }
        }
      } else if (Number.isFinite(Number(char))) {
        let numString = char;
        let j = i + 1;

        while (Number.isFinite(Number(chars[j]))) {
          numString += chars[j];
          j += 1;
        }
        const num = Number(numString);
        const lastOp = opStore.pop();

        if (lastOp && operators.includes(lastOp)) {
          const lastNum = numberStore.pop();

          if (lastNum === undefined) {
            throw new Error(`lastNum is not defined`);
          }

          numberStore.push(operate(lastOp, lastNum, num));
        } else {
          if (lastOp !== undefined) {
            opStore.push(lastOp);
          }

          numberStore.push(num);
        }

        i += j - i - 1;
      }

      i += 1;
    }

    const [result] = numberStore;

    return result;
  } catch (error) {
    console.log(mathString);

    throw error;
  }
}

export function calc2(mathString: string): number {
  const chars = mathString.split(' ').flatMap((value) => {
    // This is to split numbers from parenteses, e.g. '((22'
    const match = /([^\d]*)(\d+)([^\d]*)/.exec(value);

    if (match === null) {
      return value;
    }
    const [, before, number, after] = match;
    const output: string[] = [];

    if (before.length > 0) {
      output.push(...before.split(''));
    }

    output.push(number);

    if (after.length > 0) {
      output.push(...after.split(''));
    }
    return output;
  });

  while (chars.includes('(')) {
    const parenIndex = chars.indexOf('(');
    let i = parenIndex;

    const parenContent: string[] = [];
    let openParens = 0;

    do {
      if (chars[i] === '(') {
        openParens += 1;
      } else if (chars[i] === ')') {
        openParens -= 1;
      }
      parenContent.push(chars[i]);

      i += 1;
    } while (openParens > 0);

    chars.splice(parenIndex, i - parenIndex, calc2(parenContent.slice(1, -1).join(' ')).toString());
  }

  while (chars.includes('+')) {
    const plusIndex = chars.indexOf('+');

    const left = chars[plusIndex - 1];
    const right = chars[plusIndex + 1];

    chars.splice(plusIndex - 1, 3, (Number(left) + Number(right)).toString());
  }

  while (chars.includes('*')) {
    const multiplyIndex = chars.indexOf('*');

    const left = chars[multiplyIndex - 1];
    const right = chars[multiplyIndex + 1];

    chars.splice(multiplyIndex - 1, 3, (Number(left) * Number(right)).toString());
  }

  const [result] = chars;

  return Number(result);
}

export function part1(input: string): number {
  // 29839238838303
  return input
    .split('\n')
    .map(calc1)
    .reduce((sum, value) => sum + value);
}

export function part2(input: string): number {
  // 201376568795521
  return input
    .split('\n')
    .map(calc2)
    .reduce((sum, value) => sum + value);
}
