<template>
    <div id="whole">
        <div id="formHelper">
            <img id="icon" src="../assets/images/better.jpg">
            <div id="form-fields">
                <input type="text" placeholder="Email Address or Phone Number"/>
                <input type="password" placeholder="Password"/>
            </div>
            <div id="form-controls">
                <button @click="Login">Login</button>
            </div>
            <div id="form-links">
                <input type="checkbox" name="" id="">
                <label for="">Remember Me</label>
                <a href="#">forgot password?</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
  }
}
</script>
<style scoped>
#whole{
    background: rgb(230,230,230);
    margin: 0px;
    padding: 0px;
}
#formHelper{
    background: white;
    margin: 20px 450px;
    width: 350px;
    padding: 20px 30px;
    border: limegreen solid 2px
}
#form-fields{
    margin: 30px 0px 0px 0px;
}
img{
    margin: 0px 50px ;
    height: 80px;
    width: 200px;
}
li{
    font-style: italic;
    margin: 10px;
}
#form-fields input{
    width: 300px;
    border-radius: 5px;
    height: 30px;
    margin: 10px 0;
    border: solid rgb(150, 150, 150) 1px;
}
#form-fields input:focus{
    border: rgb(50, 50, 50) solid 1px
}
#form-links input{
    text-align: left;
    display: inline-block;
    margin: 10px;
}
#form-links label{
    display: inline;
}
button{
    width: 300px;
    background: orange;
    border-radius: 5px;
    color: white;
    font: 14px bold;
    height: 30px;
    margin: 20px 0;

}
#form-links{
    margin-top: 10px;
}
a{
    font-style: normal;
    color: blue;
    font-size: 15px;
    margin-left: 50px;
    text-decoration: none;
}
</style>
