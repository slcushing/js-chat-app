(function() {
    'use strict';

    const messageBox = document.querySelector('ul');
    const messageForm = document.querySelector('form');
    let user = localStorage.getItem('user');
    
    if(!user) {
        user = prompt('Howyadoin - what\'s ya name?');
        localStorage.setItem('user', user);
    }

    // if you want to have a "logout button"
    // fire a function that calls localStorage.removeItem('user'); 


    function generateHTML(message) {
        let messageHTML = `
            <li>
                <p>${message.text}</p>
                <button data-id="${message.id}">Delete Me</button>
            </li>
        `
        return messageHTML;
    }
    
    function fetchMessages() {
        /// RETRIEVE MESSAGES FROM API
        fetch('https://tiny-taco-server.herokuapp.com/herdingcats/')
        .then(response => response.json())
        .then(messages => {
            let html = "";
            for(let i = 0; i < messages.length; i++) {
                html += generateHTML(messages[i]);
            }
            messageBox.innerHTML = html;
        });
    }

    fetchMessages();
    setInterval(fetchMessages, 3000);

    function addMessage(event) {
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
        .then(message => {
            const messageHTML = generateHTML(message);
            messageBox.insertAdjacentHTML('beforeend', messageHTML);
            messageForm.reset();
        })
        .catch(error => console.log('Whoopsie...cat got your tongue?', error));   
    }

    messageForm.addEventListener('submit', addMessage);
    



    function deleteMessage(event) {
        const id = event.target.dataset.id;
        
        fetch(`https://tiny-taco-server.herokuapp.com/herdingcats/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Something\'s not right', response.status); 
            }
            event.target.parentNode.remove();
        });
    }

    messageBox.addEventListener('click', deleteMessage);
    

})();