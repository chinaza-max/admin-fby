let limit=15,
offset=0,
limit2=15,
offset2=0,
limit3=15,
offset3=0,
customer_id=0;

let suspensionReason=[]







let formAdminReg=document.getElementById("formCustomerReg")

formAdminReg.addEventListener("submit",(e)=>{
    e.preventDefault()


    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")

    const form = e.target;
    const formFields = form.elements,
    company_name = formFields.company_name.value,
    email=formFields.email.value,
    gender=formFields.Gender.value,
    Phone_number=formFields.Phone_number.value,
    address=formFields.address.value;


    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          $.ajax({
            type: "post", url:`${domain}/api/v1/customer`,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
            data: {
                    company_name,
                    email,
                    gender,
                    address,
                    phone_number:Phone_number
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
        formFields.company_name.value='',
        formFields.email.value='',
        formFields.Gender.value='',
        formFields.address.value='',
        formFields.Phone_number.value='';

        $('select[name=gender]').val("SELECT");
        $('.selectpicker').selectpicker('refresh')
    }

  

})



let getTableDate=''
let getTableDate2=''

$(document).ready(function(){
    //FOR ALL CUSTOMER
    getTableDate=function ( limit,offset){
        $('#loader1').css("display","block");

        $.ajax({
            type: "get", url:`${domain}/api/v1/customer?limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
          
            success: function (data) {
                
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
                data+= `  <tr>
                <td>
                ${offset+i+1}
              </td>
                <td>
                  <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                </td>
                
                <td>
                  <strong>${val[i].company_name}</strong>
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
                    <a onclick="storeCurrentUserID(${val[i].id})"  href="addSite.html"  class="btn btn-dark btn-sm btn-square rounded-pill">
                      <span class="btn-icon icofont-external-link"></span>
                    </a>
                    <a  onclick="storeCurrentUserID(${val[i].id})" href="customer-profile.html"  class="btn btn-info btn-sm btn-square rounded-pill">
                      <span class="btn-icon icofont-ui-edit"></span>
                    </a>
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteCustomer(${val[i].address_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>

                    <button onclick="update_customer_id(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill" 
                    data-bs-toggle="modal" data-bs-target="#suspend" 
                     onclick="">
                    <div class="icon sli-user-unfollow"></div>
                  </button>


                  </div>
                </td>
              </tr>`

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
            YOU HAVE NO AVAILABLE CUSTOMER 
          </div>
            </td>
          </tr>`)
          }


    }
    
    getTableDate2=function ( limit,offset){
      $('#loader2').css("display","block");

      $.ajax({
          type: "get", url:`${domain}/api/v1/customer/suspended_customers?limit=${limit}&offset=${offset}`,
          headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          dataType  : 'json',
          encode  : true,
        
          success: function (data) {
              
              $('#loader2').css("display","none");
              console.log(data)
              suspensionReason=data.data
              CreateTable2(data.data)

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
              data+= ` 
              <tr>
                <td>
                ${offset2+i+1}
              </td>
                <td>
                  <img src=${val[i].image} alt="" width="40" height="40" class="rounded-500">
                </td>
                
                <td>
                  <strong>${val[i].company_name}</strong>
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
                    <button onclick="displaySuspensionReason(${i})"  data-bs-toggle="modal" data-bs-target="#suspension_details"  class="btn btn-dark btn-sm btn-square rounded-pill">
                      <span class="btn-icon icofont-external-link"></span>
                    </button>

                    <button onclick="unSuspend(${val[i].id})" class="btn btn-error btn-sm btn-square rounded-pill" >
                     <div class="icon sli-user-following"></div>
                    </button>

                  </div>
                </td>
              </tr>
`

              if(i==val.length-1){

                  $('#mytable2').children().remove();
                  $("#mytable2").append(data)
              }
          }
        }else{

          $('#mytable2').children().remove();
          $("#mytable2").append(`    <tr>
          <td colspan="1000">
          
          <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
          YOU HAVE NO SUSPENDED CUSTOMER
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
        offset=offset-(limit)
        getTableDate(limit,offset)
        $(".page-item").removeClass("active");
        $("#Previous").addClass("active");

    }
}

function Next(){
    offset=offset+limit
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
        getTableDate2(limit,offset)
        $(".page-item2").removeClass("active");
        $("#Previous2").addClass("active");
    }
    console.log(limit2,offset2)

}

function Next2(){
    offset2=offset2+limit2
    getTableDate2(limit2,offset2)
    $(".page-item2").removeClass("active");
    $("#Next2").addClass("active");
    console.log(limit2,offset2)
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


function deleteCustomer(id){


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
        type: "post", url:`${domain}/api/v1/customer/deleteCustomer`,
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
          address_id:id      
        },
        success: function (data) {
    
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


function update_customer_id(id){
  customer_id=id
}

function clickHiddenBut(){
  document.getElementById("suspendFormButton").click()
}


let suspendForm=document.getElementById("suspendForm")
suspendForm.addEventListener("submit",(e)=>{
  e.preventDefault()

  let suspendInfo=document.getElementById("suspendInfo").value

  $.ajax({
    type: "post", url:`${domain}/api/v1/customer/suspend_customer_account`,
    headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
    data: {
      customer_id,
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
        type: "post", url:`${domain}/api/v1/customer/unsuspend_customer_account`,
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
          customer_id:id      
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