let limit=15,
offset=0,
getTableData='';
job_id=activeUserID



$(document).ready(function(){


    $('#loader1').css("display","block");

    getTableData=function ( limit,offset){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/allJobs/guard`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                job_id      
            },
            success: function (data) {
                $('#loader1').css("display","none");
                CreateTable(data.data)
                updateTopContent(data.data)
            },
            error: function (request, status, error) {
                $('#loader1').css("display","none");
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

                    data+=`
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
                            <div class="d-flex align-items-center nowrap text-primary">
                                <span class="icofont-ui-cell-phone p-0 me-2"></span>
                                ${guard[i].phone_number}
                            </div>
                        </td>
                        <td>
                            <div class="text-nowrap">$${(guard[i].hours_worked*val.job.guard_charge).toFixed(2)}</div>
                        </td>
                        <td>
                            <div class="text-muted text-nowrap">
                                <button type="button" onclick="getSchedule(${guard[i].guard_id},${job_id})" class="btn btn-outline-primary"
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
                            <button type="button" onclick="getLogSecurityCheck(${guard[i].guard_id},${job_id})"    class="btn btn-outline-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#view_log_security_check" >View</button>
                        </div>
                    </td>
                        <td>
                            <div class="text-muted text-nowrap">
                                <button type="button" onclick="getInstruction(${guard[i].guard_id},${job_id})"  class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#view_instruction">View</button>
                            </div>
                        </td>
                        <td>
                            <div class="text-muted text-nowrap">
                                <button type="button" onclick="getTask(${guard[i].guard_id},${job_id})" class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#view_task" >View</button>
                            </div>
                        </td>
                        <td>
                            <a    onclick="setGuardName('${guard[i].first_name} ${guard[i].last_name}'); setGuardId(${guard[i].guard_id})" href="/reportPerGuard.html" class="btn btn-primary"  >
                                Report <span class="badge badge-light badge-inside ms-2">${guard[i].no_of_report}</span>
                            </a>    
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
        $("#qr_code_count").text(val.job.no_qr_code)

        
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

    $('#loader2').css("display","block");

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneShedulePerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id,
            job_id      
          },
        success: function (data) {

            $('#loader2').css("display","none");
            displaySchedule(data.data)
          
        },
        error: function (request, status, error) {
            $('#loader2').css("display","none");
            analyzeError(request)
         
        }
    });
}



function displaySchedule(val){

    let data=''

    for(let i=0; i<val.length; i++){

        if(val[i].schedule_accepted_by_admin){
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
                    onclick="selectDateTime('${val[i].check_in_date}','${val[i].start_time}',${val[i].schedule_id},'Check in',${val[i].job_id},${val[i].guard_id},${i+1})">Select</button>
                </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                    onclick="selectDateTime('${val[i].check_out_date}','${val[i].end_time}',${val[i].schedule_id},'Check out',${val[i].job_id},${val[i].guard_id},${i+1})">Select</button>
                </div>
            </td>
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardSchedule(${val[i].schedule_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                    <button type="button" class="btn btn-outline-primary"
                        onclick="toggleScheduleAcceptance(${val[i].schedule_id},${val[i].guard_id},${val[i].job_id},'false')">Reject
                    </button>
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
            <td>${val[i].start_time}</td>
            <td>${val[i].check_out_date}</td>
            <td>${val[i].end_time}</td>
            <td>${val[i].hours}</td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                    onclick="selectDateTime('${val[i].check_in_date}','${val[i].start_time}',${val[i].schedule_id},'Check in',${val[i].job_id},${val[i].guard_id},${i+1})">Select</button>
                </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                    onclick="selectDateTime('${val[i].check_out_date}','${val[i].end_time}',${val[i].schedule_id},'Check out',${val[i].job_id},${val[i].guard_id},${i+1})">Select</button>
                </div>
            </td>
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardSchedule(${val[i].schedule_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                    <button type="button" class="btn btn-outline-primary"
                        onclick="toggleScheduleAcceptance(${val[i].schedule_id},${val[i].guard_id},${val[i].job_id},'true')">Accept
                    </button>
                  </div>
                </td>
          </tr>
             `
    
        }
      
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


let checkAction=document.getElementById("checkAction")
let mySchedule_id
let buttonInfo
let myGuard_id


function toggleScheduleAcceptance(schedule_id,guard_id,job_id,status){

        $.ajax({
        type: "post", url:`${domain}/api/v1/job/update_schedule_accept_status`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
        data: {
            schedule_id,
            status
        },
        success: function (data) {
    
            showModal(data.message)

            setTimeout(() => {
                getSchedule(guard_id ,job_id)
            }, 100);
            setTimeout(() => {
                hideModal()
            }, 3000);
            
        },
        error: function (request, status, error) {
            analyzeError(request)
        }
        });
    
}

function selectDateTime(date ,time ,schedule_id, text,job_id,guard_id,schedule_no){

    $('#selectDateTime').modal('show');
    $("#schedule_no").text(`Schedule (${schedule_no})`)
    let dt = moment(time, ["h:mm A"]).format("HH:mm");
    document.getElementById('myDate').value = date;
    document.getElementById('myTime').value = dt;
    $("#checkAction").text(text)
    
    checkAction.addEventListener("click",checkActionButton)
    mySchedule_id=schedule_id
    buttonInfo=text
    myGuard_id=guard_id    
}

function checkActionButton(){
    let myNewDate=document.getElementById("myDate").value
    let myNewTime=document.getElementById("myTime").value

    let fullDate=moment(new Date(myNewDate+'  '+myNewTime)).format("YYYY-MM-DD hh:mm:ss a")
    let checkInOrOut= buttonInfo=='Check in'? true:false;
    checkInAndOut(fullDate,checkInOrOut,myGuard_id,job_id,mySchedule_id)
}


$("#selectDateTime").on('hidden.bs.modal', function() {  
    checkAction.removeEventListener("click",checkActionButton)
})


function checkInAndOut(date,check_in,guard_id,job_id,schedule_id){

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/check_in_admin`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
            date,
            check_in,
            guard_id,
            job_id,
            schedule_id  
          },
        success: function (data) {
            showModal(data.message)

            setTimeout(() => {
                hideModal()
           }, 3000);
      
        },
        error: function (request, status, error) {

            let myMessage=request.responseJSON.message
            let solution="Check date well"
            if(request.responseJSON.status=="conflict-error"){
                Swal.fire({
                    icon: 'error',
                    title:myMessage,
                    text: solution,
                    footer: "NOTE :Date must be in between guard shift"
                })
            }
         
        }
    });
}


function getInstruction(guard_id ,job_id){

    $('#loader5').css("display","block");

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneAgendaPerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
            guard_id,
            job_id,
            type:"INSTRUCTION"  
          },
        success: function (data) {

            $('#loader5').css("display","none");

            displayInstruction(data.data)
      
        },
        error: function (request, status, error) {
            $('#loader5').css("display","none");
            analyzeError(request)
         
        }
    });
}

function displayInstruction(val){

    let data=''

    for(let i=0; i<val.length; i++){

        if(val[i].agenda_done){
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>${val[i].scanned_at}</td>
            <td>${val[i].title}</td>
            <td>${val[i].description}</td>
            <td>
                <div class="text-nowrap text-success">
                    <i class="icofont-check-circled"></i> Done
                </div>
            </td>
           
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardAgenda(${val[i].agenda_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                  </div>
                </td>
          </tr>
             `
        }
        else{
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>${val[i].scanned_at}</td>
            <td>${val[i].title}</td>
            <td style="max-width:200px">${val[i].description}</td>
            <td>
                <div class="text-nowrap text-danger">
                    <i class="icofont-close-circled"></i> Not done
                </div>
            </td>
    
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardAgenda(${val[i].agenda_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                  </div>
                </td>
          </tr>
             `
        }

      

        if(i==val.length-1){

            $('#myInstruction').children().remove();
            $("#myInstruction").append(data)
        }
    }
    if(val.length==0){
        $('#myInstruction').children().remove();
        $("#myInstruction").append(`<tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO INSTRUCTION  
      </div>
        </td>
      </tr>`)
    }

}


function getTask(guard_id ,job_id){

    $('#loader6').css("display","block");

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneAgendaPerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id,
            job_id,
            type:"TASK"
          },
        success: function (data) {        
            $('#loader6').css("display","none");
            displayTask(data.data);
        },
        error: function (request, status, error) {
            $('#loader6').css("display","none");
            analyzeError(request)
        }
    });
}

function displayTask(val){

    let data=''

    for(let i=0; i<val.length; i++){

        
        if(val[i].agenda_done){
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>${val[i].scanned_at}</td>
            <td>${val[i].title}</td>
            <td>${val[i].description}</td>
            <td>
                <div class="text-nowrap text-success">
                    <i class="icofont-check-circled"></i> Done
                </div>
            </td>
           
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardAgenda(${val[i].agenda_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                  </div>
                </td>
          </tr>
             `
        }
        else{
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>${val[i].scanned_at}</td>
            <td>${val[i].title}</td>
            <td style="max-width:200px">${val[i].description}</td>
            <td>
                <div class="text-nowrap text-danger">
                    <i class="icofont-close-circled"></i> Not done
                </div>
            </td>
    
            <td>
                  <div class="actions">
                    <button class="btn btn-error btn-sm btn-square rounded-pill" onclick="deleteSingleGuardAgenda(${val[i].agenda_id},${val[i].guard_id},${val[i].job_id})">
                      <span class="btn-icon icofont-ui-delete"></span>
                    </button>
                  </div>
                </td>
          </tr>
             `
        }


        if(i==val.length-1){

            $('#myTask').children().remove();
            $("#myTask").append(data)
        }
    }
    if(val.length==0){
        $('#myTask').children().remove();
        $("#myTask").append(`<tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO TASK  
      </div>
        </td>
      </tr>`)
    }

}



function getLogSecurityCheck(guard_id ,job_id){

    $('#loader4').css("display","block");

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/get_perform_security_check_log`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id,
            job_id      
          },
        success: function (data) {

            $('#loader4').css("display","none");

            displayLogSecurityCheck(data.data)
  
        },
        error: function (request, status, error) {
            $('#loader4').css("display","none");
            analyzeError(request)
         
        }
    });
}


function displayLogSecurityCheck(val){

    let data=''

    for(let i=0; i<val.length; i++){

        if(val[i].status){
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].date}</td>
            <td>${val[i].message}</td>
            <td>
                <div class="text-nowrap text-success">
                    <i class="icofont-check-circled"></i> In location
                </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#" disabled>view location</button>
                </div>
            </td>
          </tr>
             `
        }
        else{

            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].date}</td>
            <td>${val[i].message}</td>
            <td>
             <div class="text-nowrap text-danger">
             <i class="icofont-close-circled"></i> Not in location
           </div>
            </td>
            <td>
                <div class="text-muted text-nowrap">
                    <button type="button" class="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#" disabled>view location</button>
                </div>
            </td>
          </tr>
             `

        }
  
        if(i==val.length-1){

            $('#mySecurityCheck').children().remove();
            $("#mySecurityCheck").append(data)
        }
    }
    if(val.length==0){
        $('#mySecurityCheck').children().remove();
        $("#mySecurityCheck").append(`<tr>
        <td colspan="1000">
            
            <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
            YOU HAVE NO SECURITY CHECK LOGS  
        </div>
            </td>
        </tr>`)
    }

}

function getLog(guard_id ,job_id){

    $('#loader3').css("display","block");

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
            $('#loader3').css("display","none");


            displayLog(data.data)
        },
        error: function (request, status, error) {

            $('#loader3').css("display","none");
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
    if(val.length==0){
        $('#myLog').children().remove();
        $("#myLog").append(`<tr>
        <td colspan="1000">
            
            <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
            YOU HAVE NO LOGS  
        </div>
            </td>
        </tr>`)
    }

}

function deleteSingleGuardAgenda(agenda_id,guard_id,job_id){
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
              type: "post", url:`${domain}/api/v1/job/deleteAgenda`,
              dataType  : 'json',
              encode  : true,
              headers: {
                  "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
                  },
              data: {
                agenda_id
              },
              success: function (data) {
                
                  showModal(data.message)
                  getInstruction(guard_id ,job_id)
                  getTask(guard_id ,job_id)
                  getTableData(limit,offset)
  
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
            success: function (data) {
        
                showModal(data.message)
        
                getSchedule(guard_id ,job_id)
                getTableData(limit,offset)

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
        success: function (data) {
            showModal(data.message)
    
            getTableData(limit,offset)
  
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



function setGuardName(val){

    const encodedData = btoa(val)
    localStorage.setItem("guardName",encodedData)
}


function setGuardId(val){

    const encodedData = btoa(val);
    localStorage.setItem("guardId",encodedData)
}