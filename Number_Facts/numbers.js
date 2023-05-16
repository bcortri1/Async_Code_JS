const $favNum= $("#fav")
const $numList= $("#num-list")
const $favList= $("#fav-list")



//Requires a number, returns promised data
async function get_fav_num(num=42){
    let url = `http://numbersapi.com/${num}`;
    let headers =  {'Content-Type': 'application/json'}
    res = await axios.get(url, {
        params: {
          headers: headers
        }
      })
    return res.data
}

//Requires a list/array of nums
async function get_num_list(numList=[1,2,3]){
    numList = numList.toString();
    let resList = []
    let url = `http://numbersapi.com/${numList}?json`;
    let headers =  {'Content-Type': 'application/json'}
    let res = await axios.get(url, {
        params: {
          headers: headers
        }
      })
      for (key in res.data){
        object = {data:res.data[key]}
        resList.push(object)
      }
    return resList
}

//Requires a number and amount of facts
async function get_fav_list(num=42, amount=4){
    let url = `http://numbersapi.com/${num}`;
    let headers =  {'Content-Type': 'application/json'};
    let promList = [];

    for (let i = 0; i < amount; i++) {
        promList.push(axios.get(url,{
            params: {
            headers: headers}
        })
    )}
    
    return await Promise.all(promList)
}

async function displayFact(target,func,arg1,arg2){
    result = await func(arg1,arg2)
    if ("string"===typeof(result)){
        target.text(result)
    }
    else if ("object"===typeof(result)){
        result.forEach(val => {
            target.append($("<li>").text(val.data))
        })
    }

    else {
        target.text("Error")
    }

}


displayFact($favNum,get_fav_num) 
displayFact($numList,get_num_list) 
displayFact($favList,get_fav_list) 