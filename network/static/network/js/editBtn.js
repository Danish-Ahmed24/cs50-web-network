document.addEventListener("DOMContentLoaded", () => {
	const btnEdit = document.querySelectorAll(".btn-edit");
	btnEdit.forEach((element) => {
		element.addEventListener("click", (e) => {
			btnId = element.dataset.id;
			postContent = element.dataset.content;
			console.log("updating " + btnId + " content: " + postContent);
			post = element.closest(".card");

			post.querySelector(".update").style = "display : block;";
			post.querySelector(".update").querySelector("textarea").value =
				postContent;
			post.querySelector(".default").style = "display : none;";

			// add save button here
			post
				.querySelector(".update")
				.querySelector("#save")
				.addEventListener("click", () => {
					newContent = post
						.querySelector(".update")
						.querySelector("textarea").value;
					post.querySelector(".update").style = "display : none;";
					post.querySelector(".default").style = "display : block;";
					post
						.querySelector(".default")
						.querySelector("#post-content").innerHTML = newContent;
					var postId = post.querySelector(".update").querySelector("#save")
						.dataset.id;

					fetch(`edit_post/${postId}`, {
						method: "POST",
						headers: {
							"X-CSRFToken": getCookie("csrftoken"), // Important!
							"Content-Type": "application/json",
						},
						body: JSON.stringify({newContent: newContent})
					})
						.then((response) => response.json())
						.then((json) => console.log(json));
				});
		});
	});
});

function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");
		for (let cookie of cookies) {
			cookie = cookie.trim();
			if (cookie.startsWith(name + "=")) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
