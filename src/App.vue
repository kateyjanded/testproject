<template>
 <div id="app" class="container-fluid">
    <header class="sticky-top">
    
      <nav class="navbar navbar-expand-xl navbar-light ">
      <div class="navbar-header mr-sm-5">
        <a href="#" class="navbar-brand" ><img id="icon" src="./assets/images/better.jpg" ></a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse " id="navbarTogglerDemo02">
        <form class="form-inline my-2 mr-auto my-lg-0" >
          <input class="form-control mr-sm-2" type="text" placeholder="Search Product">
          <button class="btn btn-success" type="submit">Search</button>
        </form>
        <ul class="nav navbar-nav  mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" >
                <img src="./assets/images/cart.png" alt="" width="20" height="20">
                Cart
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" >
                <img src="./assets/images/Help.png"  width="20" height="20" alt="">
                Help
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                <img src="./assets/images/user.png"  width="20" height="20" alt="">
                {{Action}}
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-header">Welcome to Wetrade</div>
                <a href="#" class="dropdown-item" id="signin" @click="component='form-helper'">Sign In</a>
                <div class="dropdown-header">New Customer?</div>
                <a href="#" class="dropdown-item" id="signup">Create an Account</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">Link 1</a>
                <a href="#" class="dropdown-item">Link 2</a>
              </div>
            </li>
            <li class="nav-item" @click="component= 'Notifications'">
              <a class="nav-link" href="#" >
                <img src="./assets/images/notification.png"  width="20" height="20" alt="">
                Notication <span class="badge badge-primary">Unread({{Count}})</span>
              </a>
            </li>
          </ul>
        </div>
      </nav> 
    </header>
    <div class="mainbody">
      <component v-bind:is="component" :NotificationsCollection="myJson"></component>
    </div>
    <Footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormHelper from './components/FormHelper.vue';
import Article from './components/Article.vue';
import Footer from './components/Footer.vue';
import Notifications from './components/Notifications.vue';

@Component({
   components: {
    'form-helper': FormHelper,
    Article,
    Notifications,
    Footer
  }
})
export default class App extends Vue {
  component= Article;
  Action= 'Login';
  get Count() {
      let count = 0
      for (let i = 0; i < this.$store.state.NotificationsCollection.Notifications.length; i++) {
        if (this.$store.state.NotificationsCollection.Notifications[i].read === false) {
          count++
        }
      }
      return count
    }
}
</script>

<style scoped> 
#app{
  background: rgb(230, 230, 230);
}
.form-control{
  width: 200px;
}
#head{
  padding: 0;
  margin:0;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
  -moz-box-shadow:0px 0px 10px 0px rgba(0,0,0,0.15);
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.15);
}
.dropdown-menu{
  padding: 5px;
}
#icon{
  width: 100px;
  height: 50px;
}
.navbar{
  background-color: white;
}
#menu{
  font: 16px;
  text-align: left;
  padding: 10px
}
#signin{
  background: orange;
  justify-content: center;
}
#signup{
  background: orangered;
  justify-content: center;
}
ul li:first-child:hover{
  background: rgb(200, 200, 200);
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
}

ul{
  text-decoration: none;
  display: inline;
  vertical-align: middle;
  text-align: right;
}
input{
  height: 45px;
  width: 500px;
  border-radius: 6px;
  font-size: 16px;
}
li{
  display: inline-block;
  color:rgba(50, 50, 50);
  display: inline;
  margin: 5px;
}
h1{
  display: inline;
}
</style>
