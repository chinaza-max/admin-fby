
const password=document.getElementById("password")
const updateUser=document.getElementById("updateUser")
let staff_id=localStorage.getItem("staff_id")
let staffEmail2=""

password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        data: {
            email:staffEmail2,
        },
        dataType  : 'json',
        encode  : true,
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
    const inputFile = document.getElementById("profilePicturePath");

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.gender.value,
    date_of_birth=formFields.dataOfBirth.value,
    address=formFields.address.value,
    role=formFields.staff_role.value,
    staff_status=formFields.staff_status.value,
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
    formData.append("role",role);
    formData.append("id",staff_id);



          fetch(`${domain}/api/v1/user/updateProfileOtherAdmin`, {
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
            type: "post", url:`${domain}/api/v1/auth/profile_info`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data:{
                id:staff_id
            },
            success: function (data) {

                let userData=JSON.parse(atob(localStorage.getItem("userDetails")))
                if(userData.role!="SUPER_ADMIN"){
                    $("#staff_role").attr("disabled", true)
                }
                $("#email").attr("disabled", true)
                staffEmail2=data.data.user.email
                $("#avatar2").attr("src",data.data.user.image);
                $("#firstName").val(data.data.user.first_name);
                $("#lastName").val(data.data.user.last_name);
                $("#email").val(data.data.user.email);
                $("#address").val(data.data.user.address);
                $("#dataOfBirth").val(data.data.user.date_of_birth);
                $("#phoneNumber").val(data.data.user.phone_number);

                if(data.data.user.gender){
                    $('select[name=gender]').val(data.data.user.gender);
                    $('.selectpicker').selectpicker('refresh')
                }

                if(data.data.user.role){
                    $('select[name=staff_role]').val("ADMIN");
                    $('.selectpicker').selectpicker('refresh')
                }

                if(data.data.user.suspended==false){
                    $('select[name=staff_status]').val("Active");
                    $('.selectpicker').selectpicker('refresh')
                }
                else{
                    $('select[name=staff_status]').val("Suspended");
                    $('.selectpicker').selectpicker('refresh')
                }

                $("#createdAt").text(data.data.user.created_at)
                $("#updatedAt").text(data.data.user.updated_at)
                $("#currentRole").text(data.data.user.role)

                
            },
            error: function (request, status, error) {
                    analyzeError(request)
            }
        });
    }
    getProfileData()

})












