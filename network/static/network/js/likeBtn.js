document.addEventListener("DOMContentLoaded", () => {
  const csrftoken = getCookie("csrftoken");

  document.querySelectorAll(".btn-toggle-like").forEach(button => {
    button.addEventListener("click", () => {
      const postId = button.dataset.id;

      fetch(`/like/${postId}`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken
        }
      })
      .then(response => response.json())
      .then(data => {
        // ✅ Update like count
        const likesElement = document.querySelector(`#likes-count-${postId}`);
        if (likesElement) {
          likesElement.innerText = `${data.likes_count} ❤️`;
        }

        // ✅ Toggle button text
        if (data.message === "Liked successfully" || data.message === "Liked") {
          button.innerText = "Unlike 💔";
        } else {
          button.innerText = "Like ❤️";
        }
      });
    });
  });
});

// Django CSRF helper
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}