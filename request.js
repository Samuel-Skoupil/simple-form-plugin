// One-Step Form
document
  .getElementById("simple-form-one")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append("action", "handle_simple_form_submission");
    formData.append("security", simple_form_ajax.nonce);

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
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector(".button-container").innerHTML =
          "<p>An error has occurred. Please try again later.</p>";
      });
  });

// Two-Step Form
document
  .getElementById("simple-form-two")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append("action", "handle_simple_form_submission");
    formData.append("security", simple_form_ajax.nonce);

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
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector(".button-container").innerHTML =
          "<p>An error has occurred. Please try again later.</p>";
      });
  });
