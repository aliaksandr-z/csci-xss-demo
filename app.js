function encodeInput(input) {
  return $("<div>").text(input).html();
}

var posts = [];

function showPosts() {
  for (var i = 0; i < posts.length; i++) {
    var html =
      "<div class='single-post'><h3>" +
      posts[i].title +
      "</h3><p>" +
      posts[i].body +
      "</p></div>";
  }
  $(".posts").append(html);
}

const form = document.getElementById("form");
var validTitle = true;
var validBody = true;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;

  // console.log(title, escape(title));
  // console.log(body, escape(body));

  validateInput(title, body);

  posts.push({ title: encodeInput(title), body: encodeInput(body) });
  //posts.push({ title: escape(title), body: escape(body) });
  //posts.push({ title: title, body: body });
  showPosts();
});

function validateInput(str1, str2) {
  console.log(str1, str2);
  if (str1.trim() === "") {
    setError(title, "Title cannot be blank.");
  }

  if (str2.trim() === "") {
    setError(body, "Body cannot be blank.");
  }
}

function setError(input, message) {
  const formInput = input.parentElement;
  const p = formInput.querySelector("p");
  p.innerText = message;
  formInput.className = "form-input error";
}
