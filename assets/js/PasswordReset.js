
let urlParams = window.location.search
let getQuery = urlParams.split('?')[1]
let params = getQuery.split('&') 



const reset_password_key=params[0].substring(4).split("_")[0]
console.log(reset_password_key)

let formAdminReg=document.getElementById("contactForm")

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
    password = formFields.password.value;
    console.log(password,reset_password_key)

          $.ajax({
            type: "post", url:`${domain}/api/v1/auth/reset-password`,
            data: {
                password,
                reset_password_key
            },
            success: function (data, text) {
  
                showModal(data.message)
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

                if(request.responseJSON.status=="conflict-error"){
                    console.log(request.responseJSON.message)
                    showModalError(request.responseJSON.message)
                    setTimeout(() => {
                        hideModalError()
                    }, 3000);
                }
                else if(request.responseJSON.status=="validation-error"){
                    console.log(request.responseJSON.errors[0].message)

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
                else if(request.responseJSON.status=="notFound-error"){
                    console.log(request.responseJSON.message)
                    showModalError(request.responseJSON.message)
                    setTimeout(() => {
                        hideModalError()
                    }, 3000);
                }
             
            }
          });
  
   



    function  clearField(){
        formFields.password.value=''
    }



})