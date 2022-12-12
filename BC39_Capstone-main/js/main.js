
function sideNav() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "block";
    document.getElementsByClassName("side-nav")[0].style.right = "0";
}

function closed() {
    document.getElementsByClassName("purchase-cover")[0].style.display = "none";
    document.getElementsByClassName("side-nav")[0].style.right = "-100%";
};

const getAPI = new GetAPI();

getLocalStorage();

const getEle = (id) => document.getElementById(id);
// Lấy Dữ Liệu Từ API
const getListProduct = () => {
    var promise = getAPI.getListAPI()
        .then(result => {
            if (result.statusText === "OK") {
                return result.data;
            };
        })
        .catch(Error => console.log(Error))
    return promise;
};
// Render
const renderHTML = (data) => {
    let result = "";

    if (data && data.length > 0) {
        data.forEach((product, index) => {
            if (product.type === "Iphone") {
                result += `
            <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-apple"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img"
                                src="${product.img}"
                                alt="">
                            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button onclick="changeHeart('${index}')" id="heart" class="heart"><i class="fas fa-heart"></i></button>
                            </div>
                            <div class="wrapper">
                                <h5>${product.desc}</h5>
                                <p>Screen: ${product.screen}
                                <br>BackCamera: ${product.backCamera}
                                <br>FontCamera: ${product.frontCamera}
                                </p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">$ ${product.price}</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem('${index}')" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>`;

            } else {
                result += `
            <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-android"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img"
                                src="${product.img}"
                                alt="">
                            <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button onclick="changeHeart('${index}')" id="heart" class="heart"><i class="fas fa-heart"></i></button>
                            </div>
                            <div class="wrapper">
                                <h5>${product.desc}</h5>
                                <p>Screen: ${product.screen}
                                <br>BackCamera: ${product.backCamera}
                                <br>FontCamera: ${product.frontCamera}
                                </p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">$ ${product.price}</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem('${index}')" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>`;

            }

        });
        document.getElementById("renderProduct").innerHTML = result;
    }
};
// Hiển Thị Dữ Liêu Từ API và render lên HTML
async function mySelect() {
    let data = await getListProduct();
    var typeOfProduct = document.getElementById("selection").value;
    let All = data;
    let Iphone = data.filter(product => product.type === "Iphone")
    let Samsung = data.filter(product => product.type === "Samsung")
    if (typeOfProduct == 0) {
        renderHTML(All);
    } else if (typeOfProduct == 1) {
        renderHTML(Iphone);
    } else if (typeOfProduct == 2) {
        renderHTML(Samsung);
    };
};
mySelect();


function changeHeart(index) {
    var listHearts = document.getElementsByClassName("heart");
    if (listHearts[index].classList.length > 1) {
        listHearts[index].classList.remove("fav");
    } else {
        listHearts[index].classList.add("fav");
    };
};

let cart = (data) => {
    let cartitem =""
    data.forEach ((product, index) => {
        cartitem += `
        
         `
    })

}
const addItem = (id) => {
    var product = new Product("", tenSP, gia, hinhAnh, moTa);

    productService
      .addProductApi(product)
      .then(function (result) {
        alert("Add Success!");
        getListProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
}

const renderCart = (data) => {
    let result = ""
    if (data && data.length > 0) {
        data.forEach((product , index) => {
            result +=`
            <tr>
            <td><h4>${product.id}</h4><td>
            <td><h4>${product.name}</h4>td>
            <td><h4>${product.price}</h4>td>
            <div class="buttons_added">
  <input class="minus is-form" type="button" value="-">
  <input aria-label="quantity" class="input-qty" max="Số tối đa" min="Số tối thiểu" name="" type="number" value="">
  <input class="plus is-form" type="button" value="+">
</div>
<button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
    
            </tr>
            `











            setLocalStorage();
    })
    }
}


document.getElementsByClassName("buy")[0].onclick = () => {
    clearData();

};

document.getElementsByClassName("buy")[0].onclick = () => {
    clearData();
    renderCart();
};

function deleteProduct(id) {
    productService
      .deleteProductApi(id)
      .then(function (result) {
        alert("Delete Success!");
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }