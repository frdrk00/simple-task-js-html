const url = 'https://dummyjson.com/products'

const fetchProducts = async () => {
  const res = await fetch(url)
  const data = await res.json()
  return data.products
}

const createShopElements = async () => {
  const shopContainer = document.getElementById('shopContainer')
  shopContainer.classList.add('shop-container')

  const products = await fetchProducts()

  const shopItems = products.map((product, index) => {
    const shopItem = document.createElement('div')
    shopItem.classList.add('shop-item')
    shopItem.id = `shopItem_${index}`

    if (product.stock === 0) {
      const noProducts = document.createElement('h1')
      noProducts.textContent = 'No products available'
      shopItem.appendChild(noProducts)
    } else {
      const image = document.createElement('img')
      image.src = product.thumbnail
      image.alt = product.title
      shopItem.appendChild(image)

      const brand = document.createElement('h5')
      brand.textContent = product.brand
      shopItem.appendChild(brand)

      const title = document.createElement('h3')
      title.textContent = product.title.slice(0, 15) + ''
      shopItem.appendChild(title)

      const description = document.createElement('h6')
      description.textContent = product.description.slice(0, 45) + '...'
      shopItem.appendChild(description)

      const priceContainer = document.createElement('div')
      const price = document.createElement('h2')
      price.textContent = `${product.price}$`
      priceContainer.appendChild(price)

      if (product.discountPercentage > 5) {
        price.classList.add('strikethrough-text')
        const discount = document.createElement('h4')
        const discountedPrice = document.createElement('h2')
        const roundedDiscount = Math.round(product.discountPercentage)
        discount.textContent = `${roundedDiscount}%`
        const roundedPrice =
          Math.round(
            product.price * (1 - product.discountPercentage / 100) * 100
          ) / 100
        discountedPrice.textContent = `${Math.round(roundedPrice)}$`
        priceContainer.appendChild(discount)
        priceContainer.appendChild(discountedPrice)
      }

      const button = document.createElement('button')
      button.textContent = 'Add'
      button.id = `btn_${index}`
      button.addEventListener('click', () => {
        console.log('ADDED PRODUCT: ', product)
      })
      priceContainer.appendChild(button)

      shopItem.appendChild(priceContainer)
    }
    return shopItem
  })

  shopItems.forEach((shopItem) => {
    shopContainer.appendChild(shopItem)
  })
}

createShopElements()

/* 
    const ratingContainer = document.createElement('div')
    ratingContainer.classList.add('rating-container')
    const rating = document.createElement('h4')
    rating.textContent = `${product.rating} / 5`
    ratingContainer.appendChild(rating)
    const ratingStars = document.createElement('div')
    ratingStars.classList.add('rating-stars')
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i')
      star.classList.add('fas', 'fa-star')
      if (i < product.rating) {
        star.classList.add('checked')
      }
      ratingStars.appendChild(star)
    }
    ratingContainer.appendChild(ratingStars)
    shopItem.appendChild(ratingContainer)
*/
