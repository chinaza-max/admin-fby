let mode="development"
let activeUserID= localStorage.getItem("storeCurrentUserID")

let domain=''
if(mode=="development"){
    domain="http://localhost:3000"
}
else{
    domain=''
}

function storeCurrentUserID(val){

    console.log(val)
    localStorage.setItem("storeCurrentUserID",val)
   
}

function showModal(val){
    $("#RegisterationSuccessFullContent").text(val);
    $("#RegisterationSuccessFullContent").attr({
        "class" : "alert alert-primary outline  text-center"
      });

    $('#RegisterationSuccessFull').modal('show');
}

function hideModal(){
    $('#RegisterationSuccessFull').modal('hide');
}


function showModalError(val){
    $("#RegisterationErrorContent").text(val);
    $("#RegisterationErrorContent").attr({
        "class" : "alert alert-danger outline  text-center"
      });

    $('#RegisterationError').modal('show');
}

function hideModalError(){
    $('#RegisterationError').modal('hide');
}



function showModalEmailPasswordReset(val){
    $("#PasswordResetInfoContent").text(val);
    $("#PasswordResetInfoContent").attr({
        "class" : "alert alert-primary outline  text-center"
      });

    $('#PasswordResetInfo').modal('show');
}

function hideModalEmailPasswordReset(){
    $('#PasswordResetInfo').modal('hide');
}


function logUserOut(){

        localStorage.removeItem("myUser")
        localStorage.removeItem("userDetails")
        if(mode=="development"){
        window.location.href =window.location.toString().split('/')[0] + "/dist/sign-in.html"
        }
        else{
            //window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
        }
}



//console.log(localStorage.getItem("myUser"))
const userDeatils=JSON.parse(atob(localStorage.getItem("userDetails")))
const userEmail=userDeatils.email
console.log(userDeatils)
$("#avatar").attr("src",userDeatils.image);






