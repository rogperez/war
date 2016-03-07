export function compare(a, b) {
  const aValue = parseInt(a);
  const bValue = parseInt(b);
  
  if (aValue === bValue) {
    return 'draw';
  }

  let winner;
  if (aValue > bValue) {
    winner = a;

    if (bValue === 1)
      winner = b;
  } else {
    winner = b;

    if (aValue === 1)
      winner = a;
  }

  return winner;
}

