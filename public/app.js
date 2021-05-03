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
  for (item of data) {
    displayPost(item, isSearch);
  }
}

getAllPosts();
async function getAllPosts() {
  const response = await fetch("/api");
  if (response.status === 200) {
    const data = await response.json();
    displayPosts(data);
  }
}

async function getPost() {
  const response = await fetch("/api");
  if (response.status === 200) {
    const data = await response.json();
    displayPost(data[data.length - 1]);
  }
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
  console.log("title:", typeof title, title);
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

function getSearchResults(search) {
  const url = "/search?title=" + search + "&body=" + search;
  console.log("url:", url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(".search-results").empty();
      console.log("Search results: ", data);
      document.getElementById("search-results-label").style.visibility =
        "visible";
      document.getElementById("search-results-label").innerHTML =
        data.length + " result(s) for " + search;
      // document.getElementById("search-results-label").innerHTML =
      //   data.length + " result(s) for " + encodeInput(search);
      displayPosts(data, true);
    });
}

// let params = new URL(document.location).searchParams;
// var search = params.get("search");
function getQueryString() {
  var qs = document.location.search;
  qs = qs.split("=");
  qs = decodeURIComponent(qs[1]);
  return qs;
}

$(document).ready(function () {
  var search = getQueryString();
  if (search != "undefined") {
    document.getElementById("search").value = search;
    getSearchResults(search);
  }
});

const formSearch = document.getElementById("form-search");
formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  search = document.getElementById("search").value;
  //document.getElementById("search").value = search;
  getSearchResults(search);
});
