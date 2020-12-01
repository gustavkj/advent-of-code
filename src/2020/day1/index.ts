function toExpenses(input: string): number[] {
  return input.split('\n').map(Number);
}

export function part1(input: string): number {
  const expenses = toExpenses(input);
  const expensesSet = new Set(expenses);

  let product = 0;

  expenses.some((expense) => {
    const numberOfInterest = 2020 - expense;

    if (expensesSet.has(numberOfInterest)) {
      product = expense * numberOfInterest;
      return true;
    }

    return false;
  });

  return product; // 1016964
}

export function part2(input: string): number {
  const expenses = toExpenses(input);
  const expensesSet = new Set(expenses);

  let product = 0;

  expenses.some((expense1, i) => {
    return expenses.slice(i + 1).some((expense2) => {
      const numberOfInterest = 2020 - expense1 - expense2;

      if (numberOfInterest < 0) {
        return false;
      }

      if (expensesSet.has(numberOfInterest)) {
        product = expense1 * expense2 * numberOfInterest;
        return true;
      }

      return false;
    });
  });

  return product; // 182588480
}
