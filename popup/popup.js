(function () {
    'use strict';


    var backgroundpage = chrome.extension.getBackgroundPage();
    var messenger = function(message){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: message}, function(response) {
            console.log(response.result);
            });
        });

    }
    document.querySelector('button').addEventListener('click', function () {
        console.log("click desde afyera");
       messenger("findXML");
    });
    
  
    
}());