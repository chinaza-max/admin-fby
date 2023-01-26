let submitSite=document.getElementById("submitSite")
let updateForm=''
let myID=activeUserID
let myEmail=''
let myCstomer_id=''
let deleteButtonWasClick=false



function disPlayData(val){

    $("#siteOwner").text(`SITE OWNER: ${ val.full_name}`);
    $("#siteOwner2").text(`${ val.full_name} SITES`);
    let data=''
            for(let i=0; i<val.sites.length; i++){
                data+= `
                <div class="col-12 col-md-6" >
                 <div class="card " style="border: 1px solid #d3d3e7; padding: 20px 5px 20px 5px">
                 
                  <div class="card-body">
                    <form  class="updateForm">
                      <div class="form-group">
                        <label>Site name</label>
                        <input class="form-control update${val.sites[i].id}" type="text" name="siteName" id="siteName" value="${val.sites[i].site_name}" readonly>
                      </div>
  
                      <label  class="mt-3">Parameter constraints</label>
                      <div class="input-group mb-3">
                        <input class="form-control update${val.sites[i].id}" type="text" name="radius" id="radius" value=${val.sites[i].operations_area_constraint} required>
                        <span class="input-group-text">Meter</span>
                      </div>
  
                      <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input class="form-control ${"update"+val.sites[i].id}" type="text"  name="jobAmount"  id="jobAmount" value=${val.sites[i].client_charge} required>
                        <span class="input-group-text"> Job amount </span>

                      </div>
  

                      <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input class="form-control update${val.sites[i].id}" type="text" name="perHour"  id="perHour"  value=${val.sites[i].guard_charge} required>
                        <span class="input-group-text">hourly pay</span>

                      </div>


                      <div class="form-group mt-3">
                        <label>Address</label>

                        <textarea class="form-control" rows="4"  id="address" placeholder="${val.sites[i].address}" readonly></textarea>
                      </div>
  
                      <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-error" onclick="deleteSite(${val.sites[i].id})">Remove site</button>
                        <button type="button" class="btn btn-info" onclick="updateSite(${val.sites[i].id},${val.sites[i].facility_location_id})" >Update site</button>
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

            console.log(val.sites.length)
            console.log(val.sites)

            if(val.sites.length==0){
              console.log("yes yes yes yes ")

                $('#siteContainer').children().remove();
                $("#siteContainer").append(` <div class="alert alert-primary outline" role="alert">
                NO SITE HAS BEEN ADDED
              </div>`)
               
            }



    

}


submitSite.addEventListener("submit",(e)=>{
    e.preventDefault()

    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")      


    let position2 =position;

    const form = e.target;
    const formFields = form.elements,
    site_name = formFields.inputSiteName.value,
    guard_charge=formFields.inputGuardAmount.value,
    client_charge=formFields.inputJobCost.value,
    operations_area_constraint=formFields.radius.value||40,
    longitude=position2[1].toFixed(5),
    latitude=position2[0].toFixed(5),
    siteAddress=formFields.siteAddress.value,
    customer_id=myCstomer_id;


    //console.log(site_name,guard_charge,client_charge,operations_area_constraint,longitude,latitude,customer_id, siteAddress )
    
          $.ajax({
            type: "post", url:`${domain}/api/v1/customer/createFacility`,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
            data:{
              longitude:Number(longitude).toFixed(9),
              latitude:Number(latitude).toFixed(9),
              operations_area_constraint,
               client_charge:client_charge,
               guard_charge:guard_charge,
               address:siteAddress ,
               site_name,
               email:myEmail,
               google_address:contentString,
               customer_id
         },
            success: function (data, text) {
  
                showModal("SITE REGISTERATION SUCCESSFULL")
                getSiteTable()
                setTimeout(() => {
                        hideModal()
                }, alertLifeSpan);

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

                analyzeError(request)
             
            }
          });
  

    
    function  clearField(){
        formFields.inputSiteName.value='',
        formFields.inputGuardAmount.value='',
        formFields.inputJobCost.value='';
        formFields.siteAddress.value='';
    }

  

})



//FOR UPDATING OF UPDATE DATA
function updateSite(val,val2){

  let ele=document.querySelectorAll(".update"+val)
  let  client_charge2=ele[2].value
  let  guard_charge2=ele[3].value
  let operations_area_constraint=ele[1].value
  let site_name=ele[0].value


        $.ajax({
          type: "post", url:`${domain}/api/v1/customer/updateFacility`,
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
          data:{
            operations_area_constraint,
            client_charge:client_charge2,
            guard_charge:guard_charge2,
            site_name,
            facility_location_id:val2,
            site_id:val
       },
          success: function (data, text) {

              showModal("SITE UPDATE SUCCESSFULL")
              getSite()
              setTimeout(() => {
                      hideModal()
              }, alertLifeSpan);

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




// DELETE SITE 
function deleteSite(val){


        $.ajax({
          type: "post", url:`${domain}/api/v1/customer/deleteFacility`,
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
          data:{
            site_id:val
       },
          success: function (data, text) {

             console.log(data)
              showModal(data.message)

              setTimeout(() => {
                      getSite()
                      hideModal()
              }, alertLifeSpan2);

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



//CSS FUNCTION TO SCROLL
let moveViewToMap=0
$("#pac-input").focus(function() {


  if(moveViewToMap==0){
    let scrollMapTOView=document.getElementById("scrollMapTOView")
    scrollMapTOView.click()
    moveViewToMap=2
  }
  

});


//let getSite

let getSiteTable
$(document).ready(function(){


  
  getSite=function(){
    $.ajax({
        type: "get", url:`${domain}/api/v1/customer/one?id=${myID}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        success: function (data) {

            myEmail=data.data[0].email
            myCstomer_id=data.data[0].id

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
         
        }
    });
  }
  getSite()

  

  getSiteTable=function(){
    var table = $('#example').DataTable({
      ajax: {
          url: `${domain}/api/v1/customer/one?id=${myID}`,
          method: "get",
          dataType  : 'json',
          encode  : true,
          dataSrc: function (data) {
            return data.data[0].sites;
          },
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        }, 
        columnDefs: [

          {
            render: function (data, type, full, meta) {

              return  `
                      <button   data-bs-toggle="modal" onclick="getSingleSiteDetails(${data})" data-bs-target="#editSiteLocation" class="btn btn-info btn-sm btn-square rounded-pill">
                                      <span class="btn-icon icofont-ui-edit"></span>
                                    </button>
                                    <a  href="customer-job.html" class="btn btn-dark btn-sm btn-square rounded-pill">
                                      <span class="btn-icon icofont-external-link"></span>
                                    </a>
                                    <button class="btn btn-error btn-sm btn-square rounded-pill">
                                      <span class="btn-icon icofont-ui-delete"></span>
                                    </button>
          `
  
            },
            targets: 6
          }
       
        ],
        columns:[
          {data: "site_name" },
          {data: "latitude" },
          {data: "longitude" },
          {data: "operations_area_constraint" },
          {data: "client_charge" },
          {data: "guard_charge"},
          {data: "facility_location_id" },
          {data: "id" },
          {data: "operations_area_constraint_active"}
          ],
      responsive: true,
 
  })



  setTimeout(() => {

      let column1 = table.column(7);
      column1.visible(!column1.visible());
      let column2 = table.column(8);
      column2.visible(!column2.visible());
    //var column2 = table.column(16);
   // column2.visible(!column2.visible());
 
    
    }, 1000);
  }

  getSiteTable()



})



function getSingleSiteDetails(id){


  $.ajax({
    type: "get", url:`${domain}/api/v1/customer/get_all_site_or_single_site?type=singleSite&id=${id}`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data) {
      console.log(data)

       displayForEditing(data.data)
    },
    error: function (request, status, error) {
        analyzeError(request)
     
    }
  });
}



function displayForEditing(val){

  let data=''
          console.log(val)
  if(val.operations_area_constraint){
      data=`
      <label  class="mt-3">Parameter constraints</label>
      <div class="input-group mb-3">
        <input class="form-control  type="text" name="radius" id="radius" value=${val.operations_area_constraint} required>
        <span class="input-group-text">Meter</span>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input class="form-control"  type="text"  name="jobAmount"  id="jobAmount" value=${val.client_charge} required>
        <span class="input-group-text"> Job amount </span>

      </div>


      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input class="form-control  type="text" name="perHour"  id="perHour"  value=${val.guard_charge} required>
        <span class="input-group-text">hourly pay</span>
      </div>

      <div class="input-group mb-3">
        <input class="form-control" type="text"   value=${val.latitude} required>
        <span class="input-group-text">Latitude</span>
      </div>

      <div class="input-group mb-3">
        <input class="form-control" type="text"   value=${val.longitude} required>
        <span class="input-group-text">Longitude</span>
      </div>

      <div class="input-group mb-3">
        <input class="form-control" type="text" name="siteName" id="siteName" value="${val.site_name}" required>
        <span class="input-group-text">Site name</span>
      </div>

      <div class="input-group mb-3">
        <textarea class="form-control" rows="4"  id="address" placeholder="${val.address}" required></textarea>
        <span class="input-group-text">Address</span>
      </div>
      `


      console.log(data)
      $('#editSiteContainer').children().remove();
      $("#editSiteContainer").append(data)

  }else{

  }


}
/*
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
  alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}



function successFunction(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log('Your latitude is :'+lat+' and longitude is '+long);
}
function errorFunction(err) {

  console.log(err);
}


*/

