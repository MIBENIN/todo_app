document.getElementById("signinform").addEventListener("submit", function (e) {
  e.preventDefault();
  const Email = document.getElementById("email").value;
  const Password = document.getElementById("password").value;

  const formValid = validateForm(Email, Password);
  if (formValid) {
    const userExists = verifyUser(Email, Password);
    if (userExists) {
      displayMessage("Logged In Successfully", "green");
      window.location.href = "todo.html";
    } else {
      displayMessage("Wrong Credentials.", "red");
    }
  }
});

function validateForm(email, password) {
  if (!email || !password) {
    displayMessage("All fields are required.", "red");
    return false;
  }

  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  if (!emailRegex.test(email)) {
    displayMessage("Invalid email address. Please enter a valid email.", "red");
    return false;
  }
  displayMessage("Successfully logged in.", "green");
  return true;
}

function verifyUser(email, password) {
  const userData = localStorage.getItem("users");
  const parsedUserData = JSON.parse(userData);
  for (const user of parsedUserData) {
    if (user.email === email && user.password === password) {
      return true;
    }
  }
  return false;
}

function displayMessage(messageText, color) {
  const message = document.getElementById("message");
  const message_div = document.querySelector(".message-div");
  message_div.style.display = "block";
  message.textContent = messageText;
  message.style.color = color;
}
