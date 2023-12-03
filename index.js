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

// Array for test data
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
const testResult1 = findSearchTermInBooks("the", booksArr); // Case-sensitive lower case
const testResult2 = findSearchTermInBooks("The", booksArr); // Case-sensitive upper case
const testResult3 = findSearchTermInBooks("myself", booksArr); // Positive case
const testResult4 = findSearchTermInBooks("Zootopia", booksArr); // Negative Case
const testResult5 = findSearchTermInBooks("I asked myself", booksArr); //Full Phrase case

const output1 = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "(ISBN for Book 1)",
      Page: 1,
      Line: 1,
    },
    {
      ISBN: "(ISBN for Book 1)",
      Page: 1,
      Line: 2,
    },
    {
      ISBN: "(ISBN for Book 2)",
      Page: 31,
      Line: 9,
    },
  ],
};
const output2 = {
  SearchTerm: "The",
  Results: [
    {
      ISBN: "(ISBN for Book 2)",
      Page: 31,
      Line: 8,
    },
  ],
};
const output3 = {
  SearchTerm: "myself",
  Results: [
    {
      ISBN: "(ISBN for Book 1)",
      Page: 1,
      Line: 2,
    },
    {
      ISBN: "(ISBN for Book 2)",
      Page: 31,
      Line: 10,
    },
  ],
};
const output4 = {
  SearchTerm: "Zootopia",
  Results: [],
};
const output5 = {
  SearchTerm: "I asked myself",
  Results: [
    {
      ISBN: "(ISBN for Book 2)",
      Page: 31,
      Line: 10,
    },
  ],
};

if (JSON.stringify(testResult1) === JSON.stringify(output1)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected: ", output1);
  console.log("Received: ", testResult1);
}

if (JSON.stringify(testResult2) === JSON.stringify(output2)) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected: ", output2);
  console.log("Received: ", testResult2);
}
if (JSON.stringify(testResult3) === JSON.stringify(output3)) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected: ", output3);
  console.log("Received: ", testResult3);
}
if (JSON.stringify(testResult4) === JSON.stringify(output4)) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected: ", output4);
  console.log("Received: ", testResult4);
}
if (JSON.stringify(testResult5) === JSON.stringify(output5)) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected: ", output5);
  console.log("Received: ", testResult5);
}
