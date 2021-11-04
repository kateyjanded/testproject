<template>
    <footer>
    <p>{{ copyright }}</p>
    </footer>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue{
  copyright= "CopyRight 2020 WeTrade Web Application"
}
</script>
<style scoped>
footer{
    background: rgb(22, 15, 119);
    padding: 6px;
}
p{
    text-align: center;
    color: silver;
}
</style>
