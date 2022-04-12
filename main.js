let booklist = document.querySelector(".allbooks")
let ljudbokslist = document.querySelector(".allljudboks")
let loggInBtn = document.querySelector(".loggInBtn")
let loggInView = document.querySelector(".loggin")
let mainview = document.querySelector(".main")
let registreraATagg = document.querySelector(".registrera")
let registerView = document.querySelector(".registerView")
let h1 = document.querySelector("#h1")
let logginBtn = document.querySelector("#logginBtn")
let header = document.querySelector(".header")
let headerDiv = document.querySelector(".headerDiv")
let minasidorView = document.querySelector(".minasidorView")
let addljudbokview = document.querySelector(".addljudbokview")
let addbokview = document.querySelector(".addbokview")



let registerbtn = document.querySelector("#registerbtn")

let registerUser = async () => {
  let registerUsername = document.querySelector("#reganvändarnamn")
  let registerEmail = document.querySelector("#regEmail")
  let registerPassword = document.querySelector("#regPassword") 
  console.log(registerPassword.value);

  await axios.post('http://localhost:1337/api/auth/local/register', {
          username: registerUsername.value,
          email: registerEmail.value,
          password: registerPassword.value,
    });
}


let renderBooks = async (vart) => {
let response = await axios.get(`http://localhost:1337/api/books?populate=*`);
let books = response.data.data
addljudbokview.style.display = "none"
addbokview.style.display = "none"


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
  <p>Lånas ut av: ${book.attributes.user.data.attributes.username}</p>
  <p>${book.attributes.user.data.attributes.email}</p>
  <div>
  </div>
  
  `
  let image = document.createElement("img")
  if(book.attributes.omslag.data){
    image.src = "http://localhost:1337" + book.attributes.omslag.data[0].attributes.url;
  }
  vart.append(li)
  li.prepend(image)
  });

} 
let renderPrivateBooks = async (vart) => {
  let response = await axios.get(`http://localhost:1337/api/books?populate=*`);
  let books = response.data.data
  let username = sessionStorage.getItem("username")

  books.forEach(book => {
    if(book.attributes.user.data.attributes.username == username){
      let li = document.createElement("li");
      li.innerHTML = 
      `
      <div class="bokinfo">
      <h4>${book.attributes.titel}</h4>
      <p>Författare: ${book.attributes.forfattare}</p>
      <p>Antal sidor: ${book.attributes.sidor}</p>
      <p>Genrer: ${book.attributes.genrer.data.attributes.genrer}</p>
      <p>Betyg: ${book.attributes.betyg}/10</p>
      </div>
      
      `
      let image = document.createElement("img")
      if(book.attributes.omslag.data){
        image.src = "http://localhost:1337" + book.attributes.omslag.data[0].attributes.url;
      }
      vart.append(li)
      li.prepend(image)
      };
    })  
}
let renderLjudBooks = async (vart) => {
  let response = await axios.get(`http://localhost:1337/api/ljudboks?populate=*`);
  let books = response.data.data
  
  books.forEach(book => {
    // console.log(book.attributes.genrer.data.attributes.genrer)
    let li = document.createElement("li");
    li.innerHTML = 
    `
    <div class="bokinfo">
    <h4>${book.attributes.titel}</h4>
    <p>Utgivningsdatum: ${book.attributes.utgivningsdatum}</p>
    <p>Längd: ${book.attributes.minuter} minuter</p>
    <p>Genrer: ${book.attributes.genrer.data.attributes.genrer}</p>
    <p>Betyg: ${book.attributes.betyg}/10 </p>
    <div class="utlåning">
    <p>Lånas ut av: ${book.attributes.user.data.attributes.username}</p>
    <p>${book.attributes.user.data.attributes.email}</p>
    <div>
    </div>
    
    `
    let image = document.createElement("img")
    if(book.attributes.omslag.data){
      image.src = "http://localhost:1337" + book.attributes.omslag.data.attributes.formats.thumbnail.url;
    }
    vart.append(li)
    li.prepend(image)
    });
  
} 
let renderPrivateLjudBooks = async (vart) => {
    let response = await axios.get(`http://localhost:1337/api/ljudboks?populate=*`);
    let books = response.data.data
    let username = sessionStorage.getItem("username")
  
    books.forEach(book => {
      if(book.attributes.user.data.attributes.username == username){
        let li = document.createElement("li");
        li.innerHTML = 
        `
        <div class="bokinfo">
        <h4>${book.attributes.titel}</h4>
        <p>Utgivningsdatum: ${book.attributes.utgivningsdatum}</p>
        <p>Antal minuter: ${book.attributes.minuter}</p>
        <p>Genrer: ${book.attributes.genrer.data.attributes.genrer}</p>
        <p>Betyg: ${book.attributes.betyg}/10</p>
        </div>
        
        `
        let image = document.createElement("img")
        if(book.attributes.omslag.data){
          image.src = "http://localhost:1337" + book.attributes.omslag.data.attributes.formats.thumbnail.url;
        }
        vart.append(li)
        li.prepend(image)
        };
      })  
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
  registerView.style.display = "none"
  minasidorView.style.display = "none"
})


renderBooks(booklist) 
renderLjudBooks(ljudbokslist)

let login = async () => {

  let username = document.querySelector("#logginAnvändarnamn").value
  let password = document.querySelector("#logginPassword").value;

  let response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: username,
      password,
  });

  let token = response.data.jwt;
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username)
}

let checkIfLoggedIn = () => {
  let token = sessionStorage.getItem("token")
  if(token){
  
  header.innerHTML = 
  `
  <div>
  <h1 id="h1">BookDucks</h1>
  </div>
  <div id="länkdiv">
  <button id="addljudbok">Lägg till ljudbok</button>
  <button id="addbok">Lägg till bok</button>
  </div>
  <div class="headerDiv">
  <button class="minasidor">Mina sidor</button>
  </div>
  `
  document.querySelector("#addljudbok").addEventListener("click", () => {
  
  })
  document.querySelector("#addljudbok").addEventListener("click", () => {
    mainview.style.display = "none"
    loggInView.style.display = "none"
    minasidorView.style.display = "none"
    registerView.style.display = "none"
    addljudbokview.style.display = "none"
    addbokview.style.display = "flex"
  })

  document.querySelector(".minasidor").addEventListener("click", () => {
    mainview.style.display = "none"
    loggInView.style.display = "none"
    minasidorView.style.display = "flex"
    registerView.style.display = "none"

  
  
    let users = async () => {
      let response = await axios.get("http://localhost:1337/api/users")
      let data = response.data
    
      data.forEach(user => {
        let username = sessionStorage.getItem("username")
        
        let d = new Date(user.createdAt)

        if(username === user.username) {
          minasidorView.innerHTML = 
          `
          <h2>Min sida</h2>
          <div class="infowrapper">
            <div class="minSidaInfo">
              <h3>Mina uppgifter:</h3>
              <p>Namn: ${user.username}</p>
              <p>Email: ${user.email}</p>
              <p>Ditt ID: ${user.id}</p>
              <p>Du skapade din användare: ${d.getDate()}-${d.getMonth()}-${d.getYear()}</p>
            </div>
            <div id="användarbok">
              <h3>Dina lånade böcker och ljudböcker:</h3>
              <ul id="användarböcker"></ul>
              <ul id="användarljudböcker"></ul>
            </div>
          </div>
          `
          let användarlistan = document.querySelector("#användarböcker")
          renderPrivateBooks(användarlistan)
          let användarljudlistan = document.querySelector("#användarljudböcker")
          renderPrivateLjudBooks(användarljudlistan)
          ;
        }
      })
    }
    users()
    })
  }
}
checkIfLoggedIn()


logginBtn.addEventListener("click", async () => {
  await login()
  checkIfLoggedIn()

  mainview.style.display = "flex"
  loggInView.style.display = "none"
  minasidorView.style.display = "none"
  registerView.style.display = "none"
})

registerbtn.addEventListener("click", () => {
  registerUser();
  alert("Din användare är skapad, Logga in på nästa sida")

    mainview.style.display = "flex"
    loggInView.style.display = "none"
    minasidorView.style.display = "none"
    registerView.style.display = "none"
})