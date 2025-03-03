let deckId = '';

!localStorage.getItem(deckId) ? getDeckID : '';

document.querySelector('.draw').addEventListener('click', drawTwo);

function getDeckID() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res =>  res.json())
    .then(data => {
      console.log('id');
      let deckId = localStorage.setItem('deckId', data.deckId);
      return deckId;
    })
    .catch((err) => {
      console.log(`error ${err}` )
    })
};

function drawTwo(event){
  event.preventDefault()
  console.log('deck')
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res =>  res.json())
  .then(data => {
    document.querySelector('#player1').src = data.cards[0].image;
    document.querySelector('#player2').src = data.cards[1].image;

    let player1card = convertToNum(data.cards[0].value);
    let player2card = convertToNum(data.cards[1].value);

    if(player1card > player2card){
      console.log('Player One Wins!');
    } else if(player2card > player2card){
      console.log('Player Two Wins!');
    } else {
      console.log('This is War!');
    }
  })
  .catch((err) => {
    console.log(`error ${err}` )
  })
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
    return val;
  }
}
