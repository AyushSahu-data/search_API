// public/script.js
async function search() {
  const keyword = document.getElementById("researchTopic").value;
  const limit = 10;

  try {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword, limit }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const results = data.results; // Access the "results" property
      displayResults(results.data); // Pass the results to the displayResults function
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function displayResults(results) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "";

  results.forEach((result, index) => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    resultDiv.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
        `;
    resultDiv.addEventListener("click", async () => {
      // Add logic to display complete content or more details
      // Example: Make an additional request to retrieve complete content
      try {
        const contentResponse = result.abstract; // Replace with the actual URL property from your search result
        console.log(contentResponse);
        displayCompleteContent(contentResponse);
      } catch (error) {
        console.error("Error:", error.message);
      }
    });
    searchResultsDiv.appendChild(resultDiv);
  });
}

function displayCompleteContent(content) {
  const contentDiv = document.getElementById("content");
  contentDiv.style.display = "block"; // Display the content container
  contentDiv.innerHTML = content; // Display the complete content
}
