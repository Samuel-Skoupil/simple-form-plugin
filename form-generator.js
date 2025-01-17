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
    const selectWrapper = document.createElement("div");
    selectWrapper.className = "icon-select"; // Wrapper pre šípku

    input = document.createElement("select");
    options.forEach(({ value, text, hidden }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      if (hidden) option.hidden = true;
      input.appendChild(option);
    });

    selectWrapper.appendChild(input);
    formElement.appendChild(label);
    formElement.appendChild(selectWrapper);
    return formElement; // Končíme tu pre select
  } else {
    input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
  }

  input.className = "icon"; // Trieda pre ikonky
  input.id = id;
  input.name = id;
  if (required) input.required = true;

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
  alert("Form submitted successfully!");
}

function showNextStep(currentStep) {
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
