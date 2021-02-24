/* 

http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc

*/


fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100')

    .then(res => res.json()) 
    .then(data => {
       console.log(data['data'])
        
       
    })




/*
let characters = data['data']['results'];
      
        console.log(characters)

         console.log(data['data'])
*/