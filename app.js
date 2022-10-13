// Getting HTML IDs to manipulate the DOM with Javascript
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//API quotes will be added on this empty array
let apiQuotes = []; 

// Show the loader if there's no generated quotes or if there's connection issues
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide the loader if API is working
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show one random quote at a time
function newQuote() {
    showLoadingSpinner();
    // Pick one random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with the word 'Unknown'
    if (!quote.author) {
        authorText.textContent = `- ${Unknown}`;
    } else {
        authorText.textContent = quote.author;
    }
    // Check the Quote length to determine the font size of the quotes
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set/show the quotes on our page and hide the Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotesFromApi() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    //attempt to complete a fetch request.
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //this function will get one random quote at a time
        newQuote();
    } catch (error) {
        //catch error here if the fetch requests failed
    }
}
// Function to share quotes on Twitter
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners for our buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotesFromApi();
