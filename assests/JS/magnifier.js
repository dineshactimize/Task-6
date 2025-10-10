magnify("myimage", 2);
function magnify(imgID, zoom) {
  var img = document.getElementById(imgID);
  if (!img) return;

  /* Create magnifier glass: */
  var glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  var bw = 3;
  var w = glass.offsetWidth / 2;
  var h = glass.offsetHeight / 2;

  // hide initially
  glass.style.display = 'none';

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /* show/hide on enter/leave */
  img.addEventListener('mouseenter', function () { glass.style.display = 'block'; });
  img.addEventListener('mouseleave', function () { glass.style.display = 'none'; });

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  img.addEventListener('touchstart', function () { glass.style.display = 'block'; });
  img.addEventListener('touchend', function () { glass.style.display = 'none'; });

  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
    if (x < w / zoom) { x = w / zoom; }
    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
    if (y < h / zoom) { y = h / zoom; }
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
    



  function getCursorPos(e) {
    var a = img.getBoundingClientRect();
    e = e || window.event;
    var clientX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    var clientY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
    var x = clientX - a.left;
    var y = clientY - a.top;
    return { x: x, y: y };
  }
}

// Expose a helper to change the main image and update magnifier
function setMagnifierImage(imgSelector, src, zoom) {
  const img = document.querySelector(imgSelector);
  if (!img) return;
  img.src = src;
  // remove existing glass (if any) and recreate magnifier to update background size
  const oldGlass = img.parentElement.querySelector('.img-magnifier-glass');
  if (oldGlass) oldGlass.remove();
  // re-init magnifier for the image
  magnify(img.id, zoom || 2);
}

// Wire thumbnail clicks (if the page has them)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      const src = this.dataset.src || this.src;
      setMagnifierImage('#myimage', src, 2);
      // update main product title/price if data attributes provided
      const title = this.dataset.title;
      if (title) {
        const el = document.getElementById('product-title');
        if (el) el.textContent = title;
      }
    });
  });
});

  // modal logic ends here
function modalContent(){
let modal = document.getElementById("modal-body");
let N=new bootstrap.Modal(modal);
N.show();
}