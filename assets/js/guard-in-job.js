let limit=15,
offset=0,
getTableData='',
getAllGuard='',
scheduleIdToAddNote='',
activeGuardInstruction=[],
activeGuardTask=[],
activeGuardInstructionStatus=true,
activeGuardTaskStatus=true,
activeGuardScheduleAll=[];


let ReAssignButton=document.getElementById("ReAssignButton")

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

    function getAllGuard(){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/getGuard`,
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
              job_id,
            },
            success: function (data) {

                    console.log(data.data)
                  displayGuard(data.data,"selectpickerReassign")
                setTimeout(() => {
                        hideModal()
                }, 3000);
        
            },
            error: function (request, status, error) {
        
                analyzeError(request)
             
            }
          });
    }

    getAllGuard()
  });


  function displayGuard(val,picker){
    let data=''
   
      for(let i=0;i<val.length;i++){
          data+=`
          <option data-name=${val[i].guard_id}>${val[i].full_name}</option>
          `
          if(i==val.length-1){

            $(`.${picker}`).children().remove();
            $(`.${picker}`).append(data)
            $('.selectpicker').selectpicker('refresh')

          }
      }
      if(val.length==0){
        $(`.${picker}`).children().remove();
        $(`.${picker}`).selectpicker('refresh')

      }


}


  

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
        dataType  : 'json',
        encode  : true,
        data: {
            guard_id,
            job_id      
          },
        success: function (data) {

            $('#loader2').css("display","none");
            console.log(data.data)
            displaySchedule(data.data)
          
        },
        error: function (request, status, error) {
            $('#loader2').css("display","none");
            analyzeError(request)
         
        }
    });
}



function displaySchedule(val){
    activeGuardScheduleAll=[]
    
     let data=''
    if(val[0].is_started_all==true||val.length==0){
        $("#ReAssignButton").attr("disabled", true);
    }

    for(let i=0; i<val.length; i++){
        
        if(val[i].is_started==false){
            activeGuardScheduleAll.push(val[i])
            $("#ReAssignButton").removeAttr("disabled");

        }
      

        if(val[i].is_started){
            if(val[i].schedule_accepted_by_admin){

                data+= `
                <tr>
                <td>${i+1}</td>
                <td> 

                <label for="">
                    <a class="gear"  data-bs-toggle="popover" title="Reference date" data-bs-content=" Enter the actual time event took place">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </a>
                </label>
                
                
                
                ${val[i].check_in_date}</td>
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

                        <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal" data-bs-target="#add_note"  onclick="scheduleIdToAddNoteFunc(${val[i].schedule_id})">
                            <span class="btn-icon icofont-ui-edit"></span>
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
                        
                        <button type="button" class="btn btn-outline-primary"
                            onclick="toggleScheduleAcceptance(${val[i].schedule_id},${val[i].guard_id},${val[i].job_id},'true')">Accept
                        </button>
                        
                        <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal" data-bs-target="#add_note" onclick="scheduleIdToAddNoteFunc(${val[i].schedule_id})">
                        <span class="btn-icon icofont-ui-edit"></span>
                        </button>
                 
                      </div>
                    </td>
              </tr>
                 `
        
            }
        }
        else{


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

                        <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal" data-bs-target="#add_note" onclick="scheduleIdToAddNoteFunc(${val[i].schedule_id})">
                        <span class="btn-icon icofont-ui-edit"></span>
                        </button>
                      
                        <div class="form-check mt-3" style="margin-left:20px;">
                            <input class="form-check-input checkBox" type="checkbox" value='${JSON.stringify(val[i])}'  id="defaultCheck${i}" checked>
                            <label class="form-check-label" for="defaultCheck${i}">
                                re-assign
                            </label>
                        </div>
    
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

                        <button class="btn btn-info btn-sm btn-square rounded-pill" data-bs-toggle="modal" data-bs-target="#add_note" onclick="scheduleIdToAddNoteFunc(${val[i].schedule_id})">
                        <span class="btn-icon icofont-ui-edit"></span>
                        </button>
                       
                        <div class="form-check mt-2 ml-10px" >
                            <input class="form-check-input checkBox" type="checkbox" value='${JSON.stringify(val[i])}'  id="defaultCheck${i}">
                            <label class="form-check-label" for="defaultCheck${i}">
                                re-assign
                            </label>
                        </div>

                      </div>
                    </td>
              </tr>
                 `
        
            }

        }
  

        if(i==val.length-1){

            $('#myschedule').children().remove();
            $("#myschedule").append(data)

            var checkboxes = document.querySelectorAll(".checkBox");

            checkboxes.forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                
                    if (this.checked) {
                        addSchedule(JSON.parse(this.value))

                    } else {
                        removeSchedule(JSON.parse(this.value))

                    }

                    console.log(activeGuardScheduleAll)
                    if(activeGuardScheduleAll.length==0){
                        $("#ReAssignButton").attr("disabled", true);

                    }
                    else{
                        $("#ReAssignButton").removeAttr("disabled");
                    }


                })
            });

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

    $('.gear').popover({
        title:"titke",
        content:"click me",
        trigger:"click"
    });
    $('.kpi').live('mouseleave', function(e) {
        $('.gear').remove();
    });
 

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
        dataType  : 'json',
        encode  : true,
        data: {
            guard_id,
            job_id,
            type:"TASK"
          },
        success: function (data) {        
            $('#loader6').css("display","none");
            console.log(data.data)
            displayTask(data.data);
        },
        error: function (request, status, error) {
            $('#loader6').css("display","none");
            analyzeError(request)
        }
    });
}

function displayTask(val){


    console.log(val)
    let data=''

    for(let i=0; i<val.length; i++){

        
        if(val[i].agenda_done){
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>'${val[i].done_at}'</td>
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

            console.log(val[i].done_at)
            data+= `
            <tr>
            <td>${i+1}</td>
            <td>${val[i].operation_date}</td>
            <td>'${val[i].done_at}'</td>
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
        dataType  : 'json',
        encode  : true,
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
        dataType  : 'json',
        encode  : true,
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
                dataType  : 'json',
                encode  : true,
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
        dataType  : 'json',
        encode  : true,
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
      })
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


ReAssignButton.addEventListener("click", ()=>{

    getAllInstructionAndTaskInSelectedShift(activeGuardScheduleAll)
})


function getAllInstructionAndTaskInSelectedShift(shift){

   // console.log(shift)
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneAgendaPerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
            guard_id:shift[0].guard_id,
            job_id,
            type:"INSTRUCTION"  
          },
        success: function (data) {
            filterInstructionToMatchShift(data.data,shift)

        },
        error: function (request, status, error) {
    
            analyzeError(request)
         
        }
    });
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/allJobs/oneAgendaPerGuard`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            guard_id:shift[0].guard_id,
            job_id,
            type:"TASK"
          },
        success: function (data) {        
            
            filterTaskToMatchShift(data.data,shift)

        },
        error: function (request, status, error) {
            analyzeError(request)
        }
    });


}


function filterInstructionToMatchShift(instruction,shift){
        

    let cleanInstruction=[]
    if(instruction.length!=0){
        for (let i = 0; i < instruction.length; i++) {
               
            for (let k = 0; k < shift.length; k++) {

                let onlyDate=moment(instruction[i].operation_date).format('YYYY-MM-DD');

                    if(moment(onlyDate).isBetween(shift[k].check_in_date,shift[k].check_out_date, null, '[]')){
                        cleanInstruction.push(instruction[i])
                        break;
                    }
            }
            if(i==instruction.length-1){
                activeGuardInstruction=cleanInstruction
                if(cleanInstruction!=0){
                    formatInstructionForReschedule(activeGuardInstruction)

                }
            }
        }
    }else{
        activeGuardInstruction=[]
    }
   
    
       
}

function filterTaskToMatchShift(task,shift){


    let cleanTask=[]
    if(task.length!=0){
        for (let i = 0; i < task.length; i++) {
               
            for (let k = 0; k < shift.length; k++) {

                let onlyDate=moment(task[i].operation_date).format('YYYY-MM-DD');

                    if(moment(onlyDate).isBetween(shift[k].check_in_date,shift[k].check_out_date, null, '[]')){
                        cleanTask.push(task[i])
                        break;
                    }
            }
            if(i==task.length-1){
                activeGuardTask=cleanTask
                if(cleanTask!=0){
                    formatTaskForReschedule(activeGuardTask)

                }
            }
        }
    }else{
        cleanTask=[]
    }
   
}


function formatTaskForReschedule(){
    

    let formatTask=[]

    for(let i=0;i<activeGuardTask.length;i++){
        formatTask.push({description:activeGuardTask[i].description,
                      title:'None',
                      operation_date:activeGuardTask[i].operation_date,
                      job_id:job_id,
                      agenda_type:"TASK",
                      status_per_staff:"PENDING"
                      })
      
        if(i==activeGuardTask.length-1){
            activeGuardTask=formatTask

        }
    }
}


function formatInstructionForReschedule(){
    

   
    let formatInstruction=[]

    for(let i=0;i<activeGuardInstruction.length;i++){
        formatInstruction.push({description:activeGuardInstruction[i].description,
                      title:activeGuardInstruction[i].title,
                      operation_date:activeGuardInstruction[i].operation_date,
                      job_id:job_id,
                      agenda_type:"INSTRUCTION",
                      status_per_staff:"PENDING"
                      })
      
        if(i==activeGuardInstruction.length-1){
            activeGuardInstruction=formatInstruction


        }
    }
}


function formatDateForReschedule(schedule){

    let mySchedule =[]
    if(schedule.length!==0){
        for (let i = 0; i < schedule.length; i++) {

            mySchedule.push({check_in_date:moment(new Date(schedule[i].check_in_date+' '+schedule[i].start_time)).format("YYYY-MM-DD hh:mm:ss a"),
            check_out_date:moment(new Date(schedule[i].check_out_date+' '+schedule[i].end_time )).format("YYYY-MM-DD hh:mm:ss a"),
            start_time:moment(new Date(schedule[i].check_in_date+' '+schedule[i].start_time)).format("hh:mm:ss a"),
            end_time:moment(new Date(schedule[i].check_out_date+' '+schedule[i].end_time)).format("hh:mm:ss a"),
            status_per_staff:"PENDING",
            job_id:job_id,
            schedule_length:"LIMITED"
          })

          if(i==schedule.length-1){
            activeGuardScheduleAll=mySchedule
          }
        }
    }
  
}

let all_form_for_adding_guard=document.getElementById("all_form_for_adding_guard")

all_form_for_adding_guard.addEventListener("submit",(e)=>{
    e.preventDefault()

    formatDateForReschedule(activeGuardScheduleAll)

    let activeGuardScheduleAllWithGuard=[]

      let guard_id_array = $(".selectpickerReassign option:selected").map(function() {
        return $(this).data("name");
      }).get();

      for(let i=0; i <guard_id_array.length;i++){
 
        for(let j=0; j <activeGuardScheduleAll.length;j++){
        
          let obj={}

          obj["guard_id"]=guard_id_array[i]
          obj["check_in_date"]=activeGuardScheduleAll[j]["check_in_date"]
          obj["check_out_date"]=activeGuardScheduleAll[j]["check_out_date"]
          obj["start_time"]=activeGuardScheduleAll[j]["start_time"]
          obj["end_time"]=activeGuardScheduleAll[j]["end_time"]
          obj["status_per_staff"]=activeGuardScheduleAll[j]["status_per_staff"]
          obj["job_id"]=activeGuardScheduleAll[j]["job_id"]
          obj["schedule_length"]=activeGuardScheduleAll[j]["schedule_length"]
          
          activeGuardScheduleAllWithGuard.push(obj)
        }
        if(i==guard_id_array.length-1){
        
            reAssignJob(activeGuardScheduleAllWithGuard)
        }
      }
})


function addGuardToInstruction(){

    let addGuardToInstructionV=[]
    let guard_id_array = $(".selectpickerReassign option:selected").map(function() {
        return $(this).data("name")
      }).get();

      for(let i=0; i <guard_id_array.length;i++){
 
        for(let j=0; j <activeGuardInstruction.length;j++){
        
          let obj={}

            obj["guard_id"]=guard_id_array[i]
            obj["description"]=activeGuardInstruction[j]["description"]
            obj["title"]=activeGuardInstruction[j]["title"]
            obj["operation_date"]=activeGuardInstruction[j]["operation_date"]
            obj["job_id"]=activeGuardInstruction[j]["job_id"]
            obj["agenda_type"]=activeGuardInstruction[j]["agenda_type"]
            obj["status_per_staff"]=activeGuardInstruction[j]["status_per_staff"]
          
          addGuardToInstructionV.push(obj)
        }
        if(i==guard_id_array.length-1){
            
            activeGuardInstruction=addGuardToInstructionV
            reAssignJobAgendas1(activeGuardInstruction)

        }
      }
}


function addGuardToTask(){

    let addGuardToTaskV=[]
    let guard_id_array = $(".selectpickerReassign option:selected").map(function() {
        return $(this).data("name");
      }).get()

      for(let i=0; i <guard_id_array.length;i++){
 
        for(let j=0; j <activeGuardTask.length;j++){
        
            let obj={}
            obj["guard_id"]=guard_id_array[i]
            obj["description"]=activeGuardTask[j]["description"]
            obj["title"]=activeGuardTask[j]["title"]
            obj["operation_date"]=activeGuardTask[j]["operation_date"]
            obj["job_id"]=activeGuardTask[j]["job_id"]
            obj["agenda_type"]=activeGuardTask[j]["agenda_type"]
            obj["status_per_staff"]=activeGuardTask[j]["status_per_staff"]
          
            addGuardToTaskV.push(obj)
        }
        if(i==guard_id_array.length-1){

            console.log(activeGuardTask)

            
            activeGuardTask=addGuardToTaskV
            reAssignJobAgendas2(activeGuardTask)

        }
      }
}




function reAssignJobAgendas1(obj){

    console.log(activeGuardInstructionStatus)

    if(activeGuardInstructionStatus){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/add_agenda`,
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
              shedule_agenda:JSON.stringify(obj),
            },
            success: function (data) {
                showModal(data.message)
                setTimeout(() => {
                        hideModal()
                }, 3000);
        
            },
            error: function (request, status, error) {
        
              analyzeError(request)      
            }
          })
    }

}

function reAssignJobAgendas2(obj){

    console.log(activeGuardTaskStatus)
    if(activeGuardTaskStatus){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/add_agenda`,
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
              shedule_agenda:JSON.stringify(obj),
            },
            success: function (data) {
                showModal(data.message)
                setTimeout(() => {
                        hideModal()
                }, 3000);
        
            },
            error: function (request, status, error) {
        
              analyzeError(request)      
            }
          })
    }

}


function addSchedule(val){
    activeGuardScheduleAll.push(val)
}

function removeSchedule(val){

    activeGuardScheduleAll= activeGuardScheduleAll.filter((item) => {

        if(item.check_in_date == val.check_in_date  && item.start_time == val.start_time){
            return false
        }
        else{
            return true
        }
      
    })

}


function reAssignJob(schedule){

    $.ajax({
        type: "post", url:`${domain}/api/v1/job/add_shedule_date_staff`,
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
          date_time_staff_shedule:JSON.stringify(schedule),
        },
        success: function (data) {
            
            addGuardToInstruction()
            addGuardToTask()
            showModal(data.message)
            getTableData()
            setTimeout(() => {
                    hideModal()
            }, 3000);
  
        },
        error: function (request, status, error) {
          analyzeError(request)      
        }
      })

    
}




function scheduleIdToAddNoteFunc(id){
    scheduleIdToAddNote=id
}

let  addNoteForm=document.getElementById("addNoteForm")
addNoteForm.addEventListener("submit",(e)=>{
  e.preventDefault()



  let myNote=document.getElementById("myNote").value
  let dateOfReference=document.getElementById("dateOfReference").value
  let timeOfReference=document.getElementById("timeOfReference").value

  
    console.log( myNote , dateOfReference, timeOfReference, scheduleIdToAddNote)


})


let checkboxInstruction = document.getElementById("defaultCheck1");
let checkboxTask = document.getElementById("defaultCheck2");

checkboxInstruction.addEventListener('change', function() {
    
    if (this.checked) {
        activeGuardInstructionStatus=true
    } else {
        activeGuardInstructionStatus=false
    }
     
})

checkboxTask.addEventListener('change', function() {
    
    if (this.checked) {
        activeGuardTaskStatus=true
    } else {
        activeGuardTaskStatus=false
    }
})