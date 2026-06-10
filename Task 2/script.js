// Form Validation Function [cite: 50]
function validateForm() {
    // Corrected syntax to safely extract values from the form inputs
    let name = document.forms["contactForm"]["name"].value;
    let email = document.forms["contactForm"]["email"].value;
    let message = document.forms["contactForm"]["message"].value;

    // Check if Name or Email is empty [cite: 52]
    if (name.trim() === "" || email.trim() === "") {
        // Show alert if inputs are missing [cite: 23, 53]
        alert("Name and Email must be filled out!");
        return false; // Prevents the form from submitting [cite: 54]
    }
    
    // Optional: Alert success if validation passes
    alert("Thank you! Your message has been validated and sent.");
    return true; // Allows form submission [cite: 57]
}