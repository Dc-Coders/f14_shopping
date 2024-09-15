let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inp = document.querySelector("input").value;

    if (inp == "") {
        alert("Please write information in the input 😅");
    } else {
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);

        fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/corusel", {
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

async function delProduct() {
    try {
        let res = await fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/corusel");
        let data = await res.json();
        renderProducts(data);
    } catch (error) {
        alert("ERROR: " + error.message);
    }
}

function renderProducts(products) {
    let prodDiv = document.getElementById("products_panel");
    prodDiv.innerHTML = ""; 

    products.forEach(item => {
        prodDiv.innerHTML += `
            <div class="delete_product">
                <h3 class="pr_id">${item.id}</h3>
                <h3 class="pr_name">${item.name}</h3>
                <img src="${item.img}" alt="">
                <h3 class="pr_price">$${item.price}</h3>
                <button id="put_btn" onclick="putFunc(${item.id})">PUT</button>
                <button id="delete_btn" onclick="delFunc(${item.id})">DELETE</button>
            </div>
        `;
    });
}

delProduct();

document.querySelector(".del_inp input").addEventListener("input", function(e) {
    let searchValue = e.target.value.toLowerCase(); 
    let products = document.querySelectorAll("#products_panel .delete_product"); 

    products.forEach(product => {
        let name = product.querySelector(".pr_name").textContent.toLowerCase();
        if (name.includes(searchValue)) {
            product.style.display = "flex"; 
        } else {
            product.style.display = "none"; 
        }
    });
});


function delFunc(a) {
    let dels = confirm("Are you sure you want to delete it?");
    if (dels) {
        fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/corusel/${a}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(del => {
            console.log(del);
            delProduct(); 
        })
        .catch(error => alert("ERROR: " + error.message));
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

    fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/corusel/${id}`, {
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


document.querySelector(".back_put_form").addEventListener("click", function() {
    document.querySelector(".putProd").classList.remove("put_active");
});
