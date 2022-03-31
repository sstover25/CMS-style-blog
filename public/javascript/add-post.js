function openForm(event) {
  let i, newPostContainer, newPost;

  newPostContainer = document.getElementsByClassName("new-post-container");
  for (i = 0; i < newPostContainer.length; i++) {
    newPostContainer[i].style.display = "none";
  }

  newPost = document.getElementsByClassName("newpost");
  for (i = 0; i < newPost.length; i++) {
    newPost[i].className = newPost[i].className.replace("active", "");
  }

  document.getElementById("NewPost").style.display = "flex";
  event.currentTarget.className += "active";
}

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('input[name="post-text"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
