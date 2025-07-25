function validateForm() {
    const name = document.getElementById("name").value.trim();
    const batch = document.getElementById("batch").value.trim();
    const hobby = document.getElementById("hobby").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const nameError = document.getElementById("nameError");
    const batchError = document.getElementById("batchError");
    const hobbyError = document.getElementById("hobbyError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("passwordError");

    nameError.textContent = "";
    batchError.textContent = "";
    hobbyError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    const nameRegExp = /^[a-zA-Z .]{5,16}$/;
    const passRegExp = /^(?=.*[@#])[a-zA-Z0-9@#]{6,}$/;
    const batchRegExp = /^[0-9]{2}_[a-zA-Z]$/;
    const emailRegExp = /^[a-z][0-9]*@diu.edu.bd$/;
    const hobbyRegExp = /^(?=.*\bpainting\b)(\s*[^,]+?\s*,){4}\s*[^,]+?\s*$/i;

    let valid = true;

    if (name === "") {
        nameError.textContent = "Name must be filled out";
        valid = false;
    } else if (!nameRegExp.test(name)) {
        nameError.textContent = "Name format invalid (5-16 letters, spaces, or dots)";
        valid = false;
    }

    if (batch === "") {
        batchError.textContent = "Enter valid Batch";
        valid = false;
    } else if (!batchRegExp.test(batch)) {
        batchError.textContent = "Enter valid Batch (Format: 2 digits + underscore + letter)";
        valid = false;
    }

    if (hobby === "") {
        hobbyError.textContent = "Please enter your hobby";
        valid = false;
    } else if (!hobbyRegExp.test(hobby)) {
        hobbyError.textContent = "Enter valid hobby";
        valid = false;
    }

    if (email === "") {
        emailError.textContent = "Enter valid Email";
        valid = false;
    } else if (!emailRegExp.test(email)) {
        emailError.textContent = "Enter valid Email (e.g. a123@diu.edu.bd)";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent = "Password must be filled out";
        valid = false;
    } else if (!passRegExp.test(password)) {
        passwordError.textContent = "Password must be at least 6 characters, letters or numbers";
        valid = false;
    }
    if (confirmPassword === "") {
        passwordError.textContent = "Password must be filled out";
        valid = false;
    } else if (password!=confirmPassword) {
        passwordError.textContent = "Password do not match";
        valid = false;
    }

    return valid;
}
