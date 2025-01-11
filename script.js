function show_next_page() {
  const currentStep = document.querySelector(".form.visible");

  const requiredInputs = currentStep.querySelectorAll("input[required]");
  let allFilled = true;

  for (const input of requiredInputs) {
    if (input.value.trim() === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    document.getElementById("form-step-1").style.display = "none";
    document.getElementById("form-step-2").classList.add("visible");
    document.querySelector(".submit").style.display = "block";
    document.querySelector(".next-step").style.display = "none";
  }
}
