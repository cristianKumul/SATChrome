(function () {
    'use strict';
    var parseUrl =  function(actionUrl){
        let link =  actionUrl.replace("return AccionCfdi('","").replace("','Recuperacion');","");
        return link;
    }
    var findXML= function(){
        console.log("click to button");
        try {
            var imgQuery = document.querySelector("#ctl00_MainContent_tblResult");
            var downloadBtn = imgQuery.getElementsByClassName("BtnDescarga");
            var listUrl = [];
            var baseUrl = "https://"+ window.location.hostname+"/";
            if(downloadBtn != undefined){
                for(let i = 0 ; i < downloadBtn.length ; i++){
                    let link = baseUrl+parseUrl(downloadBtn[i].attributes[6].value) ;

                    listUrl.push(link);
                 }            
                console.log(listUrl[0]);
                chrome.downloads.download({
                    url: listUrl[0],
                    filename: "suggested/filename/with/relative.xml" // Optional
                },function(){
                    console.log("listo");
                });
            }
            //sendResponse({result: "OK"});
        } catch (error) {
            console.log("Error while try to handleButtonClick",error.message);
            //sendResponse({result: "Error"});
        }
    }

    console.log("hola content");


    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

            if(request.action == "findXML"){
                console.log(request.action);
                findXML();
            }
            /*switch (request.action) {
                case "findXML":
                    findXML();

                    break;
            
                default:
                    console.log("default action");
                    break;
            }*/
            
             
    });
   
}());


