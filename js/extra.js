// 1. let user be able to select 1 of 5 options
document.querySelector('#rock').addEventListener('click', getPlayerHand)
document.querySelector('#paper').addEventListener('click', getPlayerHand)
document.querySelector('#scissors').addEventListener('click', getPlayerHand)
// document.querySelector('#lizard').addEventListener('click', getPlayerHand)
// document.querySelector('#spock').addEventListener('click', getPlayerHand)

// get player's hand

function rockHand() {
  // get player hand
  let playerHand = 'rock'
  // get bot hand
  let botHand = randomize()
  // compare the winners
  checkWin(botHand, playerHand)

  // rock === rock && rock > scissors
}

function paperHand() {
  // get player hand
  let playerHand = 'paper'
  // get bot hand
  let botHand = randomize()
  // compare the winners
  checkWin(botHand, playerHand)

  //  paper > rock && paper < scissors
}

function scissorsHand() {
  // get player hand
  let playerHand = 'scissors'
  // get bot hand
  let botHand = randomize()
  // compare the winners
  checkWin(botHand, playerHand)

  //  scissors > paper && scissors < rock
}

function randomize(botHand) {
  let botRandom = Math.random()

  if (botRandom < 0.333) {
    botHand = 'rock'
  }
  else if (botRandom < 0.666) {
    botHand = 'paper'
  }
  else if (botRandom < 0.999) {
    botHand = 'scissors'
  }
  return botHand
}

function checkWinner(botHand, playerHand) {
  if (botHand === playerHand) {
    alert(`It's a tie!`)
  }
  else if (botHand === 'rock' && playerHand === 'paper' || botHand === 'paper' && playerHand === 'scissors' || botHand === 'scissors' && playerHand === 'rock') {
    console.log('player wins')
  }
  else {
    console.log('bot wins')
  }
}


// 2. have an opposing bot choose one of the 5 options when clicked

// 3. bot options are randomized

// 4. Return an answer to the player

// 5. when answer is recieved, the selection is compared

// 6. winner is chosen based on conditions

// 7. alert the winner & 

// 8. console log the winner

// 9. write server functions