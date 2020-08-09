/* eslint-disable no-unused-vars */
/*
     * Render one card at a time with a Parent newCard div and child cardSuit and cardValue
     * newCard is a child element of #root
     * all divs are assigned their class names for styling reference
     */
function renderDeck (name, deck) {
  const playerCards = document.createElement('div') // Separate parent div to store cards of individual players
  playerCards.className = 'PlayerDiv'
  const playerName = document.createElement('h1') // Seperate element to display the name of the player
  playerName.textContent = name
  playerCards.appendChild(playerName)
  deck.forEach((card) => {
    const newCard = document.createElement('div')
    const cardValue = document.createElement('div')
    const cardSuit = document.createElement('div')
    if (card.value !== 'Joker') {
      cardSuit.innerHTML = '&' + card.suit + ';' // Making use of HTML codes for symbols eg. hearts= &hearts;
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    } else {
      cardSuit.innerHTML = '&#9884;' // Weird Lily-like suit-symbol for Joker
      cardValue.innerHTML = card.value
      cardSuit.className = card.suit
    }
    newCard.className = 'Card'
    cardValue.className = 'cardRank'
    newCard.id = card.id  // Adding an id to each div representing the card
    newCard.appendChild(cardValue)
    newCard.appendChild(cardSuit)
    playerCards.appendChild(newCard)
  })
  document.getElementById('root').appendChild(playerCards)
}
