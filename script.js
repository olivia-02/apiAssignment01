document.addEventListener("DOMContentLoaded", function () {
	console.log("Ready!");
  });

  /*This section is to make the input boxes reactive to the input, trick by M. Boudad on dev.to */
const input1 = document.getElementById("ingredients");
const growspan1 = document.getElementById('growtext1');
const input2 = document.getElementById("query");
const growspan2 = document.getElementById('growtext2');
// Purpose of function is to take the input, throw it into a span, take the span width, and change the width of the text field. The span is kept off screen so it doesn't interfere with the style of the page.

//I had to repeat the function twice to allow for the input fields to work independantly. It's a shame CSS input fields don't have this property bult in.

input1.addEventListener('input', function() {
    growspan1.innerHTML = this.value.replace(/\s/g, '&nbsp;');
    this.style.width = growspan1.offsetWidth + 'px';
});

input2.addEventListener('input', function() {
    growspan2.innerHTML = this.value.replace(/\s/g, '&nbsp;');
    this.style.width = growspan2.offsetWidth + 'px';
});

  /*----------------*/
  /**/
let resultList = document.getElementById("results");
let submit = document.getElementById("submit");

submit.addEventListener("click", function() { 
	let i = input1.value,
		q = input2.value;
	if(i === "" && q === ""){
		alert("Please enter some ingredients and/or a key word")
	}
	else{
		fetch("https://recipe-puppy.p.rapidapi.com/?p=1&i="+ i +"&q=" + q, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "9fd06e701fmsh31f138d460d268ap167cb4jsnaf55589b7df9",
				"x-rapidapi-host": "recipe-puppy.p.rapidapi.com"
			}
		})
		.then((response) => response.json())
		.then(response => {
			input1.style.width = "";
			resultList.innerHTML = "";
			for (var i = 0; i < response.results.length; i++) {
				recipe = "<li><a href='" + response.results[i].href + "'>" + response.results[i].title + "</li>"
				resultList.innerHTML += recipe
			}
			console.log(response)
		})
		.catch(err => {
			console.error(err);
		});
	}


 }
)
