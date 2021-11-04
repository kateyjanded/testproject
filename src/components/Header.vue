<template>
  <header>
    <div id="navbar">
      <a href="#">Sell on WeTrade</a>
      <a href="#">Buyer Protection</a>
      <div id="dropdown">
        <button id="dropbtn">Language
        </button>
        <div id="dropdown-content">
          <a href="#">English</a>
          <a href="#">French</a>
          <a href="#">Chinese</a>
        </div>
      </div>
    </div>
    <div id="head">
    <a href="#" ><img id="icon" src="../assets/better.jpg"></a>
      <ul>
        <li>
          <input type="search" placeholder="Search Product">
          <button id="search">Search</button>
        </li>
        <li>
          <img src="../assets/cart.png" alt="" width="20" height="20">
          Cart
        </li>
        <li>
          <img src="../assets/Help.png"  width="20" height="20" alt="">
          Help
        </li>
        <li>
            <img src="../assets/user.png"  width="20" height="20" alt="">
            {{Action}}
            <ul id="menu">
              Welcome to Wetrade
              <button id="signin" @click="changeComponent('form-helper')">Sign In</button>
              New Customer?
              <button id="signup">Create an Account</button>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
            </ul>
        </li>
        <li @click="changeComponent('notification')">
        <img src="../assets/notification.png" width="20" height="20" alt="">
          Notication({{count}})
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
import { bus } from '../main.js'
export default {
  props: [
    'changeComponent',
    'Action',
    'count',
    'notification'
  ],
  data () {
    return {
      title: 'WeTrade'
    }
  },
  methods: {
    GoBackToBlog: function () {
      this.$on('LogInForm')
    }
  },
  created () {
    bus.$on('LogInForm', function () {
      this.$emit('Log')
    })
  }
}
</script>
<style scoped>
#head{
  padding: 0;
  margin:0;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
  -moz-box-shadow:0px 0px 10px 0px rgba(0,0,0,0.15);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
}
a{
  display: inline-block;
  padding-top: 5px;
}
#icon{
  width: 100px;
  height: 50px;
  margin:0px 30px 0px 10px;
}
#navbar{
  background-color: lightskyblue;
}
ul{
  display: inline;
  margin: 0;
  padding: 0px 0px 30px 0;
  list-style: none;
}
#menu{
  font: 16px;
  text-align: left;
  padding: 10px
}
ul button{
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: bold;
  color: white;
  width: inherit;
  height: 30px;
}
#signin{
  background: orange;
}
#signup{
  background: orangered;
}
ul li:first-child:hover{
  background: white;
  padding: 0;
}
ul li {
  font-family:Verdana, sans-serif;
  font-size: 16px;
  display: inline-block;
  position: relative;
  padding: 0px 0px;
  background: #fff;
  cursor: pointer;
}
ul li:hover{
  border-radius: 2px;
  background: rgb(200, 200, 200);
  color: black;
  padding: 8px;
}
ul li ul{
  background: white;
  padding: 0;
  position: absolute;
  top: 35px;
  right: 0;
  width: 200px;
  display: none;
  opacity: 0;
  color: rgb(100, 100, 100);
  visibility: hidden;
  -webkit-box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.15);
  -moz-box-shadow:0px 0px 10px 10px rgba(0,0,0,0.15);
  box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.15);
}
ul li ul li {
  display: block;
  color: rgb(100, 100, 100);
  background: inherit;
  text-align: left;
  margin: 0;
  padding: 10px;
}
ul li ul li:hover{
  background: silver;
  color: grey;
  width: 40px;
}
ul li:hover ul{
  display: block;
  opacity: 1;
  visibility: visible;
}
#search{
  margin: 0 5px 4px;
  border-radius: 6px;
  height: 45px;
  width: 100px;
  color: white;
  background:orange;
  font-size: 14px;
  font:bold
}
ul{
  text-decoration: none;
  display: inline;
  vertical-align: middle;
  text-align: right;
}
input{
  height: 45px;
  width: 600px;
  border-radius: 6px;
  font-size: 16px;
}
li{
  display: inline-block;
  color:rgba(50, 50, 50);
  display: inline;
  margin: 5px;
}
header{
    background: white;
}
h1{
  display: inline;
}
</style>
