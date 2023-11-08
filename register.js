document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const fullname = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const selectedGender = displayRadioValue();

    const formIsValid = validateForm(
      fullname,
      email,
      phone,
      password,
      selectedGender
    );

    if (formIsValid) {
      storeUserData();
    }
  });

function storeUserData() {
  const formdetails = document.querySelector("form");
  const formData = new FormData(formdetails);
  const jsObjectformData = Object.fromEntries(formData);
  const emailToCheck = jsObjectformData.email;
  console.log(emailToCheck);

  let userRecords = new Array();
  userRecords = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (userRecords.some((record) => record.email === emailToCheck)) {
    displayMessage("Account already exist", "red");
  } else {
    userRecords.push(jsObjectformData);
    localStorage.setItem("users", JSON.stringify(userRecords));
    window.location.href = "signin.html";
  }
}

function validateForm(fullname, email, phone, password, gender) {
  if (!fullname || !email || !phone || !password || !gender) {
    displayMessage("All fields are required.", "red");
    return false;
  }

  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!emailRegex.test(email)) {
    displayMessage("Invalid email address. Please enter a valid email.", "red");
    return false;
  } else if (!/^\d+$/.test(phone)) {
    displayMessage("Invalid phone number.", "red");
    return false;
  } else if (phone.length !== 10) {
    displayMessage("Phone number should be a 10-digit number.", "red");
    return false;
  }
  displayMessage("Success! Form data is valid.", "green");
  return true;
}

function displayRadioValue() {
  const gender = document.getElementsByName("gender");

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      return gender[i].value;
    }
  }
  return null;
}

function displayMessage(messageText, color) {
  const message = document.getElementById("message");
  const message_div = document.querySelector(".message-div");
  message_div.style.display = "block";
  message.textContent = messageText;
  message.style.color = color;
}
