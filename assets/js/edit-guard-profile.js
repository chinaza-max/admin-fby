/*
const password=document.getElementById("password")*/
const updateUser=document.getElementById("updateUser")

let id=Number(activeGuardID)
let my_license_id=''

/*

password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        data: {
            email:userEmail,
        },
        dataType  : 'json',
        encode  : true,
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

*/



let myCoor
getLatAndLon(function(latLon) {
  myCoor= latLon;
})

updateUser.addEventListener("submit",(e)=>{

    e.preventDefault()
    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")


    const formData=new FormData()

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.gender.value,
    date_of_birth=formFields.dataOfBirth.value,
    address=formFields.address.value;
    phoneNumber=formFields.phoneNumber.value;


   formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("date_of_birth", date_of_birth);
    formData.append("gender", gender);
    formData.append("address",address);
    formData.append("phone_number",phoneNumber);
    formData.append("id",id);
    console.log(typeof(id))


        for (const value of formData.values()) {
            console.log(value);
          }

          fetch(`${domain}/api/v1/user/updateProfileGuard`, {
                method: 'POST',
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
                       

                        setTimeout(() => {
                          getProfileData()
                        }, 200);
                        showModal(data.message)
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
                        console.log(data.errors)
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


/*

function checkImg(e){
    document.getElementById('avatar2').src = window.URL.createObjectURL(e.files[0])
}
*/


let getProfileData
let getLicense

$(document).ready(function(){

    getProfileData=  function(){
        $.ajax({
            type: "post", url:`${domain}/api/v1/auth/profile_info`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
              id
            },
            success: function (data) {


                console.log(data)
                localStorage.setItem('userDetails', btoa(JSON.stringify(data.data.user)));

                $("#avatar").attr("src",data.data.user.image);
                $("#avatar2").attr("src",data.data.user.image);
                $("#firstName").val(data.data.user.first_name);
                $("#lastName").val(data.data.user.last_name);
                $("#email").val(data.data.user.email);
                $("#address").val(data.data.user.address);
                $("#dataOfBirth").val(data.data.user.date_of_birth);
                $("#phoneNumber").val(data.data.user.phone_number);


                if(data.data.user.gender){
                    $('select[name=status]').val(data.data.user.gender);
                    $('.selectpicker').selectpicker('refresh')
                }


                if(data.data.user.suspended==true){
                    $('select[name=guard_status]').val("Suspended");
                    $('.selectpicker').selectpicker('refresh')
                }
                else{
                    
                    $('select[name=guard_status]').val("Active");
                    $('.selectpicker').selectpicker('refresh')
                
                }
                if(data.data.user.gender){
                    $('select[name=gender]').val(data.data.user.gender);
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
    }
    getProfileData()


    getLicense=function(){
        $.ajax({
            type: "post", url:`${domain}/api/v1/user/LicenseRUD?type=read` ,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data:{
                latitude: Number(myCoor.lat).toFixed(8),
                longitude: Number(myCoor.lon).toFixed(8),
                id
            },
            success: function (data) {

                console.log(data)
                displayLicenseDetails(data.data)
        
            },
            error: function (request, status, error) {
    
    
                analyzeError(request)
                //localStorage.removeItem("myUser");
                
              //  window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
              //  window.location.replace('/sign-in.html')
             // window.location.href =window.location.toString().split('/')[0] + "/dist/sign-in.html"
            }
        });
    }
    
    getLicense()

})



function displayLicenseDetails(val){
    let data=''


    console.log(val)
    if(val.length!=0){
        for (let index = 0; index < val.length; index++) {

          let path =String.raw`${val[index].url}`
          let path2 = path.replace(/\\/g, "/");

          console.log(path2)
                
            if(val[index].status=="Expired"){
                data+=`
                <div class="accordion-item">
                <h2 class="accordion-header accordion-Expired" id="flush-headingOne${index}">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${index}" aria-expanded="false" aria-controls="flush-collapseOne${index}">
                  #${index+1} Expiry date: ${val[index].expiry_date}
                  </button>
                </h2>
                <div id="flush-collapseOne${index}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${index}" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">


                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th scope="col">Posted</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Delete</th>
                      </tr>
                      </thead>
                      <tbody id="licenseDetail">

                        <tr>
                          <td class="nowrap text-muted ">
                          ${val[index].Posted}
                          </td>
              
                          <td class="nowrap">
                          <span class="badge badge-danger">${val[index].status}</span> 
                          </td>
              
                          <td class="nowrap">
                            <button onclick="attarchPDF2('${path2}')"   class="btn btn-outline-primary btn-square rounded-pill" fdprocessedid="4a7xi3" 
                            data-bs-toggle="modal"
                            data-bs-target="#view_license2">
                              <span class="btn-icon icofont-file-alt"></span>
                            </button>
                          </td>
                          
                          <td>
                            <button onclick="deleteGuardLicense('${val[index].license_id}')" class="btn btn-error btn-sm btn-square rounded-pill" fdprocessedid="9ditxn">
                              <span class="btn-icon icofont-ui-delete"></span>
                            </button>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                   
                  </div>
                </div>
              </div>

                 `
            }
            else if(val[index].status=="Approved"){
                data+=`
         
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne${index}">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${index}" aria-expanded="false" aria-controls="flush-collapseOne${index}">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled checked>
                  #${index+1} Expiry date:${val[index].expiry_date}
                  
                  </button>
                </h2>
                <div id="flush-collapseOne${index}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${index}" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">
  
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Delete</th>
                      </tr>
                      </thead>
  
                      <tbody id="licenseDetail">
                        <tr>
                          <td class="nowrap">
                            <span class="badge badge-success">${val[index].status}</span> 
                          </td>
              
                          <td class="nowrap">
                            <button  onclick="attarchPDF2('${path2}')"  class="btn btn-outline-primary btn-square rounded-pill" fdprocessedid="4a7xi3" data-bs-toggle="modal"
                            data-bs-target="#view_license2">
                              <span class="btn-icon icofont-file-alt"></span>
                            </button>
                          </td>
                          
                          <td>
                            <button onclick="deleteGuardLicense('${val[index].license_id}')"  class="btn btn-error btn-sm btn-square rounded-pill" fdprocessedid="9ditxn">
                              <span class="btn-icon icofont-ui-delete"></span>
                            </button>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                   
                  </div>
                </div>
              </div>
                   `
            }
            else if(val[index].status=="Pending"){
                data+=`
           
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne${index}">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${index}" aria-expanded="false" aria-controls="flush-collapseOne${index}">
                     #${index+1} Expiry date:${val[index].expiry_date}
                  </button>
                </h2>
                <div id="flush-collapseOne${index}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${index}" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">
  
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th scope="col">Posted</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Delete</th>
                      </tr>
                      </thead>
  
                      <tbody id="licenseDetail">
                      
                        <tr>

                        <td class="nowrap text-muted ">
                        ${val[index].Posted}
                        </td>
                          <td class="nowrap">
                            <span class="badge badge-info">${val[index].status}</span> 
                          </td>
              
                          <td class="nowrap">
                            <button  onclick="attarchPDF('${path2}');updateLicenseId(${val[index].license_id})" class="btn btn-outline-primary btn-square rounded-pill" fdprocessedid="4a7xi3" data-bs-toggle="modal"
                            data-bs-target="#view_license">
                              <span class="btn-icon icofont-file-alt"></span>
                            </button>
                          </td>
                          
                          <td>
                            <button    onclick="deleteGuardLicense('${val[index].license_id}')"   class="btn btn-error btn-sm btn-square rounded-pill" fdprocessedid="9ditxn">
                              <span class="btn-icon icofont-ui-delete"></span>
                            </button>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                   
                  </div>
                </div>
              </div>
                   `
            }

            if(index==val.length-1){

                $('#accordionFlushExample').children().remove();
                $("#accordionFlushExample").append(data)
            }
        }
    }
    else{
        data+=`
        <tr>
        <td  colspan="3" class="text-center">
            No license uploaded
        </td>
      </tr>
         `
         $('#accordionFlushExample').children().remove();
         $("#accordionFlushExample").append(data)
    }

}   


function updateLicenseId(id){
  my_license_id=id
}

function deleteGuardLicense(id){

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
          type: "post", url:`${domain}/api/v1/user/LicenseRUD?type=delete`,
          dataType  : 'json',
          encode  : true,
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            latitude: Number(myCoor.lat).toFixed(8),
            longitude: Number(myCoor.lon).toFixed(8),
            id      
          },
          success: function (data) {
              showModal(data.message)
              setTimeout(() => {
                      hideModal()
                      getLicense()
              }, 3000)      
             
          },
          error: function (request, status, error) {
    
              console.log(request.responseJSON.status)
      
              analyzeError(request)
           
          }
        });
      }
    
    })

}

function approveLicense(){

    $.ajax({
        type: "post", url:`${domain}/api/v1/user/LicenseRUD?type=approved`,
        dataType  : 'json',
        encode  : true,
        headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
          latitude: Number(myCoor.lat).toFixed(8),
          longitude: Number(myCoor.lon).toFixed(8),
          id:my_license_id
        },
        success: function (data) {
            showModal(data.message)
            setTimeout(() => {
                    hideModal()
                    getLicense()
            }, 3000)      
            
        },
        error: function (request, status, error) {
    
            console.log(request.responseJSON.status)
    
            analyzeError(request)
        
        }
    });
  
}



function attarchPDF(URL){

  // Get the canvas element
  var canvas = document.getElementById('pdf-canvas');

  // Load the PDF
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.js';
  pdfjsLib.getDocument(`${URL}`).promise.then(function(pdf) {
    // Get the first page of the PDF
    pdf.getPage(1).then(function(page) {
      // Get the viewport of the page
      var viewport = page.getViewport({ scale: 1 });

      // Set the canvas dimensions to match the viewport
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the page on the canvas
      var renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      page.render(renderContext);
    });
  });

}

function attarchPDF2(URL){


  
  // Get the canvas element
  var canvas = document.getElementById('pdf-canvas2');

  // Load the PDF
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@latest/build/pdf.worker.min.js';
  pdfjsLib.getDocument(`${URL}`).promise.then(function(pdf) {
    // Get the first page of the PDF
    pdf.getPage(1).then(function(page) {
      // Get the viewport of the page
      var viewport = page.getViewport({ scale: 1 });

      // Set the canvas dimensions to match the viewport
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the page on the canvas
      var renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      page.render(renderContext);
    });
  });

}

