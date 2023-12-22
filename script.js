const alphabetQuestions = [
    { letter: 'A', question: 'Where is the letter "A"?' },
    { letter: 'B', question: 'Where is the letter "B"?' },
    { letter: 'C', question: 'Where is the letter "C"?' },
    { letter: 'D', question: 'Where is the letter "D"?' },
    { letter: 'E', question: 'Where is the letter "E"?' },
    { letter: 'F', question: 'Where is the letter "F"?' },
    { letter: 'G', question: 'Where is the letter "G"?' },
    { letter: 'H', question: 'Where is the letter "H"?' },
    { letter: 'I', question: 'Where is the letter "I"?' },
    { letter: 'J', question: 'Where is the letter "J"?' },
    { letter: 'K', question: 'Where is the letter "K"?' },
    { letter: 'L', question: 'Where is the letter "L"?' },
    { letter: 'M', question: 'Where is the letter "M"?' },
    { letter: 'N', question: 'Where is the letter "N"?' },
    { letter: 'O', question: 'Where is the letter "O"?' },
    { letter: 'P', question: 'Where is the letter "P"?' },
    { letter: 'Q', question: 'Where is the letter "Q"?' },
    { letter: 'R', question: 'Where is the letter "R"?' },
    { letter: 'S', question: 'Where is the letter "S"?' },
    { letter: 'T', question: 'Where is the letter "T"?' },
    { letter: 'U', question: 'Where is the letter "U"?' },
    { letter: 'V', question: 'Where is the letter "V"?' },
    { letter: 'W', question: 'Where is the letter "W"?' },
    { letter: 'X', question: 'Where is the letter "X"?' },
    { letter: 'Y', question: 'Where is the letter "Y"?' },
    { letter: 'Z', question: 'Where is the letter "Z"?' }
];

let currentQuestionIndex = 0;
let shuffledQuestions = shuffleQuestions(alphabetQuestions); // Randomly shuffle the questions

function shuffleQuestions(questions) {
    return [...questions].sort(() => Math.random() - 0.5);
}

function displayNextQuestion() {
    const questionText = shuffledQuestions[currentQuestionIndex].question;
    document.getElementById('question').innerText = questionText;
    speak(questionText); // Read out the question
}
function speak(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    // Speak the text
    window.speechSynthesis.speak(speech);
}

function checkLetter(letter) {
    if (letter === shuffledQuestions[currentQuestionIndex].letter) {
        alert(`Congratulations! You found the letter ${letter}!`);
        removeElement(letter);
        changeQuestion();
    } else {
        speak('Try again!'); // Speak "Try again!" for wrong answers
        alert('Try again!');
    }
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    // Speak the text
    window.speechSynthesis.speak(speech);
}

function removeElement(element) {
    const correctLetter = shuffledQuestions[currentQuestionIndex].letter.toLowerCase();
    if (element.toLowerCase() === correctLetter) {
        const foundLetter = document.querySelector(`.letter.${correctLetter}`);
        if (foundLetter && !foundLetter.classList.contains('found')) {
            foundLetter.classList.add('found');
            foundLetter.style.display = 'none'; // Hide the found letter
        }
    }
}


function changeQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayNextQuestion();
    } else {
        setTimeout(() => {
            alert('Congratulations! You found all the letters!');
        }, 2000); // Adjust the delay time as needed (2000 milliseconds = 2 seconds)
        clearLetters();
        // Handle game completion, maybe reset or redirect to a new page
    }
}

function clearLetters() {
    const lettersContainer = document.querySelector('.letters');
    lettersContainer.innerHTML = ''; // Clear all letters from the container
}


// Dynamically creating alphabet letters
const alphabetContainer = document.querySelector('.letters');
for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const letterDiv = document.createElement('div');
    letterDiv.className = `letter ${letter.toLowerCase()}`;
    letterDiv.setAttribute('onclick', `checkLetter('${letter}')`);
    letterDiv.textContent = letter;
    alphabetContainer.appendChild(letterDiv);
}

// Display the first question
displayNextQuestion();
