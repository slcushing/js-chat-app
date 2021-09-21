(function() {
    'use strict';

    const $messageBox = document.querySelector('ul');

    function generateHTML(message) {
        let li = document.createElement('li');
        li.textContent = message.text;   // create some html and inject into the DOM
        $messageBox.appendChild(li);
    }

    /// RETRIEVE MESSAGES FROM API

    fetch('https://tiny-taco-server.herokuapp.com/herdcats/')
    .then(response => response.json())
    .then(messages => {
        messages.forEach(message => generateHTML(message));
    });


    /// CREATE A NEW MESSAGES AND SAVE IT TO THE DATABASE


    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        const message = {
            username: 'Stephanie',
            text: document.querySelector('input').value,
        };

        fetch('https://tiny-taco-server.herokuapp.com/herdcats/', {
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

})();