let mode="development"

let activeUserID= localStorage.getItem("storeCurrentUserID")
let alertLifeSpan=5000
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



//console.log(localStorage.getItem("userDetails"))
let userDeatils=''
let userEmail=''
if(localStorage.getItem("userDetails")!=null){

userDeatils=JSON.parse(atob(localStorage.getItem("userDetails")))
    userEmail=userDeatils.email
    console.log(userDeatils)
    $("#avatar").attr("src",userDeatils.image);
}








function analyzeError(request){
    if(request.responseJSON.status=="conflict-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="validation-error"){
        console.log(request)
        console.log(request.responseJSON.errors.message)
        showModalError(request.responseJSON.errors[0].message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="server-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="bad-request-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
        logUserOut()
    }
    else if(request.responseJSON.status=="notFound-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
}





//THIS SHOWS THE TWO SCHEDULE CLASHING 
let schedule1=0
let schedule2=0
function show_warming_no_guard(val){

    if(schedule1==0&&schedule2==0){
        Swal.fire({
            title:val,
            text:`check your schedule date `,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2000
        })
    }
    else{
        Swal.fire({
            title:val,
            text:`check Schedule (${schedule1}) and  Schedule(${schedule2})`,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2000
        })
    }

  
}







