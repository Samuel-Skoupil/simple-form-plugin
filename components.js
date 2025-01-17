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

function createFormElement(labelText, type, id, placeholder, required = false) {
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

  const input = document.createElement(type === "select" ? "select" : "input");
  input.className = "icon";
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;

  if (type === "select") {
    const options = [
      { value: "", text: "Select your gender", hidden: true },
      { value: "other", text: "Other" },
      { value: "male", text: "Male" },
      { value: "female", text: "Female" },
    ];
    options.forEach(({ value, text, hidden }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      if (hidden) option.hidden = true;
      input.appendChild(option);
    });
  } else {
    input.type = type;
    if (required) input.required = true;
  }

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
