document.getElementById("simple-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  formData.append("action", "handle_simple_form_submission");

  fetch(simple_form_ajax.ajax_url, {
    method: "POST",
    body: formData,
    headers: {
      "X-WP-Nonce": simple_form_ajax.nonce,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.querySelector(".button-container").innerHTML =
          "<p>Form has been submitted successfully</p>";
      } else {
        document.querySelector(".button-container").innerHTML =
          "<p>Something went wrong</p>";
      }
    })
    // TODO: Improve error handling and user feedback
    .catch((error) => {
      console.error("Error:", error);
      document.querySelector(".button-container").innerHTML =
        "<p>An error has occurred. Please try again later.</p>";
    });
});
