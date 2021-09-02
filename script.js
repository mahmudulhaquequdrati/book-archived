const searchBook = () => {
  const searchFeild = document.getElementById("inputField");
  const searchText = searchFeild.value;
  const errorMgs = document.getElementById("errorEmpty");
  const errorMgs2 = document.getElementById("errorEmpty2");
  const searchResult = document.getElementById("searchResult");
  // clear result
  searchResult.textContent = "";
  // clear Input
  searchFeild.value = "";
  // clear error
  errorMgs.innerText = "";
  errorMgs2.innerText = "";

  if (searchText === "") {
    errorMgs.innerText = "please write something on searchBox";
    return;
  }
  //api
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBookResult(data));
};

const displayBookResult = (books) => {
  const resultFound = document.getElementById("resultFound");
  resultFound.innerText = `result found : ${books.numFound}`;

  const bookInfo = books.docs.slice(0, 20);
  const errorMgs2 = document.getElementById("errorEmpty2");
  if (bookInfo.length === 0) {
    errorMgs2.innerText = "please write valid book name on searchBox";
    return;
  }

  bookInfo.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top"  alt="..." />
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">
                Author : ${book.author_name} <br>
                First publish : ${book.first_publish_year}
              </p>
            </div>
          </div>
    `;
    searchResult.appendChild(div);
  });
};
