function getDecks(input: string) {
  return input.split('\n\n').map((playerData) => playerData.split('\n').slice(1).map(Number));
}

function countTheScore(deck: number[]) {
  return deck.reverse().reduce((sum, card, index) => sum + card * (index + 1), 0);
}

function cardShouldBeIgnored(card: number) {
  return card === -1;
}

function getPlayedCardsForDeck(playedCards: number[], winner: number) {
  return [...playedCards.slice(winner), ...playedCards.slice(0, winner)].filter(
    (card) => !cardShouldBeIgnored(card),
  );
}

function getRoundWinner(playedCards: number[]) {
  const winningCard = Math.max(...playedCards);
  return playedCards.findIndex((card) => card === winningCard);
}

function getGameWinner(decks: number[][]) {
  return decks.findIndex((deck) => deck.length > 0);
}

function hasCardsToPlay(decks: number[][]) {
  return decks.filter((deck) => deck.length > 0).length > 1;
}

function shouldPlaySubGame(decks: number[][], playedCards: number[]) {
  return decks.every(
    (deck, index) => cardShouldBeIgnored(playedCards[index]) || deck.length >= playedCards[index],
  );
}

function getDeckCopyForSubGame(decks: number[][], playedCards: number[]) {
  return [...decks.map((deck, index) => [...deck.slice(0, playedCards[index])])];
}

function drawCards(decks: number[][]) {
  return decks.map((deck) => deck.shift() ?? -1);
}

function getDeckKey(decks: number[][]) {
  return decks.map((deck) => deck.join()).join(':');
}

function playCombat(decks: number[][]) {
  while (hasCardsToPlay(decks)) {
    const playedCards = drawCards(decks);
    const roundWinner = getRoundWinner(playedCards);

    decks[roundWinner].push(...getPlayedCardsForDeck(playedCards, roundWinner));
  }

  const winner = getGameWinner(decks);

  return countTheScore(decks[winner]);
}

/**
 * Recursive Combat that works for two players or more.
 * @param decks playing cards grouped by player
 * @param returnWinner if the winner index should be returned or not
 */
function playRecursiveCombat(decks: number[][], returnWinner = false) {
  const handsPlayed = new Set<string>();
  let winner: number | undefined;

  while (hasCardsToPlay(decks)) {
    const deckKey = getDeckKey(decks);
    if (handsPlayed.has(deckKey)) {
      // Player 1 (or 0 in code) wins in case of infinite loops
      winner = 0;
      break;
    }
    handsPlayed.add(deckKey);

    const playedCards = drawCards(decks);

    let roundWinner: number;
    if (shouldPlaySubGame(decks, playedCards)) {
      roundWinner = playRecursiveCombat(getDeckCopyForSubGame(decks, playedCards), true);
    } else {
      roundWinner = getRoundWinner(playedCards);
    }

    decks[roundWinner].push(...getPlayedCardsForDeck(playedCards, roundWinner));
  }

  if (winner === undefined) {
    winner = getGameWinner(decks);
  }

  if (returnWinner) {
    return winner;
  }
  return countTheScore(decks[winner]);
}

export function part1(input: string): number {
  const decks = getDecks(input);

  // 35370
  return playCombat(decks);
}

export function part2(input: string): number {
  const decks = getDecks(input);

  // 36246
  return playRecursiveCombat(decks);
}
