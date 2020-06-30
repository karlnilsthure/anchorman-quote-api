const randomQuoteBtn = document.getElementById("random-quote");
randomQuoteBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/api/quotes/random/")
    .then((res) => res.json())
    .then((data) => {
      const element = document.getElementById("container");
      element.innerHTML = "";

      data.quote.data.forEach((row) => {
        let node = document.createElement("div");
        node.innerHTML = `
            <div>
              <h2>${row.name}</h2>  
              <p>${row.text}</p>  
            </div>
          `;
        element.appendChild(node);
      });
    });
});

const allQuotesBtn = document.getElementById("all-quotes");
allQuotesBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/api/quotes")
    .then((res) => res.json())
    .then((data) => console.log(data));
});

const allCharactersBtn = document.getElementById("all-characters");
allCharactersBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/api/characters")
    .then((res) => res.json())
    .then((data) => console.log(data));
});
