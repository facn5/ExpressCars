const fetchLogin = (username, password, cb) => {
  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ pass: password, user: username })
  })
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => console.log(err));
};

const fetchCheck = cb => {
  fetch("/checkauth")
    .then(res => res.json())
    .then(data => cb(data))
    .catch(err => console.log(err));
};
