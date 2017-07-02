# Server App Supported Actions

1. `{type: 'NEW'}`
2. `{type: 'ADD_PLAYERS', players: ['Player 1', "Player 2"]}`
3. `{type: 'DRAW', drawer: 'Player 1'}`
4. `{type: 'COMPARE' }`
5. `{type: 'RESOLVE' }`

# State(s) by Action

This is a sequence of a real game being played out.

1. `{ type: 'NEW' }`

```javascript
{
    deck: [ Array[52] ]
}
```

2. `{ type: 'ADD_PLAYERS', players: ['Kanye', 'Kim'] }`

```javascript
{
    playerDecks: {
        Kanye: Arary[26],
        Kim: Array[26]
  }
}
```

3. `{ type: 'DRAW', drawer: 'Kanye' }`

```javascript
{
    match: {
        Kanye: ‘1A'
    },
    playerDecks: {
        Kanye: Array[25],
        Kim: Array[26]
    }
}

```
NOTE: at this point Kanye (player 1) can not draw again since he’s already in the match

## Win/Loss
---------------------------------------------------------------------

4a. `{ type: 'DRAW', drawer: 'Kim' }`

```javascript
{
    match: {
        Kanye: ‘1A’,
        Kim: ‘3H'
    },
    playerDecks: {
        Kanye: Arary[25],
        Kim: Array[25]
    }
}
```

5a. `{ type: 'COMPARE' }`

```javascript
{
     winner: ‘Kim’,
     match: {
          Kanye: ‘1A’,
          Kim: ‘3H'
     },
     playerDecks: {
          Kanye: Array[25],
          Kim: Array[25]
     }
}
```

## Tie!
---------------------------------------------------------------------

Obviously this is more convoluted.

4b. `{ type: 'DRAW', drawer: 'Kim' }`

```javascript
{
     match: {
          Kanye: ‘1A’,
          Kim: ‘1S'
     },
     playerDecks: {
          Kanye: Arary[25],
          Kim: Array[25]
     }
}
```

5b. `{ type: 'COMPARE' }` 
Here we push the match into the draw matches array, as well as begin adding cards into the hidden decks.

```javascript
{
   drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1Sb’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘2H’, ‘6D’, ‘12S’]
     },
     playerDecks: {
          Kanye: Array[22],
          Kim: Array[22]
     }
}
```

6b. `{ type: 'DRAW', drawer: 'Kim' }`

```javascript
{
     match: {
          Kim: ‘3H’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[22],
          Kim: Array[21]
     }
}
```

### Winner (after 1 tie)
---------------------------------------------------------------------

7b. `{ type: 'DRAW', drawer: 'Kanye' }`

```javascript
{
     match: {
          Kanye: ‘2C’,
          Kim: ‘3H’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[21],
          Kim: Array[21]
     }
}
```

8b. `{ type: 'COMPARE' }`

```javascript
{
     winner: ‘Kim’,
     match: {
          Kanye: ‘2C’,
          Kim: ‘3H’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[21],
          Kim: Array[21]
     }
}
```

### YOT (yet other tie)
---------------------------------------------------------------------

9b(i). `{ type: 'DRAW', drawer: 'Kanye' }`

```javascript
{
     match: {
          Kanye: ‘3C’,
          Kim: ‘3H’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[21],
          Kim: Array[21]
     }
}
```

9b(ii). `{ type: 'COMPARE' }` (here we again push the match back into the hidden decks array)

```javascript
{
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ },
          { Kanye: ‘3C’, Kim: ‘3H’ }
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’, ‘3D’, ‘1S’, ‘6C'],
          Kim: [‘7H’, ‘9D’, ‘11C’, ‘3C’, ‘2S’, ‘9S']
     },
     playerDecks: {
          Kanye: Array[18],
          Kim: Array[18]
     }
}
```

## End Game
---------------------------------------------------------------------

9. `{ type: 'DRAW', drawer: 'Kanye' }`

```javascript
{
     match: {
          Kanye: ‘9C’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ },
          { Kanye: ‘3C’, Kim: ‘3H’ },
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[0], // player has run out of cards
          Kim: Array[21]
     }
}
```

10. `{ type: 'DRAW', drawer: 'Kim' }`

```javascript
{
     match: {
          Kanye: ‘9C’,
          Kim: ‘10H’
     },
     drawMatches: [
          { Kanye: ‘1A’, Kim: ‘1A’ },
          { Kanye: ‘3C’, Kim: ‘3H’ },
     ],
     hiddenDecks: {
          Kanye: [‘4H’, ‘2D’, ‘1S’],
          Kim: [‘7H’, ‘9D’, ‘11C’]
     },
     playerDecks: {
          Kanye: Array[0],
          Kim: Array[22]
     }
}
```

11. `{ type: 'COMPARE' }`

```javascript
{
     winner: 'Kim',
     playerDecks: {
          Kanye: Array[0],
          Kim: Array[52]
     }
}
```

11. `{ type: 'RESOLVE' }`

```javascript
{
     victor: 'Kim'
}
```

