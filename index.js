




let form = document.querySelector(".form");


form.addEventListener("submit", (e) =>{
  e.preventDefault()


  let formData = new FormData(form);
  let data = Object.fromEntries(formData)

  fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/data",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => console.log(data))
  


})



// const form = document.querySelector(".form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (e == "") {
//     alert("Your input empty 😔");
//   } else {
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);
  
//     fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err));

//     alert("You succes sent your information 🎉");
//     e.target.reset();
//   }
// });
