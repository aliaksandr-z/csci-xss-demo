function encodeInput(input) {
  return $("<div>").text(input).html();
}

function displayPost(item, isSearch) {
  const root = document.createElement("div");
  root.classList.add("single-post");

  const title = document.createElement("h3");
  title.innerHTML = `${item.title}`;

  const body = document.createElement("p");
  body.innerHTML = `${item.body}`;

  root.append(title, body);

  if (isSearch) {
    $(".search-results").append(root);
  } else $(".posts").append(root);
}

function displayPosts(data, isSearch) {
  var postCount;
  for (item of data) {
    displayPost(item, isSearch);
    postCount = data.length;
    document.getElementById("search-results-label").innerHTML =
      postCount + " result(s):";
  }
}

getAllPosts();
async function getAllPosts() {
  const response = await fetch("/api");
  const data = await response.json();
  displayPosts(data);
}

async function getPost() {
  const response = await fetch("/api");
  const data = await response.json();
  displayPost(data[data.length - 1]);
}

// when the switch is off, the input is not encoded
var isToggled = false;
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

const formPost = document.getElementById("form-post");
formPost.addEventListener("submit", function (event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;
  var data;

  // if switch is on, encode input
  if (isToggled) {
    title = encodeInput(title);
    body = encodeInput(body);
  }
  data = { title, body };

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

let params = new URL(document.location).searchParams;
//var search = params.get("search");
var search = document.location.search.substring(8);

console.log("search query:", search);
document.getElementById("search").value = search;

const formSearch = document.getElementById("form-search");
formSearch.addEventListener("submit", function (event, query) {
  event.preventDefault();
  search = document.getElementById("search").value;
  document.getElementById("search").value = search;
  console.log("search query:", search);

  const url = "/search?title=" + search + "&body=" + search;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("You searched: ", data);
      document.getElementById("search-results-label").style.visibility =
        "visible";
      $(".search-results").empty();
      displayPosts(data, true);
    });
});
