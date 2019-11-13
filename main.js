Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `    <div class="product">
    <div class="product-image">
            <img v-bind:src="image">
    </div>
    <div class="product-info">

        <button v-on:click="addToCart"
                :disabled="inventory==0"
                :class="{ disabledButton: inventory==0}">Add to cart</button>
        <button v-if="cart > 0" @click="removeFromCart">Remove from cart</button>

        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>

        <h1>{{ title }}</h1>

        <p>{{ sale }}</p>
        
        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory <=10 && inventory > 0">Almost sold out</p>
        <p v-else
            :class="{outOfStock: inventory==0}">Out of stock</p>
        <p>Shipping : {{ shipping }}</p>

        <a :href="link">More product like this</a>

        <ul>
                <li v-for="detail in details">{{detail}}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)"
            >
        </div>
        <div v-for="size in sizes" :key=size.sizeId>
                <p>{{size.size}}</p>
        </div>
    </div>
</div>`,
    data() {
        return {
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
            
        }
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "2.99"
        }    
    }

})

var cake = new Vue({
    el: '#app',
    data: {
        premium: false
    }
    
})