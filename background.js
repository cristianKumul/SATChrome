function handleButtonClick() {
    console.log("click to button");
    try {
        var imgQuery = document.querySelector("#ctl00_MainContent_tblResult");
        var downloadBtn = imgQuery.getElementsByClassName("BtnDescarga");
        if(downloadBtn != undefined){
            console.log(downloadBtn);
        }
    } catch (error) {
        console.log("Error while try to handleButtonClick",error.message);
    }
  
}
