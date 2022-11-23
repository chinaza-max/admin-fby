const password=document.getElementById("password")
const saveChangeImg=document.getElementById("saveChangeImg")

password.addEventListener("click" ,()=>{

    console.log(userEmail)
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
saveChangeImg.addEventListener("click",()=>{
    saveChangeImg.style.display="none"
    const formData=new FormData()
    const inputFile = document.getElementById("profilePicturePath");

    for (const file of inputFile.files) {
        formData.append("image", file);
        console.log(file)
    }

    $.ajax({
        type:"post", url:`${domain}/api/v1/updateProfile`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            formData
        },
        processData: false,
        contentType: false,
        success: function (data, text) {
            console.log(data)
            showModal("REGISTRATION SUCCESSFULL")
            setTimeout(() => {
                    hideModal()
            }, 3000);

            clearField()
        },
        error: function (request, status, error) {

            console.log(request)

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


})
function checkImg(e){
    document.getElementById('avatar2').src = window.URL.createObjectURL(e.files[0])
    saveChangeImg.style.display="block"
}


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
            $('select[name=gender]').val("male");
            $('.selectpicker').selectpicker('refresh')
        }
        else{
           $('select[name=gender]').val("female");
           $('.selectpicker').selectpicker('refresh')
        }

    },
    error: function (request, status, error) {
        localStorage.removeItem("myUser");
        
      //  window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
      //  window.location.replace('/sign-in.html')
      window.location.href =window.location.toString().split('/')[0] + "/dist/sign-in.html"


    }
  });