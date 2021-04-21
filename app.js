// dummy posts
var postsDummy = [
  { title: "Test title 1", body: "Body test 1" },
  { title: "Test title 2", body: "Body test 2" },
];

var posts = [];

function showPostsDummy() {
  for (var i = 0; i < postsDummy.length; i++) {
    var html =
      "<div class='single-post'><h3>" +
      postsDummy[i].title +
      "</h3><p>" +
      postsDummy[i].body +
      "</p></div>";
    $(".posts").append(html);
  }
}

function showPosts() {
  for (var i = 0; i < posts.length; i++) {
    var html =
      "<div class='single-post'><h3>" +
      posts[i].title +
      "</h3><p>" +
      posts[i].body +
      "</p></div>";
    $(".posts").append(html);
  }
}

showPostsDummy();

var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;
  console.log(title);
  console.log(body);

  posts.push({ title: title, body: body });
  showPosts();
});
