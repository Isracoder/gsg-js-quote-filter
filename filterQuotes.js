let div = document.querySelector(".box");
let quotes = [];
let arr = [];
let error;
getQuotes();
//console.log(res) ;
function main() {
  // console.log("hi");
  //getQuotes() ;
  console.log("h");
  if (typeof document !== "undefined") {
    //console.log(quotes.length);
    //console.log(quotes) ;
    //console.log(Object.keys(quotes).length);
    if (Object.keys(quotes).length == 0) {
      console.log("uh oh , an error has occured");
      //console.log(error)
      div.innerHTML =
        "We are currently unable to display any quotes at the moment.";
    } else {
      let form = document.getElementById("form");
      let input = document.querySelector(".input");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        //console.log("prevented") ;
        let value = input.value;
        let newArr = [];
        quotes["quotes"].forEach((obj) => {
          if (obj.quote.toLowerCase().includes(value.toLowerCase())) {
            newArr.push(obj.quote + "- " + obj.author);
          }
        });
        onSuccess(newArr);
      });
    }
  }
}
var res;
function getQuotes() {
  fetch("https://dummyjson.com/quotes", { method: "GET" })
    .then((res) => res.json())
    .then((ans) => {
      console.log(`ans ${ans.quotes[0]}`);
      quotes = ans;
      arr = cleanData(arr);
      onSuccess(arr);
      //return ans ;

      //console.log(ans) ;
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
    //console.log(`str ${str}`) ;
  }
  return arr;
}
function onSuccess(arr) {
  //console.log(`arr ${arr}`) ;
  if (arr.length == 0) {
    div.innerHTML = "Sorry , no quotes contain that search";
    return;
  }
  let str = `<ul>
          ${arr.map((elem) => `<li>${elem}</li>`)}
        </ul>`;
  div.innerHTML = str;
}
