function signUp() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  fetch('http://localhost:3000/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: email, email, password: pass }) // use email as dummy name
  })
  .then(res => res.json())
  .then(data => {
    alert("Signup success! " + JSON.stringify(data));
    document.getElementById("formContainer").style.display = "block";
  })
  .catch(err => alert("Signup failed"));
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass })
  })
  .then(res => res.json())
  .then(data => {
    alert("Login successful! " + JSON.stringify(data));
    localStorage.setItem("user_id", data.user_id); // Save user ID for adding items
    document.getElementById("formContainer").style.display = "block";
  })
  .catch(err => alert("Login failed"));
}

function addItem() {
  const title = document.getElementById("itemTitle").value;
  const size = document.getElementById("itemSize").value;
  const desc = document.getElementById("itemDesc").value;
  const user_id = localStorage.getItem("user_id");

  fetch('http://localhost:3000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id,
      title,
      description: desc,
      size,
      category: "Clothing",
      type: "Women",
      condition: "Good",
      tags: "Casual",
      image_url: ""
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Item added successfully! " + JSON.stringify(data));
  })
  .catch(err => alert("Failed to add item."));
}
