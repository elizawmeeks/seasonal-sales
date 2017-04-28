console.log("hihi");
var write = document.getElementById("stickItHere");
var productsArray = [];
var categoriesArray = [];
var button = document.getElementById("button");
var selectSale = document.getElementById("selectSale");
var errorNote = document.getElementById("errorNote");


// Get Categories Data

var categoriesDataRequest = new XMLHttpRequest();

categoriesDataRequest.addEventListener("load", cDataRequestComplete);
categoriesDataRequest.addEventListener("error", cDataRequestFailed);

var cDataRequestFailed = () => console.log("Uh oh, there was an error loading your data.");

function cDataRequestComplete (){
	var categoriesData = JSON.parse(event.target.responseText);
	// console.log("Categories", categoriesData);	
	for (var i = 0; i < categoriesData.categories.length; i++){	
		categoriesArray.push(categoriesData.categories[i]);
	}
		// Get Products Data, nested inside categories data request so that I can  access both the categories data and the products data. Javascript is weird.
		var productsDataRequest = new XMLHttpRequest();

		productsDataRequest.addEventListener("load", pDataRequestComplete);
		productsDataRequest.addEventListener("error", pDataRequestFailed);

		var pDataRequestFailed = () => console.log("Uh oh, there was an error loading your data.");

		function pDataRequestComplete(event){
			var productsData = JSON.parse(event.target.responseText);
			console.log("Products", productsData);
			for (i = 0; i < productsData.products.length; i++){
				// console.log("Product name: ", productsData.products[i].name, "Price: ", productsData.products[i].price);
				productsArray.push(productsData.products[i]);
			}
		console.log("categoriesArray ", categoriesArray);
		console.log("ProductsArray: ", productsArray);
			for (i = 0; i < productsArray.length; i++){
				var productCard = "";
				productCard += `<div class="card">
									<h3>${productsArray[i].name}</h3>
									<p>${productsArray[i].price}</p>`;
				for (var j = 0; j < categoriesArray.length; j++){
					if (productsArray[i].category_id === categoriesArray[j].id){
						productCard +=	`<p>${categoriesArray[j].name}</p>
						</div>`;
					}
				}
				write.innerHTML += productCard;
			}
			console.log("Am I Here?");
			// Sale info Event Listeners.
			button.addEventListener("click", function(event){
				// winter sales
				if (selectSale.value === "winter"){
					console.log("You selected Winter!!");
					errorNote.innerHTML = "";
					write.innerHTML = "";
					// Rewrite write.innerHTML
					for (i = 0; i < productsArray.length; i++){
						var productCard = "";
						// For Winter Sales
						if (productsArray[i].category_id === 1){
						productCard += `<div class="card">
											<h3>${productsArray[i].name}</h3>
											<p>${(productsArray[i].price-(productsArray[i].price * categoriesArray[0].discount)).toFixed(2)}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						// Leave the rest
						} else {
							productCard += `<div class="card">
									<h3>${productsArray[i].name}</h3>
									<p>${productsArray[i].price}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						}
						write.innerHTML += productCard;
					}		
				} else if (selectSale.value === "spring"){
					console.log("You selected spring!!");
					errorNote.innerHTML = "";
					write.innerHTML = "";
					// Rewrite write.innerHTML
					for (i = 0; i < productsArray.length; i++){
						var productCard = "";
						// For Spring Sales
						if (productsArray[i].category_id === 3){
						productCard += `<div class="card">
											<h3>${productsArray[i].name}</h3>
											<p>${(productsArray[i].price-(productsArray[i].price * categoriesArray[2].discount)).toFixed(2)}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						// Leave the rest
						} else {
							productCard += `<div class="card">
									<h3>${productsArray[i].name}</h3>
									<p>${productsArray[i].price}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						}
						write.innerHTML += productCard;
					}
				} else if (selectSale.value === "fall"){
					console.log("You selected fall!!");
					errorNote.innerHTML = "";
					write.innerHTML = "";
					// Rewrite write.innerHTML
					for (i = 0; i < productsArray.length; i++){
						var productCard = "";
						// For Winter Sales
						if (productsArray[i].category_id === 2){
						productCard += `<div class="card">
											<h3>${productsArray[i].name}</h3>
											<p>${(productsArray[i].price-(productsArray[i].price * categoriesArray[1].discount)).toFixed(2)}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						// Leave the rest
						} else {
							productCard += `<div class="card">
									<h3>${productsArray[i].name}</h3>
									<p>${productsArray[i].price}</p>`;
							for (var j = 0; j < categoriesArray.length; j++){
								if (productsArray[i].category_id === categoriesArray[j].id){
									productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>`;
								}
							}
						}
						write.innerHTML += productCard;
					}
				} else {
					errorNote.innerHTML = "Please make a sale selection!";
				}
			});

		}


		// for (i = 0; i < productsArray.length; i++){
		// }


		productsDataRequest.open("GET", "json/products.json");
		productsDataRequest.send();
}

categoriesDataRequest.open("GET", "json/categories.json");
categoriesDataRequest.send();
