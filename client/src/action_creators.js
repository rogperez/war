export function setState(state) {
  return {
    meta: { remote: false },
    type: 'SET_STATE',
    state
  };
}

export function draw(drawer) {
  return {
    meta: { remote: true },
    type: 'DRAW',
    drawer
  };
}

export function addPlayers(players) {
  return {
    meta: { remote: true },
    type: 'ADD_PLAYERS',
    players
  }
}

export function reset() {
  return {
    meta: { remote: true },
    type: 'RESET'
  }
}

export function compare() {
  return {
    meta: { remote: true },
    type: 'COMPARE'
  }
}

export function resolve() {
  return {
    meta: { remote: true },
    type: 'RESOLVE'
  }
}
