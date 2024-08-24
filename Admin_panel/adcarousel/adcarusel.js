let form = document.querySelector(".form");




form.addEventListener("submit", (e) =>{
  e.preventDefault();
  let inp = document.querySelector("input").value

  if (inp == ""){
    alert("Please write information in the input 😅")
  }else{
    let formData = new FormData(form);
    let data = Object.fromEntries(formData)
    
    
  
  
    fetch("https://66c4c4b2b026f3cc6cf09dde.mockapi.io/shopping",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    
  
  
    alert("Your product has been addes 😀");
    e.target.reset();
  }

})