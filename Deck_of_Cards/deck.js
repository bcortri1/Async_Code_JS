var currdeckId ="new"
$awaitBtn = $("#await-btn")
$promiseBtn = $("#promise-btn")
$cardImg = $("#card")

//Async/Await version
async function async_draw_card(deckId=currdeckId){
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

function displayCard(suit="",val="",img=""){
    $cardImg.attr("src",img);
    $cardImg.attr("alt",`${val} OF ${suit}`);
}

$awaitBtn.on("click", async function(){
    res = await async_draw_card()
    displayCard(suit,val,img)
})

//Promise version
$promiseBtn.on("click", function(){
    let deckId=currdeckId
    let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    let suit = ""
    let val = ""
    let img = ""

    axios.get(url)
    .then(res =>{
        try{
            suit = res.data.cards[0].suit
            val = res.data.cards[0].value
            img = res.data.cards[0].image
            console.log(`${val} OF ${suit}`)
            currdeckId = res.data.deck_id
            displayCard(suit,val,img)
        }
        catch{
            console.log(res.data.error)
        }
    })
    .catch(res => {
        console.log(res)
    })
})