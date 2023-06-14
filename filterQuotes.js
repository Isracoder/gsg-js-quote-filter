let div = document.querySelector(".box");
let quotes = [];
let arr = [];
getQuotes();
let apost = "’";
function main() {
	if (typeof document !== "undefined") {
		if (Object.keys(quotes).length == 0) {
			console.log("uh oh , an error has occured");
			div.innerHTML =
				"We are currently unable to display any quotes at the moment.";
		} else {
			let form = document.getElementById("form");
			let input = document.querySelector(".input");
			form.addEventListener("submit", (e) => {
				e.preventDefault();
				let value = input.value;
				// the apostrophe
				let newArr = [];
				quotes["quotes"].forEach((obj) => {
					if (
						obj.quote.toLowerCase().includes(value.toLowerCase()) ||
						obj.quote
							.toLowerCase()
							.includes(value.replace(/\'/g, apost))
					) {
						newArr.push(obj.quote + "- " + obj.author);
					}
				});
				onSuccess(newArr);
			});
		}
	}
}
// can be improved with async await syntax , however it's currently functioning without it
function getQuotes() {
	fetch("https://dummyjson.com/quotes", { method: "GET" })
		.then((res) => res.json())
		.then((ans) => {
			console.log(`ans ${ans.quotes[0]}`);
			quotes = ans;
			arr = cleanData(arr);
			onSuccess(arr);

			main();
		})
		.catch((err) => {
			console.log(`a ${err} has occured`);
			div.innerHTML =
				"We are currently unable to display any quotes at the moment.";
		});
}
function cleanData(arr) {
	for (let i = 0; i < quotes["quotes"].length; i++) {
		let str = quotes["quotes"][i].quote + " -" + quotes["quotes"][i].author;
		if (str[str.length - 1] == ",") console.log("comma");
		arr.push(str);
	}
	return arr;
}
function onSuccess(arr) {
	if (arr.length == 0) {
		div.innerHTML = "Sorry , no quotes contain that search";
		return;
	}
	let str = `<ul>
          ${arr.map((elem) => `<li>${elem}</li>`).join("")}
        </ul>`;
	div.innerHTML = str;
}
