(function(){
    'use strict';

    fetch('https://tiny-taco-server.herokuapp.com/herdingcats/')
    .then(response => response.json())
    .then(data => console.log(data))


    // const username = {
    //     text: 'Stephanie',
    // }
    
    // fetch('https://tiny-taco-server.herokuapp.com/herdingcats/', {
    //     method:'POST',
    //     body: JSON.stringify(username),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log('Error', error))
        
    

















})