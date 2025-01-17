const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition;
recognition.interimResults = true; // Allows for real-time recognition

let p = document.createElement('p');
recognition.addEventListener('result', (e) => {

    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(''); // Combines text between confidence levels found in the recognition

    p.innerText = text;
    texts.appendChild(p); // Adds the recognized text to the screen

    if(e.results[0].isFinal) {
        if(text.includes('hello')) { // Replies
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'Hi';
            texts.appendChild(p);
        }
        if(text.includes('what is your name') || text.includes("what's your name")) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'My name is Matthew, Yours?';
            texts.appendChild(p);
        }
        if(text.includes('open YouTube channel')) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'Opening your channel...';
            texts.appendChild(p);
            window.open('https://youtube.com/@matthewjhan')
        }
        if(text.includes('what is this') || text.includes("what's this")) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'This is a speech recognition program using the Web Speech API. You can check the specifics on my github!';
            texts.appendChild(p);
            window.open('https://github.com/matthewjaeyounghan');
        }
        if(text.includes('understand')) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = 'Try saying some keywords to unlock new text!';
            texts.appendChild(p);
        }
        if(text.includes('what is the answer to life') || text.includes("what's the answer to life")) {
            p = document.createElement('p');
            p.classList.add('reply');
            p.innerText = '42';
            texts.appendChild(p);
        }
        p = document.createElement('p'); // Creates a new bubble for each new session
    }

    console.log(e);
})

recognition.addEventListener('end', () => { // Once a listening session ends, start a new one
    recognition.start();
})

recognition.start(); // Initial start