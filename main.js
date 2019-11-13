var cake = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        details: [
            "80% cotton", "20% polyester","Gender-neutral"
        ],
        selectedVariant: 0,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        cart: 0,
        onSale: true,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage : "media/vmSocks-green-onWhite.jpg",
                variantQuantity : 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage : "media/vmSocks-blue-onWhite.jpg",
                variantQuantity : 10,
            }
        ],
        sizes: [
            {
                sizeId: 10,
                size :"sm",
            }, 
            {
                sizeId : 20,
                size: "md"
            }, 
            {
                sizeId: 30,
                size: "lg"
            }, 
            {
                sizeId : 40,
                size :"xl"
            }

        ]
        
    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        removeFromCart(){
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are not on sale!'
            }
                return this.brand + ' ' + this.product + ' are not on sale!'
            }
    }
})