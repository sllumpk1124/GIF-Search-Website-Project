document.addEventListener("DOMContentLoaded", function () {
    const gifForm = document.querySelector("#gif-form");
    const gifInput = document.querySelector("#gif-input");
    const gifContainer = document.querySelector("#gif-container");

    gifForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        //put code in try/catch in the event that info cannot be obtained from API
        const searchTerm = gifInput.value.trim();
        if (searchTerm !== "") {
            try {
                const apiKey = 'BjbD4DjOCFP6GkEBeSxDrk74Jvw4BooL'; 
                const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${searchTerm}`;

                const response = await axios.get(apiUrl);
                const gifUrl = response.data.data[0].images.original.url;

                // Create a container for each GIF and remove button
                const gifContainerItem = document.createElement("div");

                // Create HTML elements for the GIF and remove button
                const gifElement = document.createElement("img");
                gifElement.src = gifUrl;
                gifElement.className = "gif-image"; // Added class for styling

                const removeButton = document.createElement("button");
                removeButton.innerText = "Remove";
                removeButton.className = "remove-btn"; // Added class for styling
                removeButton.addEventListener("click", function () {
                    gifContainer.removeChild(gifContainerItem);
                });

                // Append the GIF and remove button to the container
                gifContainerItem.appendChild(gifElement);
                gifContainerItem.appendChild(removeButton);

                // Append the container to the main container
                gifContainer.appendChild(gifContainerItem);

                // Clear the input field
                gifInput.value = "";
            } catch (error) {
                console.error("Error fetching GIF:", error);
            }
        }
    });
});
