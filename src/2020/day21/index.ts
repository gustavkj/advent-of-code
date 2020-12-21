function parseInput(input: string) {
  const productList = input.split('\n').map((line) => {
    const match = /(.+?)\s\(contains\s(.+?)\)/.exec(line);

    if (!match) {
      throw new Error(`Couldn't match line: ${line}`);
    }

    const ingredients = match[1].split(' ');
    const allergens = match[2].split(', ');

    return { ingredients, allergens };
  });

  const allergensByIngredient = new Map<string, Record<string, number>>();

  productList.forEach(({ ingredients, allergens }) => {
    allergens.forEach((allergen) => {
      const ingredientOccurrences = allergensByIngredient.get(allergen) ?? {};

      ingredients.forEach((ingredient) => {
        ingredientOccurrences[ingredient] = (ingredientOccurrences[ingredient] ?? 0) + 1;
      });

      allergensByIngredient.set(allergen, ingredientOccurrences);
    });
  });

  const ingredientsAttributedAllergens = new Set<string>();
  const ingredientsByAllergens = new Map<string, string>();
  const numberOfAllergens = allergensByIngredient.size;
  let iterations = 0;

  while (ingredientsAttributedAllergens.size < numberOfAllergens) {
    allergensByIngredient.forEach((ingredients, allergen) => {
      const max = Math.max(...Object.values(ingredients));

      const mostOccurrentIngredients = Object.entries(ingredients)
        .filter(([, occurrences]) => occurrences === max)
        .filter(([ingredient]) => !ingredientsAttributedAllergens.has(ingredient))
        .map(([ingredient]) => ingredient);

      if (mostOccurrentIngredients.length === 1) {
        allergensByIngredient.delete(allergen);
        ingredientsAttributedAllergens.add(mostOccurrentIngredients[0]);
        ingredientsByAllergens.set(allergen, mostOccurrentIngredients[0]);
      }
    });

    if (iterations > 10) {
      throw new Error('Stopping loop');
    }

    iterations += 1;
  }

  return { productList, ingredientsAttributedAllergens, ingredientsByAllergens };
}

export function part1(input: string): number {
  const { productList, ingredientsAttributedAllergens } = parseInput(input);

  const ingredientsWithoutAllergens = productList
    .flatMap((product) => product.ingredients)
    .filter((ingredient) => !ingredientsAttributedAllergens.has(ingredient));

  // 2786
  return ingredientsWithoutAllergens.length;
}

export function part2(input: string): string {
  const { ingredientsByAllergens } = parseInput(input);

  const ingredientList = [...ingredientsByAllergens.entries()]
    .sort(([allergenA], [allergenB]) => (allergenA < allergenB ? -1 : 1))
    .map(([, ingredient]) => ingredient)
    .join(',');

  // prxmdlz,ncjv,knprxg,lxjtns,vzzz,clg,cxfz,qdfpq
  return ingredientList;
}
