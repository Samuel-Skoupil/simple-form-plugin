// Show next page when all required inputs are filled
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

  if (allFilled) {
    document.getElementById("form-step-1").style.display = "none";
    document.getElementById("form-step-2").classList.add("visible");
    document.querySelector(".submit").style.display = "block";
    document.querySelector(".next-step").style.display = "none";
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

// TO DO: Icons reacting to state of validation
