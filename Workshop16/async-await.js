const fetch=require('cross-fetch')

const getData=async()=>{
    url='https://jsonplaceholder.typicode.com/users'
    const response=await fetch(url);
    const data=await response.json();
    console.log(data)

}

getData()