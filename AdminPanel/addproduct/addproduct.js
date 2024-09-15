
let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inp = document.querySelector("input").value;

  if (inp === "") {
    alert("Please write information in the input 😅");
  } else {
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);

    fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => console.log(data));

    alert("Your product has been added 😀");
    e.target.reset();
  }
});


let productSearch = [];

const searchInp = document.querySelector("[data-search]");

searchInp.addEventListener("input", f => {
  const searchProd = f.target.value.toLowerCase();
  document.querySelectorAll('.deleteProduct').forEach(prod => {
    const isVisible = prod.querySelector('.pr_name').textContent.toLowerCase().includes(searchProd);
    prod.classList.toggle("hide", !isVisible);
  });
});

async function delProduct() {
  try {
    let response = await fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products");
    let products = await response.json();

    productSearch = products;

    let prodDiv = document.getElementById("products_panel");
    prodDiv.innerHTML = '';

    products.forEach(item => {
      prodDiv.innerHTML += `
        <div class="deleteProduct">
          <h3 class="pr_id">${item.id}</h3>
          <h3 class="pr_name">${item.name}</h3>
          <img src="${item.img}" alt="">
          <h3 class="pr_price">$${item.price}</h3>
          <button id="put_btn" onclick="putFunc(${item.id})">PUT</button>
          <button id="delete_btn" onclick="delFunc(${item.id})">DELETE</button>
        </div>
      `;
    });
  } catch (e) {
    alert("ERROR");
  }
}


function delFunc(id) {
  let dels = confirm("Are you sure you want to delete it?");
  if (dels) {
    fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(del => {
        console.log(del);
        delProduct(); 
      });
  }
}

function putFunc(id) {
  console.log(id);

  let putProd = document.querySelector(".putProd");
  putProd.classList.add("put_active");

  let putForm = document.querySelector(".putProd");
  putForm.addEventListener("submit", (s) => {
    s.preventDefault();
    let putFormData = new FormData(putForm);
    let putData = Object.fromEntries(putFormData);

    fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(putData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        delProduct();
      });

    s.target.reset();
    putProd.classList.remove("put_active");
  });
}

document.querySelector(".back_put_form").addEventListener("click", function () {
  let putProd = document.querySelector(".putProd");
  putProd.classList.remove("put_active");
});

delProduct();
