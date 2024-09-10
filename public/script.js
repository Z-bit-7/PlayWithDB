document.addEventListener('DOMContentLoaded', () => {
    // Attach an event listener to the login form
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Extract the username and password from the form
            const username = document.querySelector('[name="username"]').value;
            const password = document.querySelector('[name="password"]').value;

            // Send the login request using Fetch API
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                // Parse the JSON response
                const result = await response.json();

                if (result.success) {
                    // On success, redirect to the home page with the username as a query parameter
                    window.location.href = `/home.html?username=${encodeURIComponent(result.username)}`;
                } else {
                    // Show an error message if login fails
                    alert(result.message);
                }
            } catch (err) {
                // Handle network or other errors
                console.error('Error during login:', err);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});
