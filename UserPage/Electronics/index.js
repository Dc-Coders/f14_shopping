// 

try {
    async function ElectronicProduct(){
        await fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products")
        .then(response => response.json())
        .then(data => createProduct(data))


        function createProduct(product) {

            let electronics = product.filter((item) => item.type == "electronics")

            let  productsDiv = document.querySelector("[data-products]");


            electronics.forEach((item) => {

                let discountAmount = (item.price * item.discount) / 100;
                let finalPrice = item.price - discountAmount;

                productsDiv.innerHTML += `
                <div class="product">
                    <img src="${item.img}" title="${item.name}" alt="${item.name}">
                    <h3 id="productName">${item.name}</h3>
                    <h4 id="productAbout">${item.about}</h4>
                    <div class="priceRow">
                    <h3 id="productOldPrice">$${item.price}</h3>
                    <h3 id="productNewPrice">$${finalPrice}</h3>
                 </div>
                </div>
                `;

            })
        }
    }

    ElectronicProduct();

} catch (e) {
    console.log(e.message);
    
}