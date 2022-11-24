let submitSite=document.getElementById("submitSite")
let myID=activeUserID
let myEmail=''
let position2 =position;
let myCstomer_id=''



getSite()
function getSite(){
    $.ajax({
        type: "get", url:`${domain}/api/v1/customer/one?id=${myID}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        success: function (data, text) {
            myEmail=data.data[0].email
            myCstomer_id=data.data[0].id
            disPlayData(data.data[0])

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

function disPlayData(val){
    $("#siteOwner").text(`SITE OWNER: ${ val.full_name}`);
    $("#siteOwner2").text(`${ val.full_name} SITES`);
    let data=''


            for(let i=0; i<val.sites.length; i++){
                data+= `
                <div class="col-12 col-md-6" >
                <div class="card" style="border: 1px solid blue; padding: 20px 5px 20px 5px">
                 
                  <div class="card-body">
                    <form>
                      <div class="form-group">
                        <label>Site name</label>
                        <input class="form-control" type="text" id="siteName" value="${val.sites[i].site_name}">
                      </div>
  
                      <div class="form-group">
                        <label>Parameter constraints</label>
                        <input class="form-control" type="text" id="radius" value=${val.sites[i].operations_area_constraint}>
                      </div>
  
                      <div class="form-group">
                        <label>Job amount </label>

                        <input class="form-control" type="text" id="jobAmount" value=$${val.sites[i].client_charge}>
                      </div>
  
                      <div class="form-group">
                        <label>Guard pay Per/H</label>
                        <input class="form-control" type="text"  id="perHour"  value=$${val.sites[i].guard_charge}>
                      </div>
  
                      <div class="form-group">
                        <textarea class="form-control" rows="4" id="address" placeholder="${val.sites[i].address}" readonly></textarea>
                      </div>
  
                      <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-error" >Remove site</button>
                        <button type="button" class="btn btn-info">Update site</button>
                      </div> 
                    </form>
                  </div>
                </div>
              </div>
                `

                if(i==val.sites.length-1){

                    $('#siteContainer').children().remove();
                    $("#siteContainer").append(data)
                }
            }



    

}





submitSite.addEventListener("submit",(e)=>{
    e.preventDefault()
    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")

    const form = e.target;
    const formFields = form.elements,
    site_name = formFields.inputSiteName.value,
    email=myEmail,
    address=contentString,
    guard_charge=formFields.inputGuardAmount.value,
    client_charge=formFields.inputJobCost.value,
    operations_area_constraint=formFields.radius.value,
    longitude=position2[i],
    latitude=position2[0],
    customer_id=myCstomer_id;


    console.log(site_name,email,address,guard_charge,client_charge,operations_area_constraint,longitude,latitude,customer_id  )

/*
    if (typeof email === 'string') {

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

          $.ajax({
            type: "post", url:`${domain}/api/v1/auth/register`,
            data: {
                    first_name,
                    last_name,
                    email,
                    date_of_birth,
                    gender,
                    password,
                    address,
            },
            success: function (data, text) {
  
                console.log(data.message)
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

*/

})
