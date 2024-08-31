try {
    async function createCars(){
        await fetch("https://66c4c4b2b026f3cc6cf09dde.mockapi.io/shopping")
        .then(res => res.json())
        .then(data => Cars(data))

        function Cars(moshin) {
            let length = document.querySelector(".length")
            length.innerHTML = moshin.length
        }
    }
    createCars()
}catch(e){
    alert("Qurilmangizdagi internet yoki wifi aloqasini tekshiring")
}