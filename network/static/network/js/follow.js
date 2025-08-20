document.addEventListener("DOMContentLoaded", () => {
	const follow_or_unfollow_btn = document.querySelector(
		"#follow_or_unfollow_btn"
	);
	const following_count = document.querySelector("#following-count");
	const followers_count = document.querySelector("#followers-count");

	follow_or_unfollow_btn.addEventListener("click", () => {
		if (follow_or_unfollow_btn.innerHTML.trim().toLowerCase() == "follow") {
			fetch(`/follow/${follow_or_unfollow_btn.dataset.author}`, {
				method: "POST",
				headers: {
					"X-CSRFToken": getCookie("csrftoken"), // Important!
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((json) => console.log(json));

			follow_or_unfollow_btn.innerHTML = "unfollow";
			followers_count.innerHTML = `${parseInt(followers_count.innerHTML) + 1}`;
		} else {
			fetch(`/unfollow/${follow_or_unfollow_btn.dataset.author}`, {
				method: "POST",
				headers: {
					"X-CSRFToken": getCookie("csrftoken"), // Important!
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((json) => console.log(json));
			follow_or_unfollow_btn.innerHTML = "follow";
			followers_count.innerHTML = `${parseInt(followers_count.innerHTML) - 1}`;
		}
	}); //toggle follow and unfollow
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
