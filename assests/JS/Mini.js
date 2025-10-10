
let productDetails = [];
// getting JSON data for the combined Mini page
async function initSlider() {
        const response = await fetch('/MiniProject/assests/JSON/Mini.json');
        productDetails = await response.json();
    
    const urls = new URLSearchParams(window.location.search);
    let desiredCategory = urls.get('category');
    if (!desiredCategory) {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('dresses')) desiredCategory = 'Dresses';
        else if (path.includes('mobile')) desiredCategory = 'Mobiles';
        else if (path.includes('headset')) desiredCategory = 'Headsets';
        else if (path.includes('laptop')) desiredCategory = 'Laptops';
        else if (path.includes('login')) desiredCategory = 'login';
        else desiredCategory = null; // show all
    }

    const itemsToRender = desiredCategory ? productDetails.filter(p => p.category && p.category.toLowerCase() === desiredCategory.toLowerCase()) : productDetails;
    console.debug('Mini.js: desiredCategory=', desiredCategory, 'itemsToRender=', itemsToRender.length);
    displayCards(itemsToRender, desiredCategory);
}

document.addEventListener('DOMContentLoaded', initSlider);


// let productDetails = [];
 
// async function initSlider() {
//   const response = await fetch('/MiniProject/assets/JSON/Mini.json');
//   productDetails = await response.json();
 
//   // Get current page path
//   const path = window.location.pathname.toLowerCase();
 
//   // Simple category detection
//   let category = null;
//   if (path.includes('dresses')) category = 'Dresses';
//   else if (path.includes('mobile')) category = 'Mobiles';
//   else if (path.includes('headset')) category = 'Headsets';
//   else if (path.includes('laptop')) category = 'Laptops';
//   else category = null; // show all if nothing matches
 
//   // Filter products by category (if any)
//   const items = category
//     ? productDetails.filter(p => p.category?.toLowerCase() === category.toLowerCase())
//     : productDetails;
 
//   // Show the products
//   displayCards(items, category);
// }
 
// // Run when the page is ready
// document.addEventListener('DOMContentLoaded', initSlider);


// display data starts here
function displayCards(items, shownCategory){
    let insert = '';
    const prod = items || [];
    if (shownCategory) {
        const heading = document.getElementById('category-heading');
        if (heading) heading.textContent = shownCategory;
    }
    prod.forEach((card) =>{
        const price = Number(card.price) || 0;
        const disc = parseInt(card.discount) || 0;
        const discountedPrice = Math.round(price - (price * disc/100));
        const starCount = Math.max(0, Math.min(5, Math.round(Number(card.rating) || 0)));
        const stars = starRepeat(starCount);

        let imgSrc = (card.img || '').toString();

        insert += `<div class="swiper-slide pt-5">
                                                <div class="card product-card rounded-0 pt-3 pb-2">
                                                        <div class="img-wrap">
                                                            <img src="${imgSrc}" class="card-img-top rounded-0" alt="${card.name}">
                                                        </div>
                                                        <div class="card-body">
                                <h5 class="card-title">${card.name}</h5>
                                <p class="card-text">₹ ${discountedPrice} <del>${price}</del> (${card.discount || ''})</p>
                                <div class="star-container">${stars}</div>
                                <div class="card-actions">
                                <button type="button" class="btn btn-primary border mt-2 mx-auto add-to-cart-btn" onclick="modalContent()">Add to cart</button>
                                <a href="/MiniProject/assests/Pages/magnifier.html"><button type="button" class="btn btn-warning border mt-2 mx-auto">View Details</button></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    console.log("hiii");
    });

    const container = document.getElementById('cards-container');
    if (container) container.innerHTML = insert;
    resetSwiper();
} 


// modal logic ends here
function modalContent(){
let modal = document.getElementById("modal-body");
let N=new bootstrap.Modal(modal);
N.show();
}




// autocomplete function starts here
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = ["Laptops","Mobiles","Headsets","Dresses","oneplus","samsung","redmi","realme","boat","hp","dell","lenovo","asus","acer","oneplus nord buds","oneplus buds z2","boat airdopes 131","boat airdopes 141","boat airdopes 281","boat airdopes 441","boat rockerz 255f","boat rockerz 450","boat rockerz 510","boat rockerz 550","boat rockerz 600","boat rockerz 610","boat rockerz 650","boat rockerz 700","boat rockerz 750","boat rockerz 800","boat rockerz 810","boat rockerz 900 pro","samsung galaxy m14 5g","samsung galaxy m32","samsung galaxy m33 5g","samsung galaxy m53 5g","samsung galaxy f13","samsung galaxy f23 5g","samsung galaxy a14 5g","samsung galaxy a23 5g","redmi note 11t pro+5g","redmi note 11t pro","redmi note 11 pro+","redmi note 11 pro","redmi note 11","redmi note 10 pro max","redmi note 10 pro","redmi note 10","realme narzo 60x","realme narzo 60"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);




// star logic starts here
function starRepeat(star){
    let stars = "";
    for(let i = 1; i <= 5; i++){
        if(i <= star)
            stars += '<i class="bi bi-star-fill" ></i>';
        else
            stars += '<i class="bi bi-star"></i>';
    }
    return stars;
}
// star logic ends here





// Slider reset Starts here
function resetSwiper() {
    if (window.swiperInstance) {
        window.swiperInstance.destroy();
    }
    window.swiperInstance = new Swiper(".mySwiper", {
        slidesPerView: setSlidesPerView(),
        spaceBetween: 30,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
//  Slider Reset ends here





//  Slides Preview Starts here
function setSlidesPerView() {
    var screenWidth = window.innerWidth;
    var slidesPerView;
    if (screenWidth < 576) {
        slidesPerView = 1;
    } else if (screenWidth >= 576 && screenWidth < 992) {
        slidesPerView = 2;
    } 
    else if (screenWidth >= 992 && screenWidth < 1200) {
        slidesPerView = 3;
    }
    else {
        slidesPerView = 4;
    }
    return slidesPerView;
}
// Slider Preview ends here




window.addEventListener('resize', function() {
    resetSwiper();
});
