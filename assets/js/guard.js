let limit=15,
offset=0,
limit2=15,
offset2=0;


let myCoor
  
getLatAndLon(function(latLon) {
  myCoor= latLon;
})
let guard_id=0


let formAdminReg=document.getElementById("formguardReg")


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
    address=formFields.address.value,
    phone_number=formFields.phone_number.value,
    password=formFields.password.value;

    

    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          $.ajax({
            type: "post", url:`${domain}/api/v1/auth/register`,
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
                    latitude: Number(myCoor.lat).toFixed(8),
                    longitude: Number(myCoor.lon).toFixed(8),
                    phone_number
            },
            success: function (data) {
  
                limit=15,
                offset=0

                $('#example').DataTable().clear().destroy();
                getTableDate()
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
                console.log(request.responseJSON.status)

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
        formFields.firstName.value='',
        formFields.lastName.value='',
        formFields.email.value='',
        formFields.Gender.value='',
        formFields.dateOfBirth.value='',
        formFields.address.value='',
        formFields.password.value='';
        formFields.phone_number.value=''


        $('select[name=gender]').val("SELECT");
        $('.selectpicker').selectpicker('refresh')
    }

})


let getTableDate=''
let getTableDate2=''

$(document).ready(function(){



    getTableDate =()=>{
      table=$('#example').DataTable({
        ajax: {
            url:`${domain}/api/v1/user/getAllStaff?role=ALL_GUARD_AVAILABLE_NO_PAGINATION`,
            method: "get",
            dataType  : 'json',
            encode  : true,  
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
          },
         
          columnDefs: [
            {
              render: function (data, type, full, meta) {

                return `<img src=${data} alt="" width="40" height="40" class="rounded-500">`
              },
              targets: 0
            },
            
            {
              render: function (data, type, full, meta) {
                return  `<span  width="2" >${data}</span>`
    
              },
              targets: 1
            }
            ,
            {
              render: function (data, type, full, meta) {
                return  `<strong>${data}</strong>`
    
              },
              targets: 2
            }
            ,
         
            {
              render: function (data, type, full, meta) {
    
                return  `<div style="max-width:200px;min-width:200px" >${data}</div>`
    
              },
              targets: 3
            }
            ,
            
            {
              render: function (data, type, full, meta) {
    
                return  ` <div class="d-flex align-items-center nowrap text-primary">
                <span class="icofont-ui-email p-0 me-2"></span>
                ${data}
              </div>`
    
              },
              targets: 4
            }
            ,
            {
              render: function (data, type, full, meta) {
    
                return  ` <div class="d-flex align-items-center nowrap text-primary">
                <span class="icofont-ui-cell-phone p-0 me-2"></span>
                ${data}
              </div>`
    
              },
              targets: 5
            }
            ,
            {
              render: function (data, type, full, meta) {
    
                return  `     <div class="actions">
  
                <a onclick="storeCurrentGuardID(${data})"  href="guard-profile.html"  class="btn btn-dark btn-sm btn-square rounded-pill">
                  <span class="btn-icon icofont-external-link"></span>
                </a>
            
                <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteGuard(${data})"  >
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
  
                <button onclick="update_guard_id(${data})" class="btn btn-error btn-sm btn-square rounded-pill" 
                data-bs-toggle="modal" data-bs-target="#suspend" >
                <div class="icon sli-user-unfollow"></div>
              </button>
  
              </div>`
    
              },
              targets: 7
            }
          ],
          
          columns:[
            { data: "image" },
            { data: "id" },
            { data: "full_name" },
            { data: "address" },
            { data: "email" },
            { data: "phone_number" },
            { data: "gender" },
            { data: "guard_id_for_action" }
          ],
      })

    
      
    }
    

    getTableDate()
    //FOR SUSPENDED GUARD
    getTableDate2=function ( limit,offset){

        $.ajax({
            type: "get", url:`${domain}/api/v1/user/suspended_staffs?role=GUARD&limit=${limit}&offset=${offset}`,
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
            for(let i=0; i<val.length; i++){

                data+= `  <tr>
                <td>
                   ${offset2+i+1}
                </td>
                <td>
                  <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                </td>

                <td>
                <div class="text-muted text-nowrap">${val[i].id}</div>
              </td>
                <td>
                  <strong>${val[i].full_name}</strong>
                </td>
                
              
                <td>
                  <div class="address-col">${val[i].address}</div>
                </td>
                <td>
                  <div class="d-flex align-items-center nowrap text-primary">
                  <span class="icofont-ui-email p-0 me-2"></span>
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
          YOU HAVE NO SUSPENDED GUARD 
        </div>
          </td>
        </tr>`)
      }


    }
    

    
    getTableData3 =()=>{
      table=$('#example3').DataTable({
        ajax: {
            url:`${domain}/api/v1/user/deleted_staffs?role=ALL_GUARD_AVAILABLE_NO_PAGINATION`,
            method: "get",
            dataType  : 'json',
            encode  : true,  
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            }
          },
         
       
          columnDefs: [
            {
              render: function (data, type, full, meta) {

                return `<img src=${data} alt="" width="40" height="40" class="rounded-500">`
              },
              targets: 0
            },
            
            {
              render: function (data, type, full, meta) {
                return  `<span  width="2" >${data}</span>`
    
              },
              targets: 1
            }
            ,
            {
              render: function (data, type, full, meta) {
                return  `<strong>${data}</strong>`
    
              },
              targets: 2
            }
            ,
         
            {
              render: function (data, type, full, meta) {
    
                return  `<div style="max-width:200px;min-width:200px" >${data}</div>`
    
              },
              targets: 3
            }
            ,
            
            {
              render: function (data, type, full, meta) {
    
                return  ` <div class="d-flex align-items-center nowrap text-primary">
                <span class="icofont-ui-email p-0 me-2"></span>
                ${data}
              </div>`
    
              },
              targets: 4
            }
            ,
            {
              render: function (data, type, full, meta) {
    
                return  ` <div class="d-flex align-items-center nowrap text-primary">
                <span class="icofont-ui-cell-phone p-0 me-2"></span>
                ${data}
              </div>`
    
              },
              targets: 5
            }
            ,
            {
              render: function (data, type, full, meta) {
    
                return  `     <div class="actions">
  
                <a onclick="storeCurrentGuardID(${data})"  href="guard-profile.html"  class="btn btn-dark btn-sm btn-square rounded-pill disabled">
                  <span class="btn-icon icofont-external-link"></span>
                </a>
            
                <button class="btn btn-error btn-sm btn-square rounded-pill disabled" onclick="deleteGuard(${data})"  >
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
  
                <button onclick="update_guard_id(${data})" class="btn btn-error btn-sm btn-square rounded-pill disabled" 
                data-bs-toggle="modal" data-bs-target="#suspend" >
                <div class="icon sli-user-unfollow"></div>
              </button>
  
              </div>`
    
              },
              targets: 7
            }
          ],
          
          columns:[
            { data: "image" },
            { data: "id" },
            { data: "full_name" },
            { data: "address" },
            { data: "email" },
            { data: "phone_number" },
            { data: "gender" },
            { data: "guard_id_for_action" }
          ],
      })

    }
    getTableData3()


    
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




function deleteGuard(id){

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
          dataType  : 'json',
          encode  : true,
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            id      
          },
          success: function (data) {
      
              showModal(data.message)
              $('#example').DataTable().clear().destroy();
              getTableDate()
              $('#example3').DataTable().clear().destroy();
              getTableData3()
            
    
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

  function update_guard_id(id){
    guard_id=id

  }

  function clickHiddenBut(){
    document.getElementById("suspendFormButton").click()
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
              
             
              getTableDate2(limit2,offset2)
              $('#example').DataTable().clear().destroy();
              getTableDate()
            
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
      user_id:guard_id,
      comment:suspendInfo
    },
    success: function (data) {


      console.log(data)
      limit=15,
      offset=0,
      limit2=15,
      offset2=0,
      
      getTableDate2(limit2,offset2)


      $('#example').DataTable().clear().destroy();
      getTableDate()
      showModal(data.message)
      $('#suspend').modal('hide');

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