let mode="development"
let activeUserID= localStorage.getItem("storeCurrentUserID")
let activeSiteID= localStorage.getItem("storeCurrentSiteID")
let activeGuardID= localStorage.getItem("storeCurrentGuardID")
let activeCustomerID= localStorage.getItem("storeCurrentCustomerID")
let activeJobID= localStorage.getItem("storeCurrentJobID")

let searchGuard=localStorage.getItem("searchGuard")
let folder="adminPanel"
let alertLifeSpan=2000
let alertLifeSpan2=2000

let domain=''
if(mode=="development"){
    domain="http://localhost:3000"
}
else{

    //domain= 'http://api.fbyteamschedule.com:3000'

    domain='https://middleware.fbyteamschedule.com'
   //domain='http://fbyteamschedule.com:3000'
}




function storeCurrentCustomerID(val){
    localStorage.setItem("storeCurrentCustomerID",val)
}

function storeCurrentGuardID(val){
    localStorage.setItem("storeCurrentGuardID",val)
}

function storeCurrentUserID(val){
    localStorage.setItem("storeCurrentUserID",val)
}

function storeCurrentJobID(val){
    localStorage.setItem("storeCurrentJobID",val)
}

function storeCurrentSiteID(val){

    localStorage.setItem("storeCurrentSiteID",val)
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
        window.location.href =window.location.toString().split('/')[0] + "/sign-in.html"
        }
        else{
            //window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
        }
}

let userDeatils=''
let userEmail=''
if(localStorage.getItem("userDetails")!=null){

userDeatils=JSON.parse(atob(localStorage.getItem("userDetails")))
    userEmail=userDeatils.email
    avatarURL=userDeatils.image

    $("#avatar").attr("src",avatarURL);
}



function analyzeError(request){

    console.log(request)
    if(request.responseJSON?.status=="conflict-error"){
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON?.status=="validation-error"){
        showModalError(request.responseJSON.errors[0].message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON?.status=="server-error"){
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON?.status=="bad-request-error"){
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
        logUserOut()
    }
    else if(request.responseJSON?.status=="notFound-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON?.status=="location-error"){
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON?.status=="time-error"){

        let obj=request.responseJSON.message
        let  obj2=JSON.parse(obj)

        Swal.fire({
          icon: 'error',
          title:obj2.message,
          text: obj2.solution,
          footer: "NOTE : Date should be 60minite apart for earch guard"
        })
    }
    else if(request.responseJSON?.status=="Agenda_not_Found_in_guard_shift"){


        let obj=request.responseJSON.message
        let  obj2=JSON.parse(obj)

    
        let myMessage=obj2.info.issues+" "+obj2.info.operation_date+" for "+obj2.info.fullName
        let task_or_instruction=obj2.info.issues.includes("Task")?'from Task Or adjust date':'from Instruction Or adjust date' 
        let solution="Remove "+obj2.info.fullName+" "+task_or_instruction
  
        Swal.fire({
          icon: 'error',
          title:myMessage,
          text: solution,
          footer: "NOTE :Date should be inside guard created shift"
        })
          
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


$(document).ready(function(){
    let value=localStorage.getItem("setRTopNavColor")
    if(value=="true"){
        setTimeout(() => {
            $("#topbar").click()
        }, 1000);
    }


    let value2=localStorage.getItem("setLeftNavColor")
    if(value2=="true"){
        setTimeout(() => {
            $("#sidebar").click()
        }, 1000);
    }

})


let checkbox=document.querySelector("#topbar")

if(checkbox){
    checkbox.addEventListener('change', function() {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                console.log("is checked ")
    
            localStorage.setItem("setRTopNavColor",true)
    
            } else {
                console.log("not checked ")
    
            localStorage.setItem("setRTopNavColor",false)
            }
        });
      });
}



let checkbox2=document.querySelector("#sidebar")

if(checkbox2){
    checkbox2.addEventListener('change', function() {
        checkbox2.addEventListener('change', function() {
            if (this.checked) {
            localStorage.setItem("setLeftNavColor",true)
            console.log("is checked ")
    
            } else {
             console.log("not checked ")
            localStorage.setItem("setLeftNavColor",false)
            }
        });
    });
}


function updateSearchGuard(val){

    console.log(val)
    localStorage.setItem("searchGuard",val)
}





function getLatAndLon(callback){
  

    let kalmanLat = new KalmanFilter({R: 0.01, Q: 3});
    let kalmanLon = new KalmanFilter({R: 0.01, Q: 3});
  
    if (navigator.geolocation) {
           
      navigator.geolocation.getCurrentPosition(showPosition, () => {
  
        Swal.fire({
          title: 'Action Required',
          text: "Location permission is required to proceed!",
          icon: 'warning',
          confirmButtonColor: '#1c0d2e',
          confirmButtonText: 'ok'
        })
    
      });
      
    } else { 
      console.log("Geolocation is not supported by this browser.")
  
      Swal.fire({
        title: 'Action Required',
        text: "Device need Update ",
        icon: 'warning',
        confirmButtonColor: '#1c0d2e',
        confirmButtonText: 'ok'
      })
    }
  
    function showPosition(position) {
      
      let filteredLat = kalmanLat.filter(position.coords.latitude);
      let filteredLon = kalmanLon.filter(position.coords.longitude);
      
      let obj={
        lat:filteredLat,
        lon:filteredLon
      }
      callback(obj)
    }
  }