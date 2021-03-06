Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `<div class="product">
    <div class="product-image">
            <img v-bind:src="image">
    </div>
    <div class="product-info">

        <button v-on:click="addToCart"
                :disabled="inventory==0"
                :class="{ disabledButton: inventory==0}">Add to cart</button>
        <button @click="removeFromCart">Remove from cart</button>

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

    <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews"> 
            <p>{{ review.name }}</p>
            <p> Rating : {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            </li>
        </ul>
    <div>

    <product-review @review-submitted="addReview"></product-review>
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
    
            ],
            reviews: []
            
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">
                {{ error }}
            </li>
        </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
        </select>
    </p>

    <p>
        <input type="radio" for="recommendProduct">
        
    <p>
        <input type="submit" value="Submit">  
    </p>    

    </form>`,
    data() {
        return {
            name:null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let producReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', producReview)
                    this.name = null
                    this.review = null
                    this.rating = null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        } 
    }
})

var cake = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for (var i = this.cart.length; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i,1);
                }                
            }
        }
    }
    
})