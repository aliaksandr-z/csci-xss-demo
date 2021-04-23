function encodeInput(input) {
  return $("<div>").text(input).html();
}

getAllPosts();

async function getAllPosts() {
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    const root = document.createElement("div");
    root.classList.add("single-post");

    const title = document.createElement("h3");
    title.innerHTML = `${item.title}`;

    const body = document.createElement("p");
    body.innerHTML = `${item.body}`;

    root.append(title, body);
    $(".posts").append(root);
  }
}

async function getPost() {
  const response = await fetch("/api");
  const data = await response.json();

  const root = document.createElement("div");
  root.classList.add("single-post");

  const title = document.createElement("h3");
  title.innerHTML = `${data[data.length - 1].title}`;

  const body = document.createElement("p");
  body.innerHTML = `${data[data.length - 1].body}`;

  root.append(title, body);
  $(".posts").append(root);
}

var isToggled = false;

// when the switch is off, the input is not encoded
function toggle() {
  if (!isToggled) {
    isToggled = true;
    document.getElementById("output").innerHTML =
      "Switched On: Input is encoded";
  } else {
    isToggled = false;
    document.getElementById("output").innerHTML = "Switched Off: Vulnerable";
  }
}

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;
  var data;

  if (isToggled) {
    title = encodeInput(title);
    body = encodeInput(body);
    data = { title, body }; // encoded
  } else {
    data = { title, body }; // vulnerable
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("/api", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("You posted: ", data);
    });

  getPost();
});
