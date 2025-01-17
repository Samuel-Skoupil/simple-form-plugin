// document.addEventListener("DOMContentLoaded", () => {
//   const container = document.getElementById("simple-form-container");
//   if (container) {
//     const formType = container.dataset.formType || "one";
//     createForm(formType);
//     handleFormSubmission(`simple-form-${formType}`);
//   }
// });

// function handleFormSubmission(formId) {
//   const form = document.getElementById(formId);

//   if (!form) return;

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(this);
//     formData.append("action", "handle_simple_form_submission");
//     formData.append("security", simple_form_ajax.nonce);

//     fetch(simple_form_ajax.ajax_url, {
//       method: "POST",
//       body: formData,
//       headers: {
//         "X-WP-Nonce": simple_form_ajax.nonce,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           form.style.display = "none";
//           const successContainer = document.createElement("div");
//           successContainer.className = "success-message";
//           successContainer.innerHTML =
//             "<p>Form has been submitted successfully</p>";
//           form.parentNode.appendChild(successContainer);
//           setTimeout(() => {
//             successContainer.classList.add("visible");
//           }, 100);
//         } else {
//           const errorContainer = document.createElement("div");
//           errorContainer.className = "error-message";
//           errorContainer.innerHTML = "<p>Something went wrong</p>";
//           form.appendChild(errorContainer);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         const errorContainer = document.createElement("div");
//         errorContainer.className = "error-message";
//         errorContainer.innerHTML =
//           "<p>An error has occurred. Please try again later.</p>";
//         form.appendChild(errorContainer);
//       });
//   });
// }
