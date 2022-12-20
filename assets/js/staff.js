

let formAdminReg=document.getElementById("formAdminReg")

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


  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, () => {

        Swal.fire({
          title: 'Action Required',
          text: "Location permission is required to proceed!",
          icon: 'warning',
          confirmButtonColor: '#1c0d2e',
          confirmButtonText: 'ok'
        })

        switchHandle.animate({
          left: 0
        }, 100)
    
      });
      
    } else { 
      console.log("Geolocation is not supported by this browser.")
    }
    function showPosition(position) {



    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.Gender.value,
    date_of_birth=formFields.dateOfBirth.value,
    address=formFields.address.value,
    password=formFields.password.value;
    phone_number=formFields.phone_number.value;


    


    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){


          $.ajax({
            type: "post", url:`${domain}/api/v1/auth/admin/register`,
            data: {
                    first_name,
                    last_name,
                    email,
                    date_of_birth,
                    gender,
                    password,
                    address,
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude,
                    phone_number
            },
            success: function (data, text) {
  
                showModal("REGISTRATION SUCCESSFULL")
                limit=15
                offset=0

                getTableDate(limit,offset)

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
        formFields.password.value='';


        $('select[name=gender]').val("SELECT");
        $('.selectpicker').selectpicker('refresh')
    }
  }


})






let limit=15,
offset=0,
limit2=15,
offset2=0


let getTableDate=''
let getTableDate2=''

$(document).ready(function(){


    getTableDate=function (limit,offset){
      $('#loader1').css("display","block");

        $.ajax({
            type: "get", url:`${domain}/api/v1/user/getAllStaff?role=ADMIN&limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
          
            success: function (data,text){

                console.log(data.data)
                $('#loader1').css("display","none");
                CreateTable(data.data)

                /*
                showModal("REGISTRATION SUCCESSFULL")
                setTimeout(() => {
                        hideModal()
                }, 3000);

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")

        */
            },
            error: function (request, status, error) {

              $('#loader1').css("display","none");
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
             
            }
          });
    }

    getTableDate(limit,offset)

    
    function CreateTable(val){
        let data=''

        
        if(val.length!=0){
            for(let i=0; i<val.length; i++){


              console.log(val[i].address)
              if(val[i].email=="nigeria-workspace@proton.me"){
                  data+= `  <tr>
                  <td>
                    <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                  </td>
                  <td>
                    <strong>${val[i].full_name}</strong>
                  </td>
                  
                  <td>
                    <div class="text-muted text-nowrap">${val[i].date_of_birth}</div>
                  </td>

                  <td>
                    <div class="address-col">${val[i].address}</div>
                  </td>
                  <td>
                      <div class="d-flex align-items-center nowrap text-primary">
                      ${val[i].email}
                      </div>
                  </td>

                <td>

                      <div class="d-flex align-items-center nowrap text-primary">
                          <span class="icofont-ui-cell-phone p-0 me-2"></span>
                          ${val[i].phone_number}
                      </div>
                </td>
                  <td>
                    <div class="text-muted text-nowrap">${val[i].gender}</div>
                  </td>
                  <td>
                    <div class="actions">
                  
                      <button href="#" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-info btn-sm btn-square rounded-pill disabled">
                        <span class="btn-icon icofont-ui-edit"></span>
                      </button disabled>
                      <button class="btn btn-error btn-sm btn-square rounded-pill disabled" onclick="deleteAdmin(${val[i].address_id})">
                        <span class="btn-icon icofont-ui-delete"></span>
                      </button>
                    </div>
                  </td>
                </tr>`
              }
              else{

                  data+= `  <tr>
                  <td>
                    <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                  </td>
                  <td>
                    <strong>${val[i].full_name}</strong>
                  </td>
                  
                  <td>
                    <div class="text-muted text-nowrap">${val[i].date_of_birth}</div>
                  </td>

                  <td>
                    <div class="address-col">${val[i].address}</div>
                  </td>
                  <td>
                      <div class="d-flex align-items-center nowrap text-primary">
                      ${val[i].email}
                      </div>
                  </td>

                <td>

                      <div class="d-flex align-items-center nowrap text-primary">
                          <span class="icofont-ui-cell-phone p-0 me-2"></span>
                          ${val[i].phone_number}
                      </div>
                </td>
                  <td>
                    <div class="text-muted text-nowrap">${val[i].gender}</div>
                  </td>
                  <td>
                    <div class="actions">
                  
                      <a href="#" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-info btn-sm btn-square rounded-pill">
                        <span class="btn-icon icofont-ui-edit"></span>
                      </a>
                      <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteAdmin(${val[i].address_id})">
                        <span class="btn-icon icofont-ui-delete"></span>
                      </button>
                    </div>
                  </td>
                </tr>`
              }
                if(i==val.length-1){

                    $('#mytable1').children().remove();
                    $("#mytable1").append(data)
                }
            }
        }else{
            
            $('#mytable1').children().remove();
            $("#mytable1").append(`    <tr>
            <td colspan="1000">
            
            <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
            YOU HAVE NO REGISTERED STAFF 
          </div>
            </td>
          </tr>`)
        }


    }
    
    
    getTableDate2=function ( limit,offset){
        $.ajax({
            type: "get", url:`${domain}/api/v1/customer?limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
          
            success: function (data, text) {

                CreateTable2([])
                /*
                showModal("REGISTRATION SUCCESSFULL")
                setTimeout(() => {
                        hideModal()
                }, 3000);

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")

        */
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
             
            }
          });
    }

    getTableDate2(limit2,offset2)

    function CreateTable2(val){
        let data=''

        if(val.length!=0){


            for(let i=0; i<val.length; i++){


             
                data+= `  <tr>
                <td>
                  <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                </td>
                <td>
                  <strong>${val[i].full_name}</strong>
                </td>
                
                <td>
                  <div class="text-muted text-nowrap">${val[i].sites.length}</div>
                </td>
                <td>
                  <div class="address-col">${val[i].address}</div>
                </td>
                <td>
                  <div class="d-flex align-items-center nowrap text-primary">
                  ${val[i].email}
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">${val[i].gender}</div>
                </td>
                <td>
                  <div class="actions">
               
                    <a href="addSite.html" onclick="storeCurrentUserID(${val[i].id})"  class="btn btn-info btn-sm btn-square rounded-pill">
                      <span class="btn-icon icofont-ui-edit"></span>
                    </a>
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteAdmin(${val[i].address_id})"  >
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                  </div>
                </td>
              </tr>`
              
             

                if(i==val.length-1){

                    $('#mytable2').children().remove();
                    $("#mytable2").append(data)
                }
            }
        }
        else{
            
          $('#mytable2').children().remove();
          $("#mytable2").append(`    <tr>
          <td colspan="1000">
          
          <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
          YOU HAVE NO SUSPENDED STAFF 
        </div>
          </td>
        </tr>`)
      }


    }
    
  });

  
//FOR ALL
function Previous(){
    if(offset==0){
        $("#Previous").addClass("disabled");
    }
    else{
        $("#Previous").removeClass("disabled");
        offset=offset-(limit+1)
        getTableDate(limit,offset)
        $(".page-item").removeClass("active");
        $("#Previous").addClass("active");

    }
}

function Next(){
    offset=offset+limit+1
    getTableDate(limit,offset)
    $(".page-item").removeClass("active");
    $("#Next").addClass("active");

}

function page(val){

    if(val==1){
        offset=0
        $(".page-item").removeClass("active");
        $("#page1").addClass("active");
    }
    else if(val==2){
        offset=16
        $(".page-item").removeClass("active");
        $("#page2").addClass("active");

    }
    else if(val==3){
        offset=32
        $(".page-item").removeClass("active");
        $("#page3").addClass("active");
    }
    
    getTableDate(limit,offset)
}
  





//FOR SUSPENDED

function Previous2(){
    if(offset2==0){
        $("#Previous2").addClass("disabled");
    }
    else{
        $("#Previous2").removeClass("disabled");
        offset2=offset2-(limit2+1)
        getTableDate2(limit,offset)
        $(".page-item2").removeClass("active");
        $("#Previous2").addClass("active");

    }
}

function Next2(){
    offset=offset+limit+1
    getTableDate2(limit,offset)
    $(".page-item2").removeClass("active");
    $("#Next2").addClass("active");

}
  

function page2(val){

    if(val==1){
        offset2=0
        $(".page-item2").removeClass("active");
        $("#page12").addClass("active");
    }
    else if(val==2){
        offset2=16
        $(".page-item2").removeClass("active");
        $("#page22").addClass("active");

    }
    else if(val==3){
        offset2=32
        $(".page-item2").removeClass("active");
        $("#page32").addClass("active");
    }
    
    getTableDate2(limit2,offset2)
}







function deleteAdmin(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
  
      if (result.isConfirmed) {
        $.ajax({
          type: "post", url:`${domain}/api/v1/user/deleteStaff`,
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            id      
          },
          success: function (data, text) {
      
              console.log(data.message)
              showModal(data.message)
              limit=15
              offset=0
                getTableDate(limit,offset)
            
    
              setTimeout(() => {
                      hideModal()
              }, 3000);
      
            
             
          },
          error: function (request, status, error) {
      
              console.log(request)
              console.log(status)
              console.log(error)
              console.log(request.responseJSON.status)
      
              analyzeError(request)
           
          }
        });
      }
    
    })
  
  
  
  }