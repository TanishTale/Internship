document.getElementById('contactForm').addEventListener('submit', async function(e) {
    // Prevent the default form submission (which reloads the page)
    e.preventDefault();

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const statusDiv = document.getElementById('statusMessage');

    // Package them into a Javascript object
    const formData = {
        name: name,
        email: email,
        message: message
    };

    try {
        statusDiv.style.color = "blue";
        statusDiv.innerText = "Sending...";

        // Send POST request to Spring Boot
        const response = await fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Telling the server we are sending JSON
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            statusDiv.style.color = "green";
            statusDiv.innerText = "Success! Message sent to the backend.";
            document.getElementById('contactForm').reset(); // Clear the form
        } else {
            statusDiv.style.color = "red";
            statusDiv.innerText = "Error: Could not send message.";
        }
    } catch (error) {
        console.error('Error:', error);
        statusDiv.style.color = "red";
        statusDiv.innerText = "Connection failed. Is the Spring Boot server running?";
    }
});