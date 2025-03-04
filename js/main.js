document.querySelector('.draw').addEventListener('click', drawTwo);


async function getDeckID() {
  try {
    let res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let data = await res.json();
    return data.deck_id;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

// Calling the function with async/await
async function getDeck() {
  let id = await getDeckID();
  try {
    let res = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

getDeck(); 

async function drawTwo(event){
  event.preventDefault();
  let deck = await getDeck();
  console.log(deck.cards);
    document.querySelector('#player1').src = deck.cards[0].image;
    document.querySelector('#player2').src = deck.cards[1].image;

    console.log(deck.cards[0].value > deck.cards[1].value);
    

    let player1card = convertToNum(deck.cards[0].value);
    let player2card = convertToNum(deck.cards[1].value);

    if(player1card > player2card){
      console.log('Player One Wins!');
    } else if(player2card > player2card){
      console.log('Player Two Wins!');
    } else {
      console.log('This is War!');
    }
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14;
  }
  if(val === 'KING'){
    return 13;
  }
  if(val === 'QUEEN'){
    return 12;
  }
  if(val === 'JACK'){
    return 11;
  } else {
    return Number(val);
  }
}
