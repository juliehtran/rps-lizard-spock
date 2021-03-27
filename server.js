// http allows us to receive and respond to http requests
//   which is the job of a server
const http = require('http')

// fs (FileSystem) allows us to read a file from the disk
//   we need this because we need to send files back to the client
const fs = require('fs')

const server = http.createServer((request, response) => {
    console.log(request.url)

    if (request.url.includes(`choose`)) {
        // url looks like this:                 /choose?choice=scissors
        // we want the part that says           scissors
        const playerChoice = request.url.slice(15)
        const botChoice = getBotChoice()

        const result = determineWinner(playerChoice, botChoice)
        const objectToRender = { result: result, botChoice: botChoice }
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(objectToRender))
        response.end()
    }
    else if (request.url === `/`) {
        fs.readFile('index.html', (err, file) => {
            if (err) {
                console.log(err)
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' })
                response.write(file)
                response.end()
            }
        })
    } else {
        // request URL comes out like this:                      /css/style.css
        // however, the path in our project is like this:         css/style.css
        // so we substring to slice off the 0th character, the leading slash /, until the end
        fs.readFile(request.url.slice(1), (err, file) => {
            if (err) {
                console.log(err)
            } else {
                response.writeHead(200)
                response.write(file)
                response.end()
            }
        })
    }
})

server.listen(3000)
console.log(`listening on 3000`)

// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // THIS IS STUFF ONLY FOR RockPaperScissorsLizardSpock! everything above here is a standard server

// utility functions
function getBotChoice() {
    // define the options
    const options = ["rock", "paper", "scissors", "lizard", "spock"]
    // get a random number which corresponds to an option
    const randomIndex = Math.floor(Math.random() * options.length)

    // get the random option
    return options[randomIndex]
}

function determineWinner(playerChoice, botChoice) {
    // we look up in our mapping the moves which our move (playerChoice) can beat
    //   as in, we get the bot moves which would cause us to win
    //   or, the winningBotMoves
    const winningBotMoves = opposingHands[playerChoice]
    // three possible results:
    // win, lose, tie
    if (playerChoice === botChoice) {
        return "tie"
    } else if (winningBotMoves.includes(botChoice)) {
        return "win"
    } else {
        return "lose"
    }
}

const opposingHands = {
    // rock BEATS lizard and scissors
    // as in, if we pick rock, then we know that lizard and scissors cause us to win
    rock: [`lizard`, `scissors`],
    paper: [`rock`, `spock`],
    scissors: [`paper`, `lizard`],
    lizard: [`spock`, `paper`],
    spock: [`rock`, `scissors`]
}
