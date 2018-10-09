'use strict'

import html2canvas from 'html2canvas'; 
import JsPDF from 'jspdf';
;(function () { // 节点转换成图片并下载
  var defaults = {
    elem: 'html', //html节点
    filename: Date.parse(new Date()),  //下载的文件名字

  };
  var wq_html2pdf = function (options) {
    var options = Object.assign(defaults,options);
    wq_html2pdf.prototype.init(options);
  };
  wq_html2pdf.prototype = {
    init: function (options) {
      this.html2canvas(options);
    },
    html2canvas: function (options) {
      //console.log("%c邮箱  %cqiao_915@yeah.net%c  欢迎技术交流探讨", "text-shadow:none", " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3em", "text-shadow:none");
      var _this = this;
      var el = document.querySelector(options.elem);
      html2canvas(el).then(function (canvas) {
        var contentWidth = canvas.width,
          contentHeight = canvas.height,
          pageHeight = contentWidth / 592.28 * 841.8,
          leftHeight = contentHeight,
          imgWidth = 595.28,
          imgHeight = 592.28 / contentWidth * contentHeight,
          imgUrl = canvas.toDataURL("image/jpg", 1.0);
        _this.canvas2pdf(pageHeight,leftHeight,imgWidth,imgHeight,imgUrl,options)
      });
    },
    canvas2pdf:function (pageHeight,leftHeight,imgWidth,imgHeight,imgUrl,options) {
      let position = 0,
        PDF = new JsPDF('', 'pt', 'a4');
      if (leftHeight < pageHeight) {
        PDF.addImage(imgUrl, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          PDF.addImage(imgUrl, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      /**pdf下载**/
      // PDF.save(options.filename + '.pdf');
      // PDF.output("save",options.filename + '.pdf');

      /**pdf预览**/
      let data = PDF.output('blob',options.filename + '.pdf');
      let url = window.URL.createObjectURL(data);
      console.log(data);
      console.log(url);
      window.open(url,options.filename,'toolbar=no, status=yes, location=no')
    }


  };
  window.wq_html2pdf = wq_html2pdf;
})();

export default {};


        
/*export default{            
  install (Vue, options) {              
    Vue.prototype.getPdf = function () {                
      var title = this.htmlTitle;                
      html2Canvas(document.querySelector('#pdfDom'), {                  
        allowTaint: true                
      }).then(function (canvas) {                  
        let contentWidth = canvas.width;                  
        let contentHeight = canvas.height;                  
        let pageHeight = contentWidth / 592.28 * 841.89;                  
        let leftHeight = contentHeight;                  
        let position = 0;                  
        let imgWidth = 595.28;                 
        let imgHeight = 592.28 / contentWidth * contentHeight;                 
        let pageData = canvas.toDataURL('image/jpeg', 1.0);                 
        let PDF = new JsPDF('', 'pt', 'a4');                 
        if (leftHeight < pageHeight) {                   
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);                 
        } else {                   
          while (leftHeight > 0) {                     
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);                     
            leftHeight -= pageHeight;                     
            position -= 841.89;                     
            if (leftHeight > 0) {                       
              PDF.addPage()                     
            }                   
          }                 
        }                 
        PDF.save(title + '.pdf');               
      })             
    }           
  }          
}*/
