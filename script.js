const dictionary = {
  "apple": "a round fruit with red or green skin and a crisp or soft flesh",
  "car": "a road vehicle, typically with four wheels, powered by an internal combustion engine",
};

const apiKey = "tFVbM4Dc7oLPev5G1aZHJw==4h7jX6ahDmKDwEXz";
const apiUrl = "https://api.api-ninjas.com/v1/dictionary?word=";

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const wordHeading = document.getElementById("word");
const type = document.getElementById("type");
const definition = document.getElementById("definition");

const wordDisplay = document.getElementById('word');
const definitionDisplay = document.getElementById('definition');

// Get a random word from your dictionary
const randomWord = getRandomWord(dictionary);

// Display the random word and its definition when the page loads
wordDisplay.textContent = `${randomWord}`;
searchWord(randomWord);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the default behavior of form.
  const word = searchInput.value; //get value of seachInput.
  if (word.length > 0) { // checks if the word length is greater than 0.
    searchWord(word); // call searchWord function with word as argument.
  } else {
    showError("Please enter a word."); // show error message if no word entered.
  }
});


function getRandomWord(dictionary) {
  const keys = Object.keys(dictionary); // get an array of keys in dictionary object.
  const randomIndex = Math.floor(Math.random() * keys.length); // generate random index based on length of keys array.
  return keys[randomIndex]; // return a random key from dictionary object.
}

function searchWord(word) {
  // URL for the API request.
  const url = apiUrl + word;

  // make a GET request to API using axios library.
  axios.get(url, {
    headers: {
      "X-Api-Key": apiKey, //include API key as header.
    }
  })
  .then(response => {
    // handle the sucessful response from API.
    const data = response.data;

    // check if response has error.
    if (data.error) {
      showError("Word not found."); //Display the error message if word isn't found.
    } else {
      wordHeading.textContent = word;
      type.textContent = data.type ? `Type: ${data.type}` : "";
      definition.textContent = data.definition;
    }
  })
  .catch(error => {
    // handle errors that occur during the API request.
    console.log(error);
    showError("An error occurred while fetching the data."); // display error message.
  });
}

function showError(errorMessage) {
  wordHeading.textContent = ""; //clear the text content.
  type.textContent = ""; // clear the text content type.
  definition.textContent = errorMessage; //set the text content to error message.
}

