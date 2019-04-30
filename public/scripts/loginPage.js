const loginButton = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const announceTxt = document.getElementById("Announce");
const passwordInput = document.getElementById("pwd");

loginButton.addEventListener("click", event => {
  event.preventDefault();

  if (usernameInput.value) {
    if (passwordInput.value) {
      fetchLogin(usernameInput.value, passwordInput.value, loginFetchReponse);
    } else changeAnnounceText("Password cannot be empty!", "red");
  } else changeAnnounceText("Username cannot be empty!", "red");
});

const changeAnnounceText = (string, color) => {
  announceTxt.innerText = string;
  announceTxt.style.color = color;
};

const loginFetchReponse = data => {
  changeAnnounceText(data.msg, data.color);
  console.log(data.msg);

  if (data.color === "green")
    setTimeout(() => {
      location.href = "/home";
    }, 1500);
};
