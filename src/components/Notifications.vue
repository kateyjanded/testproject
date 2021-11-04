<template>
  <div>
    <div id="page" v-show="showPage">
      <header class="row">
        <div class="col-sm-3">
          <h1>Notifications</h1>
        </div>
        <div class="col-sm-3">
          <ul class="AllControls row">
            <li class="col-sm-4">
              <label class="form-check-label">
                <input type="checkbox" @click="CheckAll" class="form-check-input" name="" id="check" v-model= IsCheckedAll>Select All
              </label>
            </li>
            <li class="col-sm-2">
              <img src="../assets/images/delete.png" @click="DeleteAll" alt="" v-b-tooltip.hover.bottom="'Delete notification'" width="20" height="20">
            </li>
            <li class="col-sm-2">
              <img src="../assets/images/Read.png" v-b-tooltip.hover.bottom="'Mark as Read'" alt="" width="20" height="20" @click="MarkAllAsRead">
            </li>
          </ul>
        </div>
        <div class="col-sm-6">
          <ul id="controls">
            <li class="pageDetail">
              {{Start}}-{{End}} of {{total}}
            </li>
            <li>
              <ul class="pagination">
                <li v-bind:class="{'page-item': true, disabled:CanBackward}" @click="PreviousPage"><a class="page-link" href="#">Previous</a></li>
                <li v-bind:class="{'page-item': true, disabled:CanForward()}" @click="NextPage"><a class="page-link" href="#">Next</a></li>
              </ul>
            </li>
            <li id="searchControls">
              <input name="" placeholder="Search" @keydown.enter="SearchWord" v-model="searchWord" id="search">
              <img src="../assets/images/searchIcon.png" @click="SearchWord" alt="" height="20" width="25">
            </li>
            <li class="dropdown" @click="CheckAll">
              <a class="dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              Filter
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a href="#" class="dropdown-item" @click="FilterByRead">Read</a>
                <a href="#" class="dropdown-item" @click="FilterByUnRead">UnRead</a>
                <a href="#" class="dropdown-item" @click="FilterByImportance">Important</a>
                <a href="#" class="dropdown-item" @click="ShowAll">Show All</a>
              </div>
            </li>
          </ul>
        </div>
      </header>
      <div id="tables">
        <table alt="No Notifications available">
          <tr v-bind:class="{selected: notification.IsChecked}" v-for="notification in ShowingNotification" :key="notification">
            <td>
              <input type="checkbox" class="form-check-input" name="" id="check" v-model= notification.IsChecked>
              <i v-on:click="notification.Important=!notification.Important">
                <img src="../assets/images/starred.png" v-if="notification.Important" alt="" v-b-tooltip.hover.bottom="'Mark as Important'">
                <img src="../assets/images/unstarred.png"  v-else-if="!notification.Important"  alt="" v-b-tooltip.hover.bottom="'Unmark as Important'">
              </i>
            </td>
            <td id="sender" v-bind:class="{open: notification.IsOpen}">{{notification.sender}}</td>
            <td id="subject" v-bind:class="{open: notification.IsOpen}">{{notification.Subject}}</td>
            <td id="body" @click="OpenNotification(notification)" v-bind:class="{open: notification.IsOpen, read: !notification.read}"><a href="#" @click="showPage = false">{{notification.Body}}</a></td>
            <td>{{notification.Time}}</td>
            <td>
              <img src="../assets/images/delete.png" @click="Delete(notification)" alt="" v-b-tooltip.hover.bottom="'Delete notification'">
              <img src="../assets/images/Read.png"  @click="notification.read = true" v-b-tooltip.hover.bottom="'Mark as Read'" alt="">
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="add-blog" v-show="!showPage">
      <header>
        <ul>
          <li>
            <a href="#" @click="showPage = true"><img src="../assets/images/left.png"></a>
          </li>
          <li>
            <h2>{{SelectedNotification.Subject}}</h2>
          </li>
        </ul>
        <h4>{{SelectedNotification.Time}}</h4>
      </header>
      <label name="" id="">{{SelectedNotification.Body}}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Notification from '../store/Models/Notification'

@Component
export default class Notifications extends Vue {
  showPage = true
  searchWord =  ""
  SelectedNotification = new Notification
  IsCheckedAll = false
  get Start(): number {
    return this.$store.state.Start
  }
  get End(): number {
    return this.$store.state.End
  }
  private showingNotifications(): Array<Notification> {
    return this.$store.getters.ShowingNotifications
  }
  get total(): number {
    return this.$store.getters.total
  }
  get ShowingNotification(): Array<Notification> {
    return this.$store.getters.ShowingNotification
  }
  get CanBackward(): boolean {
    return this.$store.getters.CanBackward
  }
  beforeMount() {
    this.$store.commit('AssignValues')
  }
  FilterByImportance() {
    this.$store.commit('FilterByImportance')
  }
  CanForward() {
    if (this.$store.getters.total >= this.$store.state.End + 30) {
        return false
      } else if (this.$store.getters.total >this.$store.state.End && this.$store.getters.total < this.$store.state.End + 30) {
        return false
      } else {
        return true
      }
  }
  NextPage() {
    this.$store.commit('NextPage')
  }
  PreviousPage() {
    this.$store.commit('PreviousPage')
  }
  FilterByRead() {
    this.$store.commit('FilterByRead')
  }
  FilterByUnRead() {
    this.$store.commit('FilterByUnRead')
  }
  ShowAll() {
    this.$store.commit('ShowAll')
  }
  SearchWord() {
    this.$store.dispatch('SearchWord', this.searchWord)
  }
  Delete(notification: Notification) {
    this.$store.dispatch('Delete', notification)
  }
  OpenNotification(notification: Notification) {
    notification.read = true
    this.SelectedNotification = notification
    this.showPage = false
  }
  DeleteAll() {
    this.$store.commit('DeleteAll')
  }
  MarkAllAsRead () {
    this.$store.commit('MarkAllAsRead')
  }
  CheckAll() {
    this.IsCheckedAll = !this.IsCheckedAll
    this.$store.commit('CheckAll', this.IsCheckedAll)
  }
}
</script>

<style scoped>

table{
  width: 100%;
  table-layout: fixed;
}
h4{
  font-size: 20px;
  font-weight: initial;
}
#page{
  min-height: 1000px;
  background: lightskyblue;
}
#body a{
  color:black;
  text-decoration: none;
}
#add-blog{
  min-height:400px;
  margin: 0px 50px;
  background: rgb(179, 179, 236);
}
#add-blog header{
  border: none;
  color: blue;
}
#add-blog ul li{
  display: inline
}
#add-blog label{
  margin:20px 200px 20px 200px
}
td img{
  width:20px;
  height: 20px;
  margin-right: 10px;
}
.AllControls li{
  margin: 10px;
}
header{
  border-bottom: solid gray 1px;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 10px;
}
.pageDetail{
  align-content: center;
}
.selected{
  background: silver;
  padding: 20px;
  border: black 1px solid;
}
.selected td{
  background: silver;
}
#searchbutton{
  height: 20px;
  width: 20px;
  padding: 0px;
}
#subject{
  font-weight: bolder;
  font-size: medium;
  width: 10%;
}
i img{
  margin: 10px 0px 0px 10px;
  width: 20px;
  height: 20px;
}
#body{
  width: 60%;
}
td{
  padding: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.open{
  overflow:auto;
  white-space:initial;
  text-overflow: ellipsis;
}
.read{
  font-weight: bold;
}
table, td, tr{
  border-collapse: collapse;
}
#searchButton:hover{
  background: silver;
}
#search{
  width: 100px;
  height: 20px;
  border: none;
  font-size: 16px;
}
.pagination{
  margin-left: 5px ;
  margin-right: 10px;
}
#searchControls{
  border: 1px solid gray;
  background: white;
  justify-content: space-between;
  padding:5px;
  margin-right: 20px;
}
h1{
  display: inline;
  font-size: 40px;
  margin: 0px 0px 0px 30px;
}
ul{
  list-style: none;
}
li{
  display: inline;
}
#menu{
  font-size: 16px;
  text-align: left;
  padding: 10px
}
label{
  font-size: 16px;
}
#controls{
  display: inline-flex;
  justify-self: left;
}
tr:hover{
  padding: 20px;
  border: black 1px solid;
  -webkit-box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.30);
  -moz-box-shadow:0px 0px 10px 10px rgba(0,0,0,0.30);
  box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.30);
}
td:first-child{
  width: 50px;
}
tr:nth-child(even) {
  background-color: lightskyblue;
}
tr:nth-child(odd) {
  background-color: #fff;
}
#tables{
  justify-content: stretch;
  padding: 20px;
}
</style>
