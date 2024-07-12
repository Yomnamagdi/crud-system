var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCatInput = document.getElementById("productCat");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");
var productList = [];
var searchInput = document.getElementById("searchInput");



 function addProduct(){
  if(
    validationInputs(productNameInput , "msgName") &&
    validationInputs(productPriceInput , "msgPrice") &&
    validationInputs(productDescInput , "msgDesc") &&
    validationInputs(productImageInput , "msgImg") &&
    validationInputs(productCatInput , "msgCat") 


  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCatInput.value,
      description: productDescInput.value,
      image: productImageInput.files[0]?.name?`images/${productImageInput.files[0]?.name}`:`images/OIF.jpg`,
    };
    productList.push(product);
  displayData();
  localStorage.setItem("productsContainer", JSON.stringify(productList));
  
  
  clearForm();
  }
 }
// Clear Form
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productImageInput.value = null;
  productDescInput.value = null;
  productCatInput.value = null;
}



function deleteItem(indexItem) {
  productList.splice(indexItem, 1);
  localStorage.setItem("productsContainer", JSON.stringify(productList));
  displayData();
  console.log(productList);
}

function displayData() {
  var term = searchInput.value;
  var cartona = "";

  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      cartona += `<tr>
      <td>${i}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].description}</td>
      <td>
      <img width="100px"  src="${productList[i].image}" alt="product">
      </td>
      <td><button class="btn btn-warning btn-sm">Update</button>
      <button onclick="deleteItem(${i})"  class="btn btn-danger btn-sm">Delete</button>
      </td>
      </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = cartona;
}
// Validation -- Regex
function validationInputs(element , msgId){
   var text = element.value;
   var regex = {
    productName: /^[A-Z][a-z]{3,8}$/,
    productPrice: /^[1-9]{2,5}$/i,
    productCat: /^(tv|mobile|labtop)$/i,
    productDesc:/^.{3,}$/m,
    productImage:/^.{1,}\.(jpg|png|avif|jpeg|svg)$/
   }

   var msg = document.getElementById(msgId)

   if(regex[element.id].test(text) == true ){
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    msg.classList.add('d-none');
    return true;

   }else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    msg.classList.remove('d-none');
    return false;
   }
}

// localStorage.setItem("username ", "ahmed")
// localStorage.getItem("username")
// localStorage.removeItem("username")
// localStorage.length
// localStorage.clear();
