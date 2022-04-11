let booklist = document.querySelector(".allbooks")
let loggInBtn = document.querySelector(".loggInBtn")
let loggInView = document.querySelector(".loggin")
let mainview = document.querySelector(".main")
let registreraATagg = document.querySelector(".registrera")
let registerView = document.querySelector(".registerView")
let h1 = document.querySelector("#h1")
let logginBtn = document.querySelector("#logginBtn")
let headerDiv = document.querySelector(".headerDiv")

let fetch = async (url) => {
let response = await axios.get(url)
let data = response.data.data
console.log(data)
}

let renderBooks = async () => {
let response = await axios.get("http://localhost:1337/api/books?populate=*");
let books = response.data.data

books.forEach(book => {
  // console.log(book.attributes.genrer.data.attributes.genrer)
  let li = document.createElement("li");
  li.innerHTML = 
  `
  <div class="bokinfo">
  <h4>${book.attributes.titel}</h4>
  <p>Författare: ${book.attributes.forfattare}</p>
  <p>Antal sidor: ${book.attributes.sidor}</p>
  <p>Genrer: ${book.attributes.genrer.data.attributes.genrer}</p>
  <p>Betyg: ${book.attributes.betyg}/10 </p>
  <div class="utlåning">
  <p>Lånas ut av: ${book.attributes.anvandare.data.attributes.Username}</p>
  <p>${book.attributes.anvandare.data.attributes.Email}</p>
  <div>
  </div>
  
  `
  let image = document.createElement("img")
  if(book.attributes.omslag.data){
    image.src = "http://localhost:1337" + book.attributes.omslag.data[0].attributes.url;
  }
  booklist.append(li)
  li.prepend(image)
  });

}

loggInBtn.addEventListener("click", () => {
if(loggInView.style.display = "none" )  {
  loggInView.style.display = "flex"
  mainview.style.display = "none"
} 
  registreraATagg.addEventListener("click",() => {
    loggInView.style.display = "none"
    registerView.style.display="flex"

  })
})
h1.addEventListener("click", () => {
  mainview.style.display = "flex"
  loggInView.style.display = "none"
  registerView.style.display="none"
})

renderBooks()

let login = async () => {
  console.log("hej")

  let username = document.querySelector("#logginAnvändarnamn").value
  let password = document.querySelector("#logginPassword").value;

  let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: username,
      password,
  });

  let token = response.data.jwt;
  sessionStorage.setItem("token", token);
}

logginBtn.addEventListener("click", () => {
  login()
})

let checkIfLoggedIn = () => {
  let token = sessionStorage.getItem("token")
  if(!token){
  headerDiv.innerHTML = 
  `
  <button id="minasidor">Mina sidor</button>
  `
  }
  let minSidaBtn = document.querySelector("#minasidor")

  minSidaBtn.addEventListener("click", () => {
    
  })
}

checkIfLoggedIn()