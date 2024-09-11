// app.js

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get input values from the form
    const name = document.getElementById('name').value;

    // Construct the URL for the Azure Function
    const functionUrl = 'https://sanfunc.azurewebsites.net/api/http_trigger'; // Replace with your actual Azure Function URL

    // Construct the request payload
    const payload = {
        name: name
    };

    try {
        // Make a POST request to the Azure Function
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the request was successful
        if (response.ok) {
            // Check the Content-Type of the response
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                // Parse JSON response
                const result = await response.json();
                document.getElementById('result').innerText = `API response: ${JSON.stringify(result)}`;
            } else {
                // Parse as text if not JSON
                const textResponse = await response.text();
                document.getElementById('result').innerText = `API response: ${textResponse}`;
            }
        } else {
            // Handle errors
            const errorText = await response.text();
            document.getElementById('result').innerText = `API request failed with status ${response.status}: ${errorText}`;
        }
    } catch (error) {
        // Handle network errors
        document.getElementById('result').innerText = `Request failed: ${error.message}`;
    }
}

// Attach the form submit handler
document.getElementById('myForm').addEventListener('submit', handleFormSubmit);
