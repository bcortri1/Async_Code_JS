var currdeckId ="new"
$cardBtn = $("#card-btn")
$cardImg = $("#card")

async function draw_card(deckId=currdeckId){
    let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    res = await axios.get(url)
    try{
        suit = res.data.cards[0].suit
        val = res.data.cards[0].value
        img = res.data.cards[0].image
        console.log(`${val} OF ${suit}`)
        
        currdeckId = res.data.deck_id
        return {"suit":suit, "img":img, "val":val }
    }
    catch{
        console.log(res.data.error)
        return res
    }
}

$cardBtn.on("click", async function(){
    res = await draw_card()
    suit = res.suit
    val = res.val
    img = res.img
    $cardImg.attr("src",img)
    $cardImg.attr("alt",`${val} OF ${suit}`)
})