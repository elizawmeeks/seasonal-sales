console.log("hihi");
var write = document.getElementById("stickItHere");
var productsArray = [];
var categoriesArray = [];

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
				productCard += `<div class="col s12">
								<div class="card grey lighten-3">
								<div class="card-content">
									<span class="card-title">${productsArray[i].name}</span>
									<p>${productsArray[i].price}</p>`;
				for (var j = 0; j < categoriesArray.length; j++){
					if (productsArray[i].category_id === categoriesArray[j].id){
						productCard +=	`<p>${categoriesArray[j].name}</p>
									</div>
									</div>
									</div>`;
					}
				}
				write.innerHTML += productCard;
			}
		}


		// for (i = 0; i < productsArray.length; i++){
		// }


		productsDataRequest.open("GET", "json/products.json");
		productsDataRequest.send();
}

categoriesDataRequest.open("GET", "json/categories.json");
categoriesDataRequest.send();
