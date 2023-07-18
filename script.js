const url = 'https://dummyjson.com/products';

const fetchProducts = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

const createShopElements = async () => {
  const shopContainer = document.getElementById('shopContainer');
  
  
  const products = await fetchProducts();
  
  const shopItems = products.map((product, index) => {
    const shopItem = document.createElement('div');
    shopItem.classList.add('shop-item');
    shopItem.id = `shopItem_${index}`;
    
    const image = document.createElement('img');
    image.src = product.thumbnail;
    image.alt = product.title;
    shopItem.appendChild(image);

    const brand = document.createElement('h5');
    brand.textContent = product.brand;
    shopItem.appendChild(brand);

    const title = document.createElement('h3');
    title.textContent = product.title.slice(0,23) + "";;
    shopItem.appendChild(title);

    const description = document.createElement('h6');
    description.textContent = product.description.slice(0, 45) + "...";
    shopItem.appendChild(description);

    const priceContainer = document.createElement('div');
    const price = document.createElement('h2');
    price.textContent = `${product.price}$`;
    priceContainer.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'Add';
    button.id = `btn_${index}`;
    button.addEventListener('click', () => {console.log('ADDED PRODUCT: ', product)});
    priceContainer.appendChild(button);

    shopItem.appendChild(priceContainer);

    return shopItem;
  });

  shopItems.forEach((shopItem) => {
    shopContainer.appendChild(shopItem);
  });
};

createShopElements();