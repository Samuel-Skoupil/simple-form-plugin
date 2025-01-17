document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("simple-form-container");
  if (container) {
    const formType = container.dataset.formType || "one";
    createForm(formType);
  }
});

function createForm(formType) {
  const container = document.getElementById("simple-form-container");
  container.innerHTML = "";

  // Wrapper pre celý formulár
  const formWrapper = document.createElement("div");
  formWrapper.className = "form-wrapper";

  const form = document.createElement("form");
  form.id = `simple-form-${formType}`;
  form.method = "post";

  const fields = [
    {
      label: "Name",
      type: "text",
      id: "name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      label: "Last Name",
      type: "text",
      id: "last_name",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      id: "phone_number",
      placeholder: "Enter your phone number",
      required: false,
    },
    {
      label: "State",
      type: "text",
      id: "state",
      placeholder: "Enter your state",
      required: false,
    },
    {
      label: "City",
      type: "text",
      id: "city",
      placeholder: "Enter your city",
      required: false,
    },
    {
      label: "Date of Birth",
      type: "date",
      id: "date_of_birth",
      placeholder: "Enter your date of birth",
      required: false,
    },
    {
      label: "Gender",
      type: "select",
      id: "gender",
      placeholder: "",
      required: false,
      options: [
        { value: "", text: "Select your gender", hidden: true },
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "other", text: "Other" },
      ],
    },
  ];

  const steps = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  };

  const totalSteps = steps[formType] || 1;

  // Dynamické rozdelenie polí pre každý typ formulára
  const fieldDistribution = {
    one: [8], // 1-stranový: všetky na jednej strane
    two: [4, 4], // 2-stranový: 4 a 4
    three: [4, 2, 2], // 3-stranový: 4, 2, 2
    four: [2, 2, 2, 2], // 4-stranový: po 2 na každej strane
  };

  const fieldsPerStep = fieldDistribution[formType] || [fields.length];

  let fieldIndex = 0;

  for (let step = 1; step <= totalSteps; step++) {
    const stepWrapper = document.createElement("div");
    stepWrapper.id = `form-step-${step}`;
    stepWrapper.className = `form ${step === 1 ? "visible" : ""}`;
    stepWrapper.style.display = step === 1 ? "block" : "none";

    // Step Indicator (pridá sa len pri viackrokovom formulári)
    if (totalSteps > 1) {
      stepWrapper.appendChild(createStepIndicator(step, totalSteps));
    }

    // Polia pre aktuálny krok
    const fieldsForThisStep = fieldsPerStep[step - 1];
    for (let i = 0; i < fieldsForThisStep; i += 2) {
      const row = document.createElement("div");
      row.className = "row";

      // Prvé pole v riadku
      if (fieldIndex < fields.length) {
        row.appendChild(
          createFormElement(
            fields[fieldIndex].label,
            fields[fieldIndex].type,
            fields[fieldIndex].id,
            fields[fieldIndex].placeholder,
            fields[fieldIndex].required,
            fields[fieldIndex].options || []
          )
        );
        fieldIndex++;
      }

      // Druhé pole v riadku (ak existuje)
      if (fieldIndex < fields.length) {
        row.appendChild(
          createFormElement(
            fields[fieldIndex].label,
            fields[fieldIndex].type,
            fields[fieldIndex].id,
            fields[fieldIndex].placeholder,
            fields[fieldIndex].required,
            fields[fieldIndex].options || []
          )
        );
        fieldIndex++;
      }

      stepWrapper.appendChild(row);
    }

    // Button pre každý krok
    const buttonText = step < totalSteps ? "Next step" : "Submit";
    const buttonFunction =
      step < totalSteps ? () => showNextStep(step) : validateAndSubmit;
    stepWrapper.appendChild(createButtonContainer(buttonText, buttonFunction));

    form.appendChild(stepWrapper);
  }

  formWrapper.appendChild(form);
  container.appendChild(formWrapper);
}

function createStepIndicator(currentStep, totalSteps) {
  const stepIndicator = document.createElement("div");
  stepIndicator.className = "step-indicator";

  for (let i = 1; i <= totalSteps; i++) {
    const step = document.createElement("div");
    step.className = i <= currentStep ? "step active" : "step";
    step.textContent = i;

    stepIndicator.appendChild(step);

    if (i < totalSteps) {
      const divider = document.createElement("div");
      divider.className = i < currentStep ? "divider-done" : "divider";
      stepIndicator.appendChild(divider);
    }
  }

  return stepIndicator;
}

function createFormElement(
  labelText,
  type,
  id,
  placeholder,
  required = false,
  options = []
) {
  const formElement = document.createElement("div");
  formElement.className = "form-element";

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;
  if (required) {
    const requiredSpan = document.createElement("span");
    requiredSpan.className = "required";
    requiredSpan.textContent = "*";
    label.appendChild(requiredSpan);
  }

  let input;
  if (type === "select") {
    // Wrapper pre select
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "icon-select";

    input = document.createElement("select");
    input.className = "icon"; // Pridanie triedy icon
    input.id = id;
    input.name = id;

    options.forEach(({ value, text, hidden }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      if (hidden) option.hidden = true;
      input.appendChild(option);
    });

    // Dynamické prepínanie triedy icon-filled na základe výberu
    input.addEventListener("change", () => {
      if (input.value.trim()) {
        input.classList.add("icon-filled");
      } else {
        input.classList.remove("icon-filled");
      }
    });

    selectWrapper.appendChild(input);
    formElement.appendChild(label);
    formElement.appendChild(selectWrapper);
    return formElement;
  } else {
    input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
  }

  input.className = "icon";
  input.id = id;
  input.name = id;
  if (required) input.required = true;

  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.classList.add("icon-filled");
    } else {
      input.classList.remove("icon-filled");
    }
  });

  formElement.appendChild(label);
  formElement.appendChild(input);

  return formElement;
}

function createButtonContainer(buttonText, onClickFunction) {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = buttonText;
  button.addEventListener("click", onClickFunction);

  buttonContainer.appendChild(button);
  return buttonContainer;
}

function validateAndSubmit() {
  const activeForm = document.querySelector(".form-wrapper form");
  if (!activeForm) return;

  // Odstránenie predchádzajúcich chybových správ
  const existingErrorMessages = activeForm.querySelectorAll(
    ".error-message-global"
  );
  existingErrorMessages.forEach((msg) => msg.remove());

  // Validácia povinných polí
  const requiredFields = activeForm.querySelectorAll("[required]");
  let valid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error");
      valid = false;

      // Pridanie chybovej správy pre konkrétne pole
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message-global";
      errorMessage.textContent = `"${field.previousSibling.textContent}" is required.`;
      field.parentNode.appendChild(errorMessage);
    } else {
      field.classList.remove("error");
      const fieldError = field.parentNode.querySelector(
        ".error-message-global"
      );
      if (fieldError) fieldError.remove();
    }
  });

  if (!valid) {
    return; // Zastaví odosielanie, ak sú polia prázdne
  }

  // Vytvorenie dát formulára
  const formData = new FormData(activeForm);
  formData.append("action", "handle_simple_form_submission");
  formData.append("security", simple_form_ajax.nonce);

  // Odoslanie dát cez fetch
  fetch(simple_form_ajax.ajax_url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Skryjeme formulár
        activeForm.style.display = "none";

        // Vytvorenie success containeru
        const successContainer = document.createElement("div");
        successContainer.className = "success-message";
        successContainer.innerHTML =
          "<p>Form has been submitted successfully!</p>";

        // Pridanie success containeru do DOM
        activeForm.parentNode.appendChild(successContainer);

        // Animácia success správy
        setTimeout(() => {
          successContainer.classList.add("visible");
        }, 100);
      } else {
        // Zobrazenie chybovej správy
        const errorContainer = document.createElement("div");
        errorContainer.className = "error-message";
        errorContainer.innerHTML =
          "<p>Failed to submit the form. Please try again.</p>";
        activeForm.appendChild(errorContainer);
      }
    })
    .catch((error) => {
      console.error("Error:", error);

      // Zobrazenie chybovej správy pri probléme s odoslaním
      const errorContainer = document.createElement("div");
      errorContainer.className = "error-message";
      errorContainer.innerHTML =
        "<p>An error occurred. Please try again later.</p>";
      activeForm.appendChild(errorContainer);
    });
}

function showNextStep(currentStep) {
  const currentFormStep = document.getElementById(`form-step-${currentStep}`);
  const requiredFields = currentFormStep.querySelectorAll("[required]");
  let valid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("error");
      valid = false;
    } else {
      field.classList.remove("error");
    }
  });

  if (!valid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Ak sú všetky polia vyplnené, prejdeme na ďalší krok
  const allSteps = document.querySelectorAll(".form");
  allSteps.forEach((step) => {
    step.classList.remove("visible");
    step.style.display = "none";
  });

  const nextFormStep = document.getElementById(`form-step-${currentStep + 1}`);
  if (nextFormStep) {
    nextFormStep.classList.add("visible");
    nextFormStep.style.display = "block";
  }
}
