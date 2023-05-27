const $awaitfavNum= $("#await-fav")
const $awaitnumList= $("#await-num-list")
const $awaitfavList= $("#await-fav-list")

const $promfavNum= $("#prom-fav")
const $promnumList= $("#prom-num-list")
const $promfavList= $("#prom-fav-list")

//**************USES AWAIT/ASYNC *********************/

//Requires a number, returns promised data
async function a_fav_num(num=42){
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
async function a_num_list(numList=[1,2,3]){
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
async function a_fav_list(num=42, amount=4){
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

async function a_displayFact(target,func,arg1,arg2){
    result = await func(arg1,arg2)
    if ("string"===typeof(result)){
        target.append($("<li>").text(result))
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


a_displayFact($awaitfavNum,a_fav_num) 
a_displayFact($awaitnumList,a_num_list) 
a_displayFact($awaitfavList,a_fav_list) 


//**************USES PROMISES *********************/

function p_displayFact(target, val){
    result = val
    if ("string"===typeof(result)){
        target.append($("<li>").text(result))
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


function p_fav_num(num=42){
    let url = `http://numbersapi.com/${num}`;
    let headers =  {'Content-Type': 'application/json'}
    axios.get(url, {
        params: {headers: headers}
    })
    .then(res=>{
        val = res.data
        p_displayFact($promfavNum,val) 
    })
    .catch(err => {
        console.log(`Problem Occurred: ${err}`)
    })
}

function p_num_list(numList=[1,2,3]){
    numList = numList.toString();
    let resList = []
    let url = `http://numbersapi.com/${numList}?json`;
    let headers =  {'Content-Type': 'application/json'}
    axios.get(url, {
        params: {
          headers: headers
        }
    })
    .then(res => {
        for (key in res.data){
            object = {data:res.data[key]}
            resList.push(object)
        }
        p_displayFact($promnumList,resList) 
    })
    .catch(err =>{
        console.log(err)
    })
}

function p_fav_list(num=42, amount=4){
    let url = `http://numbersapi.com/${num}`;
    let headers =  {'Content-Type': 'application/json'};
    let promList = [];

    for (let i = 0; i < amount; i++) {
        promList.push(axios.get(url,{
            params: {
            headers: headers}
        })
    )}
    
    Promise.all(promList)
    .then(promList =>{
        p_displayFact($promfavList,promList)
    })
    .catch(err =>{
        console.log(err)
    })
     
}



p_fav_num()
p_num_list()
p_fav_list()








