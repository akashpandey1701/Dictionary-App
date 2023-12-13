document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const container = document.querySelector('.container');
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    container.appendChild(resultContainer);

    const button = document.querySelector('.button');

    button.addEventListener('click', function () {
        const searchTerm = document.querySelector('input').value.trim();

        if (searchTerm !== '') {
            // Make an API request
            fetch(apiUrl + searchTerm)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    displayMeaning(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    displayErrorMessage('Error fetching data. Please try again.');
                });
        } else {
            displayErrorMessage('Please enter a word to search.');
        }
    });

    // Function to display the meaning below the search box
    function displayMeaning(data) {
        if (data && Array.isArray(data) && data.length > 0) {
            const meaning = data[0].meanings[0].definitions[0].definition;

            // Update the result container content
            resultContainer.innerHTML = `
                <h2>${data[0].word}</h2>
                <p><strong>Meaning:</strong> ${meaning}</p>
            `;
        } else {
            displayErrorMessage('Meaning not found.');
        }
    }

    // Function to display an error message below the search box
    function displayErrorMessage(message) {
        resultContainer.innerHTML = `
            <p class="error">${message}</p>
        `;
    }
});
