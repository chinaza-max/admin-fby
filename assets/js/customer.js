let formAdminReg=document.getElementById("formCustomerReg")

/*
setTimeout(() => {
    showModalError("REGISTERATION SUCCESSFULL")

    setTimeout(() => {
        hideModal()
    }, 5000);
}, 1000);
*/

formAdminReg.addEventListener("submit",(e)=>{
    e.preventDefault()
    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.Gender.value,
    date_of_birth=formFields.dateOfBirth.value,
    address=formFields.address.value;


    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          $.ajax({
            type: "post", url:`${domain}/api/v1/customer`,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                    first_name,
                    last_name,
                    email,
                    date_of_birth,
                    gender,
                    address,
            },
            success: function (data, text) {
  
                console.log(data)
                console.log(text)

                showModal("REGISTERATION SUCCESSFULL")
                setTimeout(() => {
                        hideModal()
                }, 3000);

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")
                clearField()
            },
            error: function (request, status, error) {

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")
                console.log(request)
                console.log(status)
                console.log(error)
                console.log(request.responseJSON.status)

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
  
        }
        else {
          $("#signInButton").css("display","block")
          $("#loadingButton").css("display","none")
          $("#emailAlert").text("wrong type")
        }
    
    } 
    else {
    $("#signInButton").css("display","block")
    $("#loadingButton").css("display","none")
    $("#emailAlert").text("wrong type")

    }

    
    function  clearField(){
        formFields.firstName.value='',
        formFields.lastName.value='',
        formFields.email.value='',
        formFields.Gender.value='',
        formFields.dateOfBirth.value='',
        formFields.address.value='',
  


        $('select[name=gender]').val("SELECT");
        $('.selectpicker').selectpicker('refresh')
    }



})