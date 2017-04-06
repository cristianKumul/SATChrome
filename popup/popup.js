(function () {
    'use strict';
    var conf = {
        notify:".notify",
        nToDownload:"#toDownloadNumber",
        nInvoiced:"#invoicedNumber",
        downloadedContainer: "#invoiceDownloaded",
        toDownloadContainer:"#toDownload"
    }
    var findXmlAction=function(response){
        Zepto(conf.notify).hide();
        Zepto(conf.nInvoiced).html("");
        Zepto(conf.nInvoiced).append(response.status);
        Zepto(conf.downloadedContainer).show();
    }
    var checkXmlAction=function(response){
        Zepto(conf.notify).hide();
        if(response.status > 0){
        Zepto(conf.nToDownload).html(response.status);
            Zepto(conf.toDownloadContainer).show();
        }else{
             Zepto("#backbtn").show();
        }
        
    }

    var callBackManager = function(response){
        switch (response.message) {
            case "findXML":
                console.log(response.message + " " + JSON.stringify(response));
                break;
            case "checkXML":
                console.log(response.message + " " + JSON.stringify(response));
                checkXmlAction(response);
            default:
                break;
        }
    }
    var messenger = function(message){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: message}, function(response) {
             console.log(response.result);
             callBackManager(response.result);
            });
        });

    }
    document.querySelector('#button').addEventListener('click', function () {
       messenger("findXML");
    });
    document.querySelector('#other').addEventListener('click', function () {
        messenger("checkXML");
        
    });   
  
    
}());