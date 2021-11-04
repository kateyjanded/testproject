<template>
    <div id="products" class="pt-4">
        <ul>
            <li v-for="product in Products" :key="product" @click="product.show= !product.show">
                <img v-bind:src='product.url' width="200" height="200">
                <label>{{product.Name}}</label>
                <label v-show="product.show">Price: {{product.Price}}</label>
                <label v-show="product.show">Quantity Available: {{product.QuantityAvailable}}</label>
            </li>
        </ul>
        <div v-show="showAdd">
          <h2>Add a New Product</h2>
          <form id="you">
            <label>Product Name:</label>
            <input type="text" v-model="name">
          </form>
          <form id="you">
            <label>Product Price:</label>
            <input type="text" v-model="price">
          </form>
          <form id="you">
            <label>QuantityAvailable:</label>
            <input type="text" v-model="quantity">
          </form>
          <form id="you">
            <input type="file" @change="OnFileSelected">
          </form>
            <button @click="SaveProduct">Upload Image</button>
        </div>
        <button @click="showAdd = true">Add Product</button>
        <button @click="DeleteProduct">Delete Product</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Article extends Vue{
    Products= [
      { Name: 'HP Laptop Mini', Price: '$56,000', QuantityAvailable: 6, show: false, url: require('../assets/images/index.jpg') },
      { Name: 'Sonic Speaker', Price: '$5,000', QuantityAvailable: 8, show: false, url: require('../assets/images/speaker.jpg') },
      { Name: 'Rechargeable Fan', Price: '$2,500', QuantityAvailable: 4, show: false, url: require('../assets/images/fan.jpg') },
      { Name: 'Food Blender', Price: '$10,000', QuantityAvailable: 6, show: false, url: require('../assets/images/blender.jpg') },
      { Name: 'Sneakers', Price: '$4,500', QuantityAvailable: 10, show: false, url: require('../assets/images/sneakers.jpg') },
      { Name: 'Mini Gown For Ladies', Price: '$12,500', QuantityAvailable: 15, show: false, url: require('../assets/images/gowns.jpg') }
    ];
    showAdd= false;
    SelectedFile= "";
    name= "";
    price= "";
    quantity= 0;
    icon= "";
    DeleteProduct() {
      this.Products.pop()
    }
    SaveProduct() {
      this.Products.push({ Name: this.name, Price: this.price, QuantityAvailable: this.quantity, show: false, url: require('../assets/' + this.SelectedFile) })
      this.showAdd = false
      this.name = ""
      this.price = ""
      this.quantity = 0
    }
  }
</script>
<style scoped>
#products{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background: rgb(53, 79, 230);
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
  margin: 10px;
}
form{
  margin: 10px
}
input{
  display: block;
}
label{
  display: block;
  color: white;
}
img{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    background: white;
    border-radius: 5px;
}
</style>
