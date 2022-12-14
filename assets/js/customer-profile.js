const password=document.getElementById("password")
const updateUser=document.getElementById("updateUser")

password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        data: {
            email:userEmail,
        },
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


    for (const file of inputFile.files) {
        formData.append("image", file);
        console.log(file)
    }

   formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("date_of_birth", date_of_birth);
    formData.append("gender", gender);
    formData.append("address",address);





        for (const value of formData.values()) {
            console.log(value);
          }


          fetch(`${domain}/api/v1/user/updateProfile`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
                },
                body:formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                  
                    $("#signInButton").css("display","block")
                        $("#loadingButton").css("display","none")
                    if(data.status==200){
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

                    
                });



   


})
function checkImg(e){
    document.getElementById('avatar2').src = window.URL.createObjectURL(e.files[0])
}




//update user profile
$.ajax({
    type: "get", url:`${domain}/api/v1/auth`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data, text) {
        
        //console.log(data)
        $("#avatar2").attr("src",data.data.user.image);
        $("#firstName").val(data.data.user.first_name);
        $("#lastName").val(data.data.user.last_name);
        $("#email").val(data.data.user.email);
        $("#address").val(data.data.user.address);
        $("#dataOfBirth").val(data.data.user.date_of_birth);


       // console.log(data.data.user.is_archived)
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










