(function() {
    'use strict';
    
    const user = prompt('Howyadoin - what\'s ya name?')
    
    const $messageBox = document.querySelector('ul');

    function generateHTML(message) {
        let li = document.createElement('li');
        li.textContent = message.text;   // create some html and inject into the DOM
        $messageBox.appendChild(li);
    }

    /// RETRIEVE MESSAGES FROM API

    fetch('https://tiny-taco-server.herokuapp.com/herdingcats/')
    .then(response => response.json())
    .then(messages => {
        messages.forEach(message => generateHTML(message));
    });


    /// CREATE A NEW MESSAGES AND SAVE IT TO THE DATABASE
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const message = {
            userName: user,
            text: document.querySelector('input').value,
        };

        fetch('https://tiny-taco-server.herokuapp.com/herdingcats/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message),
            })
            .then(response => response.json())
            .then(message => generateHTML(message))
            .catch(error => console.log('Whoopsie...cat got your tongue?', error));        
    });

    
    

    document.querySelector('button').addEventListener('submit', function(event){
        event.preventDefault();

        fetch('https://tiny-taco-server.herokuapp.com/herdingcats/' + target, {
            method: 'DELETE',
            })
            .then(response => {
             if(!response.ok) {
                 throw new Error('Something\'s not right', response.status); 
             }
             console.log('message was deleted');
        
             })
        
    })
    // const $delete = document.querySelector('button');
    // $delete.addEventListener('click', (event) => {
    //     deleteMessage(event.target.id);
    //     console.log(event.target.id);
    //     });
    
    

    


})();