document.addEventListener("DOMContentLoaded", () => { //This ensures the script runs only after the entire HTML document is loaded. 
                                                     //It wraps all the code inside so the JavaScript doesn't try to access elements that haven’t yet been loaded.
    const form = document.getElementById("sign-in-form");
     // Selects the form by its id so we can reference it in JavaScript
    const errorMessage = document.getElementById("error-message");
    //Selects the error message paragraph.
    const successMessage = document.getElementById("success-message");
    //Selects the success message paragraph
    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z]+$/;
        //This is a regular expression that matches only alphabetical characters (both uppercase and lowercase). It ensures that the username consists only of letters.
        return usernameRegex.test(username);
        //The function returns true if the username matches the regex (valid), otherwise false.
    }

    function validateAge(age) {
        return /^\d{2}$/.test(age);
        //This regex checks if the input consists of exactly two digits (0-9). The function returns true for valid two-digit numbers, otherwise false.
    }

    
    form.addEventListener("submit", (event) => {
        event.preventDefault();  
        //Prevents the default form submission behavior. We want to handle the validation manually first.
        const username = form.username.value.trim();
        const age = form.age.value.trim();


        errorMessage.style.display = "none";//Hides any previously displayed error message.
        successMessage.style.display = "none";//same 

  
        if (!validateUsername(username)) {
            errorMessage.textContent = "Invalid username. Only alphabetical characters are allowed.";
            errorMessage.style.display = "block";
            return;
        }

        if (!validateAge(age)) {
            errorMessage.textContent = "Invalid age. Please enter a two-digit number.";
            errorMessage.style.display = "block";
            return;
        }

    
        successMessage.style.display = "block";
        errorMessage.style.display = "none";
    });
});
