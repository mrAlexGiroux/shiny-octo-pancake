var app = new Vue({
    el: '#app',
    data: {
        product: 'Cake'
    }
})

var cake = new Vue({
    el: '#cake',
    data: {
        product: 'Socks',
        details: [
            "80% cotton", "20% polyester","Gender-neutral"
        ],
        image: 'media/vmSocks-green-onWhite.jpg',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory : 8,
        cart: 0,
        sale: false,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage : "media/vmSocks-green-onWhite.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage : "media/vmSocks-blue-onWhite.jpg"
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
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})