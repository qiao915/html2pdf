<template>
  <div class="hello" id="hello">
    <h2 style="text-align: center">您可以复制网页内容到下面文本框中</h2>
    <div contenteditable="true" style="width: 80%;min-height: 500px;overflow-x:hidden;border: 2px solid #999;margin: 0 auto;border-radius: 5px"></div>
    <button type="button" @click="toPDF" style="margin-top: 20px">导出PDF</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){

  },
  methods:{
    toPDF(){
      wq_html2pdf({
        elem:"#hello",
        seccess:(url)=>{
          window.open(url,"pdf",'toolbar=no, status=yes, location=no')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 700px;
    margin: 0 auto;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
