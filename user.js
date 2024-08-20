


try{
    async function getUSer(){
        await fetch("https://66ab5539636a4840d7ca3261.mockapi.io/dcd/data")
        .then(res => res.json())
        .then(data => createUser(data))


        function createUser(data){
            let root = document.getElementById("root");
       
            data.map((item) =>{
                root.innerHTML += 
                `
                <div class="box">
                    <h1>${item.name}</h1>
                    <img src="${item.rasm}">
                    
                </div>
                `
                
            })

        }


    }
    getUSer()
}catch(e){
    console.log(e);
}

