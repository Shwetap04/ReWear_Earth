function signUp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => alert("Signup: " + JSON.stringify(data)))
  .catch(err => alert("Signup failed"));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    alert("Login successful! Your user ID is: " + data.user_id);
    document.getElementById("userId").value = data.user_id;
  })
  .catch(err => alert("Login failed"));
}

function addItem() {
  const payload = {
    user_id: document.getElementById("userId").value,
    title: document.getElementById("itemTitle").value,
    size: document.getElementById("itemSize").value,
    description: document.getElementById("itemDesc").value,
    category: document.getElementById("itemCategory").value,
    type: document.getElementById("itemType").value,
    condition: document.getElementById("itemCondition").value,
    tags: document.getElementById("itemTags").value,
    image_url: document.getElementById("itemImage").value
  };

  fetch("http://localhost:3000/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => alert("Item added: " + JSON.stringify(data)))
  .catch(err => alert("Failed to add item"));
}
