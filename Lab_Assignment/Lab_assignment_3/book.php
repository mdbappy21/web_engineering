<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "library";

$conn = new mysqli($host, $user, $pass, $db);

$editBook = null;

// Fetch book to edit
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $res = $conn->query("SELECT * FROM books WHERE id = $id");
    if ($res->num_rows > 0) {
        $editBook = $res->fetch_assoc();
    }
}

// Update existing book
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update_id'])) {
    $id = $_POST['update_id'];
    $title = $_POST['title'] ?? '';
    $author = $_POST['author'] ?? '';
    $genre = $_POST['genre'] ?? '';
    $bestseller = isset($_POST['bestseller']) ? 1 : 0;

    if (!empty($title) && !empty($author) && !empty($genre)) {
        $stmt = $conn->prepare("UPDATE books SET title=?, author=?, genre=?, bestseller=? WHERE id=?");
        $stmt->bind_param("sssii", $title, $author, $genre, $bestseller, $id);
        $stmt->execute();
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    }
}

// Insert new book
if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_POST['update_id'])) {
    $title = $_POST['title'] ?? '';
    $author = $_POST['author'] ?? '';
    $genre = $_POST['genre'] ?? '';
    $bestseller = isset($_POST['bestseller']) ? 1 : 0;

    if (!empty($title) && !empty($author) && !empty($genre)) {
        $stmt = $conn->prepare("INSERT INTO books (title, author, genre, bestseller) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $title, $author, $genre, $bestseller);
        $stmt->execute();
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    }
}

// Delete book
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM books WHERE id = $id");
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Book Entry</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <form method="POST" onsubmit="return validateBookForm()">

        <?php if ($editBook): ?>

        <input type="hidden" name="update_id" value="<?= $editBook['id'] ?>">

        <?php endif; ?>

        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="<?= $editBook['title'] ?? '' ?>">
        <div id="titleError" class="error"></div>
        <label for="author">Author</label>
        <input type="text" name="author" id="author" value="<?= $editBook['author'] ?? '' ?>">
        <div id="authorError" class="error"></div>
        <label for="genre">Genre</label>
        <select name="genre" id="genre">
            <option value="">Select Genre</option>

            <?php
        $genres = ["Fiction", "Non-Fiction", "Science", "Fantasy", "Romance", "Biography"];
        foreach ($genres as $g) {
            $selected = ($editBook && $editBook['genre'] == $g) ? 'selected' : '';
            echo "<option value=\"$g\" $selected>$g</option>";
        }
        ?>

        </select>
        <div id="genreError" class="error"></div>
        <label>
            <input type="checkbox" name="bestseller" <?= ($editBook && $editBook['bestseller']) ? 'checked' : '' ?>>
            Best Seller?
        </label>
        <input type="submit" value="<?= $editBook ? 'Update Book' : 'Submit' ?>">
    </form>

    <table>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Best Seller</th>
            <th>Actions</th>
        </tr>

    <?php
    $result = $conn->query("SELECT * FROM books ORDER BY id DESC");
    while ($row = $result->fetch_assoc()):
    ?>

        <tr>
            <td><?= htmlspecialchars($row['title']) ?></td>
            <td><?= htmlspecialchars($row['author']) ?></td>
            <td><?= htmlspecialchars($row['genre']) ?></td>
            <td><?= $row['bestseller'] ? '✔' : '✘' ?></td>
            <td>
                <div class="action_button"style="">
                    <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Are you sure?')">
                        <button class="action-btn delete">Delete</button>
                    </a>
                    <a href="?edit=<?= $row['id'] ?>">
                        <button class="action-btn update">Update</button>
                    </a>
                </div>
            </td>
        </tr>

    <?php endwhile; ?>

    </table>
    <script src="script.js"></script>
</body>
</html>

<!-- CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    genre VARCHAR(100),
    bestseller TINYINT(1)
); -->