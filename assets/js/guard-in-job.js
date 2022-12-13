let limit=15,
offset=0,
getTableData='';
job_id=activeUserID



$(document).ready(function(){
    //FOR ALL CUSTOMER
    getTableData=function ( limit,offset){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/allJobs/guard`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                job_id      
              },
            success: function (data, text) {


                console.log(data.data)

                CreateTable(data.data)
                updateTopContent(data.data)
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
                analyzeError(request)
             
            }
        });
    }

    getTableData(limit,offset)
    function CreateTable(val){

        let data=''
                
        if(val.guard.length!=0){

            let guard=val.guard


            for(let i=0; i<guard.length; i++){

                data+= `
                <tr>
                                            <td>
                                                ${i+1}
                                            </td>
                                            <td>
                                                <img src=${guard[i].image} alt="" width="40" height="40"
                                                    class="rounded-500">
                                            </td>
                                            <td>
                                                <strong class="text-nowrap">${guard[i].first_name}  ${guard[i].last_name} </strong>
                                            </td>

                                            <td>
                                                <div class="text-muted text-nowrap">${guard[i].email}</div>
                                            </td>
                                            <td>
                                                <div class="address-col">$${guard[i].money_earned*val.job.guard_charge}</div>
                                            </td>
                                            <td>
                                                <div class="text-muted text-nowrap">
                                                    <button type="button" onclick="getSchedule(${guard[i].guard_id},${job_id})"   class="btn btn-outline-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#view_schedule">View</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="text-muted text-nowrap">
                                                    <button type="button" onclick="getLog(${guard[i].guard_id},${job_id})"    class="btn btn-outline-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#view_log">View</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="text-muted text-nowrap">
                                                    <button type="button" class="btn btn-outline-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#view-jobDetail">View</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="text-muted text-nowrap">
                                                    <button type="button" class="btn btn-outline-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#view-jobDetail">View</button>
                                                </div>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary">
                                                    Report <span class="badge badge-light badge-inside ms-2">4</span>
                                                </button>
                                            </td>
                                            <td>
                                            <div class="actions">
                                              <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteGuardSchedule(${guard[i].guard_id})">
                                                <span class="btn-icon icofont-ui-delete"></span>
                                              </button>
                                            </div>
                                          </td>
                                            
                                        </tr>
                 `

                if(i==guard.length-1){

                    $('#mytable1').children().remove();
                    $("#mytable1").append(data)
                }
            }
        }else{

        $('#mytable1').children().remove();
        $("#mytable1").append(`    <tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NOT ADDED GUARD YET
      </div>
        </td>
      </tr>`)
      }


    }

    function updateTopContent(val){
        $("#des").text("JOB DESCRIPTION: "+val.job.description)
        $("#name").text("SITE NAME: "+val.site.name)
        $("#timeZone").text("TIME ZONE: "+val.site.time_zone)

    }
    

  

  });


  

//FOR ACTIVE JOB

function Previous(){
    if(offset==0){
        $("#Previous").addClass("disabled");
    }
    else{
        $("#Previous").removeClass("disabled");
        offset=offset-(limit+1)
        getTableData(limit,offset)
        $(".page-item").removeClass("active");
        $("#Previous").addClass("active");
  
    }
  }
  
  function Next(){
    offset=offset+limit+1
    getTableData(limit,offset)
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
    
  
    
    getTableData(limit,offset)
  }
  
  

function getSchedule(guard_id ,job_id){
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneShedulePerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id,
            job_id      
          },
        success: function (data, text) {

            console.log(data.data)

            displaySchedule(data.data)
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
            analyzeError(request)
         
        }
    });
}



function displaySchedule(val){

    let data=''

    for(let i=0; i<val.length; i++){

        data+= `
        <tr>
        <td>${i+1}</td>
        <td>${val[i].check_in_date}</td>
        <td>${val[i].start_time}</td>
        <td>${val[i].check_out_date}</td>
        <td>${val[i].end_time}</td>
        <td>${val[i].hours}</td>
        <td>
            <div class="text-muted text-nowrap">
                <button type="button" class="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#view_schedule">select</button>
            </div>
        </td>
        <td>
            <div class="text-muted text-nowrap">
                <button type="button" class="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#view_schedule">select</button>
            </div>
        </td>
        <td>
              <div class="actions">
                <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardSchedule(${val[i].shedule_id},${val[i].guard_id},${val[i].job_id})">
                  <span class="btn-icon icofont-ui-delete"></span>
                </button>
              </div>
            </td>
      </tr>
         `

        if(i==val.length-1){

            $('#myschedule').children().remove();
            $("#myschedule").append(data)
        }
    }
    if(val.length==0){
        $('#myschedule').children().remove();
        $("#myschedule").append(`<tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO SCHEDULE  
      </div>
        </td>
      </tr>`)
    }

}





function getLog(guard_id ,job_id){
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/logPerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id,
            job_id      
          },
        success: function (data, text) {

            console.log(data.data)

            displayLog(data.data)
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
            analyzeError(request)
         
        }
    });
}




function displayLog(val){

    let data=''

    for(let i=0; i<val.length; i++){

        if(val[i].location_message=="in location"){
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].check_in_date}</td>
            <td>${val[i].check_in_time}</td>
            <td>${val[i].check_out_date}</td>
            <td>${val[i].check_out_time}</td>
            <td>${val[i].hours}</td>
            <td>

            <div class="text-nowrap text-success">
            <i class="icofont-check-circled"></i>  ${val[i].location_message}
          </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#view_schedule">view location</button>
                </div>
            </td>
          </tr>
             `
        }
        else{

            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].check_in_date}</td>
            <td>${val[i].check_in_time}</td>
            <td>${val[i].check_out_date}</td>
            <td>${val[i].check_out_time}</td>
            <td>${val[i].hours}</td>
            <td>
            
             <div class="text-nowrap text-danger">
             <i class="icofont-close-circled"></i> ${val[i].location_message}

           </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#view_schedule">view location</button>
                </div>
            </td>
          </tr>
             `

        }
  

        if(i==val.length-1){

            $('#myLog').children().remove();
            $("#myLog").append(data)
        }
    }

}



function deleteSingleGuardSchedule(schedule_id,guard_id,job_id){


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
      type: "post", url:`${domain}/api/v1/job/remove_guard_single_shedule`,
      headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
      data: {
        schedule_id,
        guard_id
      },
      success: function (data, text) {
  
          console.log(data.message)
          showModal(data.message)
  
          getSchedule(guard_id ,job_id)
          getTableData(limit,offset)

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
  


  function deleteGuardSchedule(guard_id){
        
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
        type: "post", url:`${domain}/api/v1/job/remove_guard_shedule`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            job_id,
          guard_id
        },
        success: function (data, text) {
    
            console.log(data.message)
            showModal(data.message)
    
            getTableData(limit,offset)
  
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