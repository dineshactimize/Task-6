
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
        else desiredCategory = null; // show all
    }

    const itemsToRender = desiredCategory ? productDetails.filter(p => p.category && p.category.toLowerCase() === desiredCategory.toLowerCase()) : productDetails;
    console.debug('Mini.js: desiredCategory=', desiredCategory, 'itemsToRender=', itemsToRender.length);
    displayCards(itemsToRender, desiredCategory);
}

document.addEventListener('DOMContentLoaded', initSlider);





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

        insert += `<div class="swiper-slide">
                                                <div class="card product-card rounded-0">
                                                        <div class="img-wrap">
                                                            <img src="${imgSrc}" class="card-img-top rounded-0" alt="${card.name}">
                                                        </div>
                                                        <div class="card-body">
                                <h5 class="card-title">${card.name}</h5>
                                <p class="card-text">₹ ${discountedPrice} <del>${price}</del> (${card.discount || ''})</p>
                                <div class="star-container">${stars}</div>
                                <button type="button" class="btn btn-primary border mt-2 mx-auto">VIEW</button>
                            </div>
                        </div>
                    </div>`;
    });

    const container = document.getElementById('cards-container');
    if (container) container.innerHTML = insert;
    resetSwiper();
}
// display data ends here





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
