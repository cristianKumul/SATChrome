
(function () {
    'use strict';
    var downloadFile = function(uri){
        console.log(uri);
        var link = document.createElement("a");
        link.download = "name.xml";
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }
    var parseUrl =  function(actionUrl){
        let link =  actionUrl.replace("recuperaRepresentacionImpresa('","").replace("');","");
        return link;
    }
    var getXMLNumbers = function(){
       var imgQuery = document.querySelector("#ctl00_MainContent_tblResult");
       var numbers = 0;
       if(imgQuery != undefined){
            var downloadBtn = imgQuery.getElementsByClassName("BtnDescarga");
            if(downloadBtn != undefined ){
                numbers = downloadBtn.length;
            }
       }
        return numbers;  
    }
    var findXML= function(){
        console.log("click to button");
        try {
            var imgQuery = document.querySelector("#ctl00_MainContent_tblResult");
            var downloadBtn = document.getElementsByName('BtnRI'); //imgQuery.getElementsByClassName("BtnDescarga");
            var listUrl = [];
            var baseUrl = "https://"+ window.location.hostname+"/RepresentacionImpresa.aspx?Datos=";
            if(downloadBtn != undefined){
                for(let i = 0 ; i < downloadBtn.length ; i++){
                    let urlugly = downloadBtn[i].getAttribute('onclick');
                    let link = baseUrl+parseUrl(urlugly);
                    downloadFile(link);
                    listUrl.push(link);
                 }            
                return listUrl.length;
            }
            return 0;
            //sendResponse({result: "OK"});
        } catch (error) {
            return -1;
            console.log("Error while try to handleButtonClick",error.message);
            //sendResponse({result: "Error"});
        }
    }

   

    var managerActions = function(key){
        switch (key) {
            case "findXML":
                return findXML();
                break;
            case "checkXML" :  
                return getXMLNumbers();     
            default:      
                break;
        }
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?"from a content script:" + sender.tab.url :  "from the extension");
            let response = managerActions(request.action);  
            var results = {
                    result:
                        {  message: request.action,
                           status: response}
                    };
    console.log(results);
            sendResponse(results);
    });
   
}());


