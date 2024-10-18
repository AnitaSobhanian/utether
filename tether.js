


(async () => {

    let res = await fetch("https://api.tetherland.com/currencies")
    let data = await res.json()
    console.log(JSON.stringify(data, null, 2))


})()