const password=document.getElementById("password")
const updateUser=document.getElementById("updateUser")





password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        data: {
            email:userEmail,
        },
        dataType  : 'json',
        encode  : true,
        success: function (data, text) {
            showModalEmailPasswordReset(data.message)
            setTimeout(() => {
                hideModalEmailPasswordReset()
            }, 3000);

        },
        error: function (request, status, error) {

            if(request.responseJSON.status=="conflict-error"){
                console.log(request.responseJSON.message)
                showModalError(request.responseJSON.message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="validation-error"){
                console.log(request.responseJSON.errors.message)
                showModalError(request.responseJSON.errors[0].message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="server-error"){
                console.log(request.responseJSON.message)
                showModalError(request.responseJSON.message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="bad-request-error"){
              console.log(request.responseJSON.message)
              showModalError(request.responseJSON.message)
              setTimeout(() => {
                  hideModalError()
              }, 3000);
              logUserOut()
          }
         
        }
      });
})




updateUser.addEventListener("submit",(e)=>{

    e.preventDefault()
    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")


    const formData=new FormData()
    const inputFile = document.getElementById("profilePicturePath");

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.gender.value,
    date_of_birth=formFields.dataOfBirth.value,
    address=formFields.address.value;
    phoneNumber=formFields.phoneNumber.value;



    for (const file of inputFile.files) {
        formData.append("image", file);
    }

   formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("date_of_birth", date_of_birth);
    formData.append("gender", gender);
    formData.append("address",address);
    formData.append("phone_number",phoneNumber);



        for (const value of formData.values()) {
            console.log(value);
          }


          fetch(`${domain}/api/v1/user/updateProfile`, {
                method: 'POST', // or 'PUT'
                headers: {
                    "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
                },
                dataType  : 'json',
                encode  : true,
                body:formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    $("#signInButton").css("display","block")
                    $("#loadingButton").css("display","none")

                    if(data.status==200){
                        getProfileData()
                        showModal(data.message  )
                        setTimeout(() => {
                                hideModal()
                        }, 3000);
                    }
                    else if(data.status=="conflict-error"){
                        console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="validation-error"){
                        console.log(data.errors.message)
                        showModalError(data.errors[0].message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="server-error"){
                        console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="bad-request-error"){
                        console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="notFound-error"){
                        console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                })



})


function checkImg(e){
    document.getElementById('avatar2').src = window.URL.createObjectURL(e.files[0])
}

let getProfileData
$(document).ready(function(){

    getProfileData=  function(){
        $.ajax({
            type: "get", url:`${domain}/api/v1/auth`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            success: function (data, text) {
                localStorage.setItem('userDetails', btoa(JSON.stringify(data.data.user)));

                $("#avatar").attr("src",data.data.user.image);
                $("#avatar2").attr("src",data.data.user.image);
                $("#firstName").val(data.data.user.first_name);
                $("#lastName").val(data.data.user.last_name);
                $("#email").val(data.data.user.email);
                $("#address").val(data.data.user.address);
                $("#dataOfBirth").val(data.data.user.date_of_birth);
                $("#phoneNumber").val(data.data.user.phone_number);
                $("#email").attr("disabled", true)
                getNotificationStatus(data.data.user.notification)


                if(data.data.user.is_archived==true){
                    $('select[name=status]').val("Available");
                    $('.selectpicker').selectpicker('refresh')
                }
                else{
                    
                    $('select[name=status]').val("notAvailable");
                    $('.selectpicker').selectpicker('refresh')
                
                }
                
                if(data.data.user.gender=="MALE"){
                    $('select[name=gender]').val("MALE");
                    $('.selectpicker').selectpicker('refresh')
                }
                else if(data.data.user.gender=="FEMALE"){
                $('select[name=gender]').val("FEMALE");
                $('.selectpicker').selectpicker('refresh')
                }

            },
            error: function (request, status, error) {
                localStorage.removeItem("myUser");
                
            //  window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
            //  window.location.replace('/sign-in.html')
            window.location.href =window.location.toString().split('/')[0] +`/index.html`


            }
        });
    }
    getProfileData()

})












function getNotificationStatus(booleanValue){
      

    if(booleanValue){
      
      let hasGottenDeviceToken=localStorage.getItem("hasGottenDeviceToken")
   
      if(hasGottenDeviceToken=="false"||hasGottenDeviceToken==null){
        initializeFireBaseMessaging()
      }



        $('#notificationContainer').children().remove();
        $("#notificationContainer").append(`
        <input class="form-check-input mycheckButton2 float-end mt-4" type="checkbox"  checked>
        `)


      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });


    }
    else{

        localStorage.setItem("hasGottenDeviceToken","false")

        $('#notificationContainer').children().remove();
        $("#notificationContainer").append(`
        
        <input class="form-check-input mycheckButton2 float-end mt-4" type="checkbox" >

        `)
    }


    $('.mycheckButton2').on('change', function(){ 
      
        $.ajax({
          type: "post", url:`${domain}/api/v1/user/toggleVisibilty?type=notification`,
          headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
          },
          success: function (data) {         
          
            getProfileData()
          },
          error: function (request, status, error) {
              analyzeError(request)
          }
        })
        

  })

  
        
}
