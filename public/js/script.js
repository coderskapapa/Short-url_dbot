document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const urlInput = form.querySelector("input[name='url']");
    const customShortIdInput = form.querySelector("input[name='customShortId']");
    const errorContainer = document.createElement("p");
    errorContainer.style.color = "red";
    form.insertBefore(errorContainer, form.firstChild);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        errorContainer.textContent = "";

        const url = urlInput.value;
        const customShortId = customShortIdInput.value;

        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, customShortId })
        });

        const result = await response.json();

        if (!result.success) {
            errorContainer.textContent = result.message;
        } else {
            // Handle success (e.g., display the short URL)
            errorContainer.style.color = "green";
            errorContainer.textContent = `Short URL: ${result.shortUrl}`;
        }
    });
});