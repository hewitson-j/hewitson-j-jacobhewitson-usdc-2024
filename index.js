const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
const resultsBody = document.getElementById("results-body");

searchButton.addEventListener("click", () => {
  if (searchText.value === "") {
    alert("Search bar cannot be empty.");
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

function findSearchTermInBooks(searchTerm, books) {
  const resultsObject = {
    SearchTerm: searchTerm,
    Results: [],
  };

  const search = searchTerm.toUpperCase();

  for (const book of books) {
    for (const page of book.Content) {
      const pageText = page.Text.toUpperCase();
      if (pageText.includes(search)) {
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
