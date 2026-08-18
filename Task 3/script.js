document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CONTACT FORM LOGIC (Save to LocalStorage)
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('successMessage');

            // Reset errors
            nameError.innerText = '';
            emailError.innerText = '';
            messageError.innerText = '';
            successMessage.innerText = '';

            let isValid = true;

            // Validation
            if (name === '') { nameError.innerText = 'Name is required.'; isValid = false; }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') { 
                emailError.innerText = 'Email is required.'; isValid = false; 
            } else if (!emailRegex.test(email)) { 
                emailError.innerText = 'Please enter a valid email address.'; isValid = false; 
            }
            
            if (message === '') { messageError.innerText = 'Message cannot be empty.'; isValid = false; }

            // If valid, SAVE to LocalStorage
            if (isValid) {
                // Create a data object
                const newSubmission = {
                    name: name,
                    email: email,
                    message: message,
                    date: new Date().toLocaleString() // Adds a timestamp
                };

                // Get existing submissions from LocalStorage, or start an empty array if none exist
                let existingSubmissions = JSON.parse(localStorage.getItem('siteSubmissions')) || [];
                
                // Add the new submission to the array
                existingSubmissions.push(newSubmission);
                
                // Save the updated array back to LocalStorage
                localStorage.setItem('siteSubmissions', JSON.stringify(existingSubmissions));

                successMessage.innerText = 'Success! Your message was saved to LocalStorage.';
                contactForm.reset(); 
            }
        });
    }

    // ==========================================
    // 2. SUBMISSIONS PAGE LOGIC (Read and Display)
    // ==========================================
    const submissionsList = document.getElementById('submissionsList');
    const clearDataBtn = document.getElementById('clearDataBtn');

    if (submissionsList) {
        // Fetch data from LocalStorage
        const savedData = JSON.parse(localStorage.getItem('siteSubmissions')) || [];

        if (savedData.length === 0) {
            submissionsList.innerHTML = '<div class="empty-message">No messages yet. Go to the contact page to submit one!</div>';
            clearDataBtn.style.display = 'none'; // Hide clear button if no data
        } else {
            // Loop through the data and create HTML cards dynamically
            savedData.forEach(submission => {
                const card = document.createElement('div');
                card.className = 'submission-card';
                card.innerHTML = `
                    <h4>${submission.name}</h4>
                    <small>${submission.email}</small>
                    <p>"${submission.message}"</p>
                    <small>${submission.date}</small>
                `;
                submissionsList.appendChild(card);
            });
        }

        // Add logic to clear the LocalStorage
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if(confirm('Are you sure you want to delete all submissions?')) {
                    localStorage.removeItem('siteSubmissions');
                    window.location.reload(); // Refresh the page to show empty state
                }
            });
        }
    }
});