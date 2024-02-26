const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const container = document.getElementById("container");
const renderQuotesContainer = document.getElementById("renderQuotes");
const typeQuoteContainer = document.getElementById("typeQuote");
const timerContainer = document.getElementById("timer");
const showTimeConatiner = document.getElementById("showTime");
const nextQuoteButton = document.getElementById("nextQuote");

// Hide the next quote button
nextQuoteButton.style.display = "none";

// Set the initial timer to 0
timerContainer.innerText = 0;

// Set the initial start time to null
let startTime;

// To store the interval id
let intervalId;

// ************ Event listener to check the user input ************
typeQuoteContainer.addEventListener("input", () => {
  // Start the timer when the user starts typing the quote
  if (!startTime && typeQuoteContainer.value.length === 1) {
    startTimer();
  }

  const arrayQuote = renderQuotesContainer.querySelectorAll("span");
  const arrayValue = typeQuoteContainer.value.split("");

  let correct = true; // Check if the user has typed the all correct letter

  arrayQuote.forEach((letterSpan, index) => {
    const letter = arrayValue[index]; // Get the letter index from the input field
    if (letter == null) {
      letterSpan.classList.remove("correct");
      letterSpan.classList.remove("wrong");
      correct = false;
    } else if (letter === letterSpan.innerText) {
      letterSpan.classList.add("correct");
      letterSpan.classList.remove("wrong");
      correct = true;
    } else {
      letterSpan.classList.remove("correct");
      letterSpan.classList.add("wrong");
      correct = false;
    }
  });

  if (correct) {
    // if user correctly typed the quote, show the users the time it took to type the quote
    showTimeConatiner.innerText = `You took ${timerContainer.innerText} seconds to type the quote`;
    // shop the timer and clear the interval
    clearInterval(intervalId);
    nextQuoteButton.style.display = "block";
  }
});

// ************ Event listener to get the next quote ************

nextQuoteButton.addEventListener("click", () => {
  timerContainer.innerText = 0;
  renderNewQuote();
  nextQuoteButton.style.display = "none";
});

// ************ Function to fetch a random quote ************

async function fetchRandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();
  console.log("data", data);
  return data.content;
}

// ************ Function to render a new quote ************

async function renderNewQuote() {
  startTime = null;
  clearInterval(intervalId); // Clear the interval (if any)

  renderQuotesContainer.innerHTML = ""; // Clear the previous quote
  typeQuoteContainer.value = ""; // Clear the text area where time we get a new code
  showTimeConatiner.innerText = ""; // Clear the time taken to type the quote

  const quote = await fetchRandomQuote();
  quote.split("").forEach((letter) => {
    // Split the quote into each letter in an array
    const letterSpan = document.createElement("span"); // Create a span for each letter of the quote
    letterSpan.innerText = letter;
    renderQuotesContainer.appendChild(letterSpan);
  });
}

// ************ Function to start the timer ************

function startTimer() {
  timerContainer.innerText = 0;
  startTime = new Date();
  clearInterval(intervalId); // Clear the interval (if any)
  intervalId = setInterval(() => {
    timerContainer.innerText = updateTimer();
  }, 1000);
}

// ************ Function to update the timer ************

function updateTimer() {
  const currentTime = new Date();
  const timePassed = currentTime - startTime;
  const takenTime = Math.floor(timePassed / 1000);
  return takenTime;
}

// Call the renderNewQuote function to render the first quote
renderNewQuote();
