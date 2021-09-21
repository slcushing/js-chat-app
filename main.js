(function() {
    'use strict';

    function generateHTML(message) {
        // create some html and inject into the DOM
        console.log('message', message);
    }

    /// RETRIEVE MESSAGES FROM API

    fetch('https://tiny-taco-server.herokuapp.com/herdingcats/')
    .then(response => response.json())
    .then(messages => {
        messages.forEach(message => generateHTML(message));
    });


    /// CREATE A NEW MESSAGES AND SAVE IT TO THE DATABASE

    const message = {
        username: 'Stephanie',
        text: document.querySelector('input').value,
    }

    fetch('https://tiny-taco-server.herokuapp.com/herdingcats/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
        })
        .then(response => response.json())
        .then(message => generateHTML(message))
        .catch(error => console.log('Whoopsie...cat got your tongue?', error))
    

   
    
    // const message = {
        
    // }

  








})();