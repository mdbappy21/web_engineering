function validateBookForm() {
    let valid = true;

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const genre = document.getElementById("genre").value;

    document.getElementById("titleError").textContent = "";
    document.getElementById("authorError").textContent = "";
    document.getElementById("genreError").textContent = "";

    if (title === "") {
        document.getElementById("titleError").textContent = "Title is required.";
        valid = false;
    }

    if (author === "") {
        document.getElementById("authorError").textContent = "Author is required.";
        valid = false;
    }

    if (genre === "") {
        document.getElementById("genreError").textContent = "Genre is required.";
        valid = false;
    }

    return valid;
}
