export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function draw(player) {
  return {
    type: 'DRAW',
    drawer: player
  };
}

export function addPlayers(players) {
  return {
    type: 'ADD_PLAYERS',
    players: players
  }
}
