const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

function menuHandler() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document
        .querySelector("header nav .wrapper")
        .classList.remove("nav-open");
    });
}

function celsiusToFahr(temp) {
  let fahr = (temp * 9) / 5 + 32;
  return fahr;
}
function greetingHandler() {
  let greetingText;

  let currentHour = new Date().getHours();
  if (currentHour < 12) {
    greetingText = "Good Morning";
  } else if (currentHour < 17) {
    greetingText = "Good Afternoon!";
  } else if (currentHour < 24) {
    greetingText = "Good Evening";
  } else greetingText = "Welcome!";

  const weatherCondition = "sunny";
  const userLocation = "London";
  let temperature = 35;

  let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature}°C outside.`;
  let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(
    temperature
  )}°F outside.`;

  document.querySelector("#greeting").innerHTML = greetingText;
  document.querySelector("p#weather").innerHTML = celsiusText;

  document
    .querySelector(".weather-group")
    .addEventListener("click", function (e) {
      if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
      } else if (e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
      }
    });
}
function clockHandler() {
  setInterval(() => {
    let localTime = new Date();

    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}
function galleryHandler() {
  const galleryImages = [
    {
      src: "/assets/gallery/image1.jpg",
      alt: "Thumbnail Image 1",
    },
    {
      src: "/assets/gallery/image2.jpg",
      alt: "Thumbnail Image 2",
    },
    {
      src: "/assets/gallery/image3.jpg",
      alt: "Thumbnail Image 3",
    },
  ];

  let mainImage = document.querySelector("#gallery > img");
  let thumbnails = document.querySelector("#gallery .thumbnails");
  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  galleryImages.forEach((image, index) => {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

    thumb.addEventListener("click", (e) => {
      let selectedIndex = e.target.dataset.arrayIndex;
      let selectedImage = galleryImages[selectedIndex];
      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
      });
      e.target.dataset.selected = true;
    });
    thumbnails.appendChild(thumb);
  });
}

function productsHandler() {
  let freeProducts = products.filter(function (item) {
    return !item.price || item.price <= 0;
  });

  let paidProducts = products.filter(function (item) {
    return item.price > 0;
  });

  populateProducts(products);

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).innerHTML = products.length;

  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).innerHTML = paidProducts.length;

  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).innerHTML = freeProducts.length;

  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", function (e) {
    if (e.target.id == "all") {
      populateProducts(products);
    } else if (e.target.id == "free") {
      populateProducts(freeProducts);
    }
    if (e.target.id == "paid") {
      populateProducts(paidProducts);
    }
  });
}

function populateProducts(productList) {
  let productSection = document.querySelector(".products-area");
  productSection.innerHTML = "";
  productList.forEach((product, index) => {
    let productElm = document.createElement("div");
    productElm.classList.add("product-item");

    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Image for " + product.title;

    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;

    let priceTitle = document.createElement("p");
    priceTitle.classList.add("price-title");
    priceTitle.textContent = "Price";

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent =
      product.price > 0 ? "$" + product.price.toFixed(2) : "FREE";

    productDetails.appendChild(productTitle);
    productDetails.appendChild(productAuthor);
    productDetails.appendChild(priceTitle);
    productDetails.appendChild(productPrice);

    productElm.appendChild(productImage);
    productElm.appendChild(productDetails);

    productSection.appendChild(productElm);
  });
}
function footerHandler() {
  document.querySelector("footer").innerHTML = "2024 - All rights reserved";
}

navigator.geolocation.getCurrentPosition((position) => {});

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
