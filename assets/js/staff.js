

let limit=15,
offset=0,
limit2=15,
offset2=0,
user_id=0;

let suspensionReason=[]


let getTableDate=''
let getTableDate2=''





let formAdminReg=document.getElementById("formAdminReg")

formAdminReg.addEventListener("submit",(e)=>{
    e.preventDefault()

    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    date_of_birth=formFields.dateOfBirth.value,
    password=formFields.password.value,
    address=formFields.address.value,
    phone_number=formFields.phone_number.value,
    gender=formFields.Gender.value,
    staffRole=formFields.staffRole.value;

    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          $.ajax({
            type: "post", url:`${domain}/api/v1/auth/admin/register`,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
            data: {
              first_name,
              last_name,
              email,
              date_of_birth,
              gender,
              password,
              address,
              phone_number,
              staffRole,
            },
            success: function (data) {
  
                console.log(data)

                showModal(data.message)
                limit=15
                offset=0
                getTableDate(limit,offset)

                setTimeout(() => {
                        hideModal()
                }, 3000)

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")
                clearField()
            },
            error: function (request, status, error) {

                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")
               
                console.log(request)

              analyzeError(request)
             
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
        formFields.company_name.value='',
        formFields.email.value='',
        formFields.Gender.value='',
        formFields.address.value='',
        formFields.Phone_number.value='';

        $('select[name=gender]').val("SELECT");
        $('.selectpicker').selectpicker('refresh')
    }

  

})



$(document).ready(function(){


    getTableDate=function (limit,offset){

      $('#loader1').css("display","block");

        $.ajax({
            type: "get", url:`${domain}/api/v1/user/getAllStaff?role=ALL_ADMINISTRATORS_AVAILABLE&limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
            success: function (data){

                $('#loader1').css("display","none");
                CreateTable(data.data)

            },
            error: function (request, status, error) {

              $('#loader1').css("display","none");

              analyzeError(request)
             
            }
          });
    }

    getTableDate(limit,offset)

    
    function CreateTable(val){
        let data=''

        
        if(val.length!=0){
            for(let i=0; i<val.length; i++){
              if(val[i].email=="nigeria-workspace@proton.me"){
                  data+= `  <tr>
                  <td>
                  ${offset+i+1}
                  </td>
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
                      <a href="staff-profile.html" class="btn btn-dark btn-sm btn-square rounded-pill">
                        <span class="btn-icon icofont-external-link"></span>
                      </a>
                     
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
                  ${offset+i+1}
                  </td>
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
                

                      <a  onclick="storeCurrentUserID(${val[i].id})" href="staff-profile.html"  class="btn btn-info btn-sm btn-square rounded-pill">
                      <span class="btn-icon icofont-ui-edit"></span>
                      </a>

                      <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteAdmin(${val[i].address_id})">
                        <span class="btn-icon icofont-ui-delete"></span>
                      </button>
                      <button onclick="update_user_id(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill" 
                      data-bs-toggle="modal" data-bs-target="#suspend" 
                       onclick="">
                      <div class="icon sli-user-unfollow"></div>
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
            YOU HAVE NO AVAILABLE REGISTERED STAFF 
          </div>
            </td>
          </tr>`)
        }


    }
    
    
    getTableDate2=function ( limit,offset){


      $('#loader2').css("display","block");

        $.ajax({
            type: "get", url:`${domain}/api/v1/user/suspended_staffs?role=ADMIN&limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
            success: function (data) {

              $('#loader2').css("display","none");

                console.log(data)
                CreateTable2(data.data)
                suspensionReason=data.data
            },
            error: function (request, status, error) {
              $('#loader2').css("display","none");

                analyzeError(request)
             
            }
          });
    }

    getTableDate2(limit2,offset2)

    function CreateTable2(val){

        let data=''

        if(val.length!=0){
          console.log(val)
            for(let i=0; i<val.length; i++){

                data+= `  <tr>
                <td>
                   ${offset2+i+1}
                </td>
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
                    ${val[i].gender}
                </div>
              </td>
                <td>
                  <div class="actions">
                  <button onclick="displaySuspensionReason(${i})"  data-bs-toggle="modal" data-bs-target="#suspension_details"  class="btn btn-dark btn-sm btn-square rounded-pill">
                  <span class="btn-icon icofont-external-link"></span>
                </button>

                <button onclick="unSuspend(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill" >
                 <div class="icon sli-user-following"></div>
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

/*
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
*/
  





//FOR SUSPENDED

function Previous2(){
    if(offset2==0){
        $("#Previous2").addClass("disabled");
    }
    else{
        $("#Previous2").removeClass("disabled");
        offset2=offset2-(limit2)
        getTableDate2(limit2,offset2)
        $(".page-item2").removeClass("active");
        $("#Previous2").addClass("active");

    }
}

function Next2(){
    offset2=offset2+limit2
    getTableDate2(limit2,offset2)
    $(".page-item2").removeClass("active");
    $("#Next2").addClass("active");

}
  
/*
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
*/





function clickHiddenBut(){
  document.getElementById("suspendFormButton").click()
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
      
              showModal(data.message)
              limit=15
              offset=0
              getTableDate(limit,offset)
            
    
              setTimeout(() => {
                      hideModal()
              }, 3000);
      
            
             
          },
          error: function (request, status, error) {
      
              analyzeError(request)
           
          }
        });
      }
    
    })
  
  
  
}



function storeCurrentUserID(id){
    localStorage.setItem("staff_id",id)
}

let suspendForm=document.getElementById("suspendForm")
suspendForm.addEventListener("submit",(e)=>{
  e.preventDefault()

  let suspendInfo=document.getElementById("suspendInfo").value
    
  $.ajax({
    type: "post", url:`${domain}/api/v1/user/suspend_user_account`,
    headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
    data: {
      user_id,
      comment:suspendInfo,
    },
    success: function (data) {

      limit=15,
      offset=0,
      limit2=15,
      offset2=0,
      
      getTableDate(limit,offset)
      getTableDate2(limit2,offset2)

      showModal(data.message)
      $('#suspend').modal('hide');

      showModal(data.message)
        setTimeout(() => {
                hideModal()
        }, 3000)
    },
    error: function (request, status, error) {

      if(request.responseJSON.status=="unauthorized-error"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${request.responseJSON.message}`,
        })
      } 
      else{
        analyzeError(request)
      }
     
    }
  });


})

function update_user_id(id){
  user_id=id
}



function displaySuspensionReason(index){

  let selected=suspensionReason[index].comment;
  let data=''

      if(selected){
          data=`
          <thead>
                <tr>
                  <th scope="col"  class="text-nowrap">Suspended by</th>
                  <th scope="col"  class="text-nowrap">Staff id</th>
                  <th scope="col"  class="text-nowrap">Suspended on</th>
                  <th scope="col"  class="text-nowrap">Suspension reason</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>${selected.Admin_details.first_name}   ${selected.Admin_details.last_name}</td>
                  <td>${selected.admin_id}</td>
                  <td>${selected.createdAt}</td>
                  <td>${selected.comment}</td>
                </tr>
                </tbody>
          `
      }

  $('#suspensionContent').children().remove();
  $("#suspensionContent").append(data)


}


function unSuspend(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Unsuspended!'
  }).then((result) => {

    if (result.isConfirmed) {
      $.ajax({
        type: "post", url:`${domain}/api/v1/user/unsuspend_user_account`,
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
          user_id:id      
        },
        success: function (data) {
            showModal(data.message)
            limit=15,
            offset=0,
            limit2=15,
            offset2=0,
            
            getTableDate(limit,offset)
            getTableDate2(limit2,offset2)
          
            setTimeout(() => {
                    hideModal()
            }, 3000);
     
        },
        error: function (request, status, error) {
            analyzeError(request)
        }
      });
    }
  
  })
}

function clickAnotherBut(){

  document.getElementById("hidenSubmitBut").click()
}
