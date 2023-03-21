const fetch=require('cross-fetch')

const getData=()=>{
        url='https://jsonplaceholder.typicode.com/users'
        fetch(url)
        .then((response)=>{

            return response.json()
        }).then((data)=>{
            console.log(data)
        })

}

getData()
