// Show next page when all required inputs are filled two step from
function show_next_page() {
  const currentStep = document.querySelector(".form.visible");
  const requiredInputs = currentStep.querySelectorAll("input[required]");
  let allFilled = true;

  requiredInputs.forEach((input) => {
    const errorIs = input.nextElementSibling;
    if (errorIs && errorIs.classList.contains("error-message")) {
      errorIs.remove();
    }

    if (input.value.trim() === "") {
      allFilled = false;
      const validationMessage = document.createElement("div");
      validationMessage.classList = "error-message";
      validationMessage.textContent = "This field is required";
      input.insertAdjacentElement("afterend", validationMessage);
    }
  });

  const emailInput = currentStep.querySelector("#email");
  if (emailInput) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      allFilled = false;
    }
  }

  if (allFilled) {
    document.getElementById("form-step-1").style.display = "none";
    document.getElementById("form-step-2").classList.add("visible");
    document.querySelector(".submit").style.display = "block";
    document.querySelector(".next-step").style.display = "none";
  }
}

// Show next page when all required inputs are filled three step from

function show_next_page_three() {
  const currentStep = document.querySelector(".form.visible");
  const requiredInputs = currentStep.querySelectorAll("input[required]");
  let allFilled = true;

  requiredInputs.forEach((input) => {
    const errorIs = input.nextElementSibling;
    if (errorIs && errorIs.classList.contains("error-message")) {
      errorIs.remove();
    }

    if (input.value.trim() === "") {
      allFilled = false;
      const validationMessage = document.createElement("div");
      validationMessage.classList = "error-message";
      validationMessage.textContent = "This field is required";
      input.insertAdjacentElement("afterend", validationMessage);
    }
  });

  const emailInput = currentStep.querySelector("#email");
  if (emailInput) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      allFilled = false;
    }
  }
  if (allFilled) {
    if (currentStep.id === "form-step-1") {
      currentStep.classList.remove("visible");
      currentStep.classList.remove("hide");
      document.querySelector(".hide").classList.remove("hide"); // Nastavenie display = "block";
      document.getElementById("hide-button").style.display = "none";
      currentStep.style.display = "none";
      document.getElementById("form-step-2").classList.add("visible");
    } else if (allFilled && currentStep.id === "form-step-2") {
      document.getElementById("form-step-2").style.display = "none";
      document.getElementById("form-step-3").classList.add("visible");
      document.querySelector(".submit").style.display = "block";
      document.querySelector(".next-step").style.display = "none";
      document.getElementById("hide-next-button").style.display = "none";
    }
  }
}

// Show next page when all required inputs are filled four step from

function show_next_page_four() {
  const currentStep = document.querySelector(".form.visible");
  const requiredInputs = currentStep.querySelectorAll("input[required]");
  let allFilled = true;

  requiredInputs.forEach((input) => {
    const errorIs = input.nextElementSibling;
    if (errorIs && errorIs.classList.contains("error-message")) {
      errorIs.remove();
    }

    if (input.value.trim() === "") {
      allFilled = false;
      const validationMessage = document.createElement("div");
      validationMessage.classList = "error-message";
      validationMessage.textContent = "This field is required";
      input.insertAdjacentElement("afterend", validationMessage);
    }
  });

  const emailInput = currentStep.querySelector("#email");
  if (emailInput) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      allFilled = false;
    }
  }
  if (allFilled) {
    if (currentStep.id === "form-step-1") {
      currentStep.classList.remove("visible");
      currentStep.classList.remove("hide");
      document.querySelector(".hide").classList.remove("hide"); // Nastavenie display = "block";
      document.getElementById("hide-button").style.display = "none";
      currentStep.style.display = "none";
      document.getElementById("form-step-2").classList.add("visible");
    } else if (allFilled && currentStep.id === "form-step-2") {
      document.getElementById("form-step-2").style.display = "none";
      document.getElementById("form-step-2").classList.remove("visible");
      document.getElementById("form-step-3").classList.add("visible");
      document.getElementById("button-step-2").style.display = "none";
      document.querySelector(".submit").style.display = "block";
      document.querySelector(".next-step").style.display = "none";
      document.querySelector(".hide").classList.remove("hide");
      document.getElementById("hide-next-button").style.display = "none";
    } else if (allFilled && currentStep.id === "form-step-3") {
      document.getElementById("form-step-3").style.display = "none";
      document.getElementById("form-step-3").classList.remove("visible");
      document.getElementById("form-step-4").classList.add("visible");
      document.getElementById("hide-step-3").style.display = "none";
      currentStep.classList.remove("hide");
      document.querySelector(".submit").style.display = "block";
      document.querySelector(".next-step").style.display = "none";
      document.querySelector(".hide").classList.remove("hide");
      document.getElementById("hide-next-button").style.display = "none";
    }
  }
}

// Validate form inputs

function validateFormInputs(form) {
  const requiredInputs = form.querySelectorAll("input[required]");
  let allFilled = true;

  requiredInputs.forEach((input) => {
    const errorIs = input.nextElementSibling;
    if (errorIs && errorIs.classList.contains("error-message")) {
      errorIs.remove();
    }

    if (input.value.trim() === "") {
      allFilled = false;
      const validationMessage = document.createElement("div");
      validationMessage.classList.add("error-message");
      validationMessage.textContent = "This field is required";
      input.insertAdjacentElement("afterend", validationMessage);
    }
  });

  return allFilled;
}

// Call the function to validate when submiting the form

function validateAndSubmit() {
  const form = document.querySelector(".form");
  const allFilled = validateFormInputs(form);

  if (allFilled) {
    form.submit();
  }
}

// Update progress bar when input is filled

function updateDividerProgress() {
  const currentStep = document.querySelector(".form.visible");

  const fields = currentStep.querySelectorAll("input, select, option");

  let filledFields = 0;

  fields.forEach((field) => {
    if (field.value.trim() !== "") {
      filledFields++;
    }
  });

  const progressPerecentage = (filledFields / fields.length) * 100;
  const divider = currentStep.querySelector(".divider");
  divider.style.background = `linear-gradient(to right, #4a3aff ${progressPerecentage}%, #e0e0e0 ${progressPerecentage}%)`;
}

const formElements = document.querySelectorAll(".form input, .form select");

formElements.forEach((element) =>
  element.addEventListener("input", updateDividerProgress)
);

// Event listener for icon inputs
document.querySelectorAll(".icon").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() !== "") {
      this.classList.add("icon-filled");
    } else {
      this.classList.remove("icon-filled");
    }

    // Špeciálna validácia pre email
    if (this.id === "email") {
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailPattern.test(this.value.trim())) {
        this.classList.add("email-error");
      } else {
        this.classList.remove("email-error");
        this.classList.add("icon-filled");
      }
    }
  });
});
