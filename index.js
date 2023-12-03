// Find Search Term function
//
// The function accepts a search term and an array of books.
// It prepares a results object to return and runs a nested loop to iterate through each book and its
// content. If there is a match in the search, a result object is created with ISBN, Page, and Line and
// pushed to the results object. Once the iteration is complete the results object is returned and
// logged to the console.
function findSearchTermInBooks(searchTerm, books) {
  const resultsObject = {
    SearchTerm: searchTerm,
    Results: [],
  };

  for (const book of books) {
    for (const page of book.Content) {
      if (page.Text.includes(searchTerm)) {
        const result = {
          ISBN: book.ISBN,
          Page: page.Page,
          Line: page.Line,
        };
        resultsObject.Results.push(result);
      }
    }
  }

  console.log(resultsObject);

  return resultsObject;
}

// DOM Manipulators
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const resultsBody = document.getElementById("results-body");

// Event listener for search button.
// Although it wasn't necessary, I decided to make this a full HTML/CSS/JS app with UI.
// If the search bar is empty, it will alert the user to add in a search parameter and return.
// It will also return if the user has only put in whitespace.
// With a search term added, the findSearchTermInBooks runs and logs the results to the console.
// It also populates the results in the resultsBody element in the HTML document.
searchButton.addEventListener("click", () => {
  if (searchText.value === "") {
    alert("Search bar cannot be empty.");
    return;
  } else if (searchText.value.trim() === "") {
    alert("Search bar can't contain only spaces.");
    return;
  }

  const results = findSearchTermInBooks(searchText.value, booksArr);

  if (results.Results.length == 0) {
    resultsBody.innerHTML = "None";
  } else {
    let textToDisplay = "";
    for (const result of results.Results) {
      textToDisplay += `ISBN: ${result.ISBN}<br>Page: ${result.Page}<br>Line: ${result.Line}<br><br>`;
    }
    resultsBody.innerHTML = textToDisplay;
  }
});

// Array for the books
const booksArr = [
  {
    Title: "Shakespeare's Sonnet #115",
    ISBN: "(ISBN for Book 1)",
    Content: [
      {
        Page: 1,
        Line: 1,
        Text: "Alas tis true I have gone here and there",
      },
      {
        Page: 1,
        Line: 2,
        Text: "and made myself a motley to the view,",
      },
      {
        Page: 1,
        Line: 3,
        Text: "gored mine own thoughts, sold cheap what is most dear,",
      },
    ],
  },
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "(ISBN for Book 2)",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum. The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

// Unit Tests

// Case-Sensitive Unit Tests
findSearchTermInBooks("the", booksArr);
findSearchTermInBooks("The", booksArr);

// Hits/Positive tests:
findSearchTermInBooks("myself", booksArr);

// Misses/Negative Tests:
findSearchTermInBooks("Zootopia", booksArr);

// Full Phrase Test:
findSearchTermInBooks("I asked myself", booksArr);
