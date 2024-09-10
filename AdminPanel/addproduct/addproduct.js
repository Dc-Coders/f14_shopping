let form = document.querySelector(".form");




form.addEventListener("submit", (e) =>{
  e.preventDefault();
  let inp = document.querySelector("input").value

  if (inp == ""){
    alert("Please write information in the input 😅")
  }else{
    let formData = new FormData(form);
    let data = Object.fromEntries(formData)
    
    
  
  
    fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    
  
  
    alert("Your product has been added 😀");
    e.target.reset();
  }

})





try {
  async function delProduct(){
      await fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products")
      .then(res => res.json())
      .then(data => {


        
        
        
        data.forEach((item) => {
          
            let prodDiv = document.getElementById("products_panel")
          prodDiv.innerHTML +=`
              <div class="delete_product">
              <h3 class="pr_id">${item.id}</h3>
              <h3 class="pr_name">${item.name}</h3>
              <img src="${item.img}" alt="">
              <h3 class="pr_price">$${item.price}</h3>
              <button id="put_btn" onclick="putFunc(${item.id})">PUT</button>
              <button id="delete_btn" onclick="delFunc(${item.id})">DELETE</button>
              </div>
                 `;
                 
          })
          
      })
    
    }
    
  delProduct()
}catch(e){
  alert("ERROR")
}





function delFunc(a){
  let dels = confirm("Are you sure you want to delete it ?")
  if(dels){
    fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products/${a}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(del => console.log(del))


    a.target.reset()
      }else{

      }
    }




    function putFunc(id){
      console.log(id);


      let putProd = document.querySelector(".putProd");

      putProd.classList.add("put_active")

      let putForm = document.querySelector(".putProd");
      putForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        let putInp = document.querySelector(".put-input").value
      
        if (putInp == ""){
          alert("Please write information in the input 😅")
        }else{
          let putFormData = new FormData(putForm);
          let putData = Object.fromEntries(putFormData)
          
          
        
        
          fetch(`https://66ab5539636a4840d7ca3261.mockapi.io/dcd/products/${id}`,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(putData),
          })
          .then(res => res.json())
          .then(data => console.log(data));
          
        
        
          alert("Your product has been added 😀");
          e.target.reset();
        }
      
      })


    }


document.querySelector(".back_put_form").addEventListener("click",function(){
  let putProd = document.querySelector(".putProd");

  putProd.classList.remove("put_active")
})