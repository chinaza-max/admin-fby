const password=document.getElementById("password")
const updateUser=document.getElementById("updateUser")
let myID=activeUserID
let userEmail2=''


password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        dataType  : 'json',
        encode  : true,
        data: {
            email:userEmail2,
        },
        success: function (data) {
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
    //const inputFile = document.getElementById("profilePicturePath");

    const form = e.target;
    const formFields = form.elements,
    company_name = formFields.Company.value,
    email=formFields.email.value,
    gender=formFields.gender.value,
    phone_number=formFields.tel.value,
    address=formFields.address.value;

    /*
    for (const file of inputFile.files) {
        formData.append("image", file);
    }
    */

    formData.append("company_name",company_name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("id", myID);



    for (const value of formData.values()) {
        console.log(value);
      }
          fetch(`${domain}/api/v1/customer/updateProfile`, {
                method: 'POST', 
                headers: {
                    "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
                },
                dataType  : 'json',
                encode  : true,
                body:formData
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


$(document).ready(function(){
    //update user profile
$.ajax({
    type: "get", url:`${domain}/api/v1/customer/one?id=${myID}`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data) {
        
        let data2=data.data[0]
        userEmail2=data2.email
        $("#avatar2").attr("src",data2.image);
        $("#Company").val(data2.company_name);       
        $("#address").val(data2.address);
        $("#tel").val(data2.tel);
        $("#email").val(data2.email);     
        $("#email").attr("disabled", true)

        if(data2.gender){
            $('select[name=gender]').val(data2.gender);
             $('.selectpicker').selectpicker('refresh')
        }
       
    },
    error: function (request, status, error) {
        
        analyzeError(request)
    }
  });


})














