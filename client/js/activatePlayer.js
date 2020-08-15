// Activating the next player
function activatePlayer(game){
    const playerDiv = document.querySelectorAll('.PlayerDiv')
    playerDiv.forEach((player) => {
        const playerName = player.getElementsByTagName('h1')[0].textContent // Variable to store name of the current player
        if (playerName === 'Player ' + game.turn) { // Checking if it is the current player or not  
            const activate = player.querySelectorAll('.Card')
            const buttonactive = player.querySelector('.buttons')
            activate.forEach((Card) => {
            Card.setAttribute('style', 'pointer-events:auto') // Activating all Cards for current player
            })
            buttonactive.disabled = false // Activating the button for current player
        }
    })
    game.turn += 1 // Adding 1 to turn
}