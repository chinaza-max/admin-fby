
/*FOR ADDING SIDE BAR IT STARTS HERE */
function openNav() {
  document.getElementById("mySidenav").style.width = "380px";
  document.getElementById("main").style.marginRight = "380px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}
/*ENDS HERE */



// Drag tasks around
/*
 $j (".drag").draggable({
  revert: "invalid",
  start: function (e, ui) {
    // Date from where task was dragged from
     $j (this).data("oldDate",  $j (this).parent().data("date"));
  }
});
*/

// Select drop area for Tasks (only droppable on TD which have "data-date" attribute)
 $j ("td[data-date]").droppable({
  drop: function (e, ui) {
    var drag = ui.draggable,
      drop =  $j (this),
      oldDate = drag.data("oldDate"), // Task date on drag
      newDate = drop.data("date"), // Task date on drop
      dragID = drag.data("userid"), // Task userid on drag
      dropID = drop.data("userid"); // Task userid on drop
    if (oldDate != newDate || dragID != dropID) {
      return  $j (drag).css({ top: 0, left: 0 });
    } else {
      return  $j (drag).css({ top: 0, left: 0 }); // Return task to old position
    }
  }
});

// show EDIT and TRASH tools
 $j (".drag").hover(
  function () {
    var isAdmin = 1; // Ability to hide or show edit and delete options
    if (isAdmin == 1) {
       $j (this)
        .css("z-index", "999")
        .prepend(
          `<div class="opt-tools"><div class="opt-edit">
          <div class="icon icofont-paper"></div>
          </div>
          <div class="opt-trash">
            <i class="fas fa-trash"></i>
          </div></div>`
        );
    }
  },
  function () {
    //When mouse hovers out DIV remove tools
     $j (this).css("z-index", "0").find(".opt-tools").remove();
  }
)

// Show modal to edit task
 $j (document).on("click", ".opt-edit", function () {


  var taskid =  $j (this).parent().parent().data("taskid"),
    userid =  $j (this).parent().parent().data("userid");

    let allDetailsOfAParticularGuard=taskid

    $("#dateCreated").text(moment(shiftDetailsObj[userid].created_at).format("MM-DD-YYYY hh:mm a"))
    $("#jobDes").text(shiftDetailsObj[userid].description)
    $("#jobA").text(shiftDetailsObj[userid].client_charge)
    $("#hourlyP").text(shiftDetailsObj[userid].staff_charge)
    $("#customer").text(shiftDetailsObj[userid].customer.company_name)
    $("#site").text(shiftDetailsObj[userid].facility.name)
    $("#avatar2").attr("src",shiftDetailsObj[userid].image);

    let data=`<a onclick="updateSearchGuard('${allDetailsOfAParticularGuard.name}');storeCurrentJobID(${shiftDetailsObj[userid].id})" href="guard-in-job.html" class="btn btn-info rounded-500">Job logs</a>
    `
    $('#modalButton').children().remove();
    $("#modalButton").append(data)

    job_id_for_schedule=shiftDetailsObj[userid].id
    

   
    old_guard_id=allDetailsOfAParticularGuard.user_id
  

    let data2=''

    if(shiftDetailsObj[userid].canReasign){
      data2=` 
      <h5 class="mb-0 mt-0 me-1">RE-ASSIGN </h5>
      <button      id="ReAssignButton"
       class="btn btn-dark btn-sm btn-square rounded-pill"
       onclick="getAvailableGuard2('selectpickerReassignId','selectpickerReassign');displaymodalForGuardSelection()" >
        <div class="icon sli-share-alt " style="font-size: 15px;"></div>
      </button>
      `
    }
    else{
     data2=` 
      <h5 class="mb-0 mt-0 me-1">RE-ASSIGN </h5>
      <button      id="ReAssignButton"
       class="btn btn-dark btn-sm btn-square rounded-pill"
       onclick="getAvailableGuard2('selectpickerReassignId','selectpickerReassign');displaymodalForGuardSelection()" disabled >
        <div class="icon sli-share-alt " style="font-size: 15px;"></div>
      </button>
      `
    }

    $('#reassignContainer').children().remove();
    $("#reassignContainer").append(data2)



  // Get DATE
  var date =  $j (this).closest("td").data("date");
  // insert data to Modal
  /*
   $j ("#ktxt")[0].jscolor.fromString("FFFFFF");
   $j ("#kbg")[0].jscolor.fromString("8E8E8E");
   $j ("#demotaak2").css("color", "#FFFFFF");
   $j ("#demotaak1").css("border-left-color", "#8E8E8E");
   $j ("#demotaak2").css("background-color", "#8E8E8E");
   */
   $j ("#edittask").modal("show");
});

// Modal remove task ?
 $j (document).on("click", ".opt-trash", function () {
 
 
 /* var taskid =  $j (this).parent().parent().data("taskid");

   $j ("#taskdelid").val(taskid);
   $j ("#modal-delete").html(
    "Are you sure you want to delete task ID <b>" + taskid + "</b>?"
  );
   $j ("#deletetask").modal("show");
   */

   Swal.fire({
    icon: 'info',
    title: 'Oops...',
    text: 'operation not available',
  })

});

// Remove task after conformation
 $j (document).on("click", "#confdelete", function () {
  var taskid =  $j ("#taskdelid").val();
   $j ("div")
    .find("[data-taskid=" + taskid + "]")
    .remove();
   $j ("#deletetask").modal("hide");
});

function changeColor(id, c) {
  if (id == "ctxt") {
     $j ("#demotaak2").css("color", "#" + c);
  } else if (id == "cbg") {
     $j ("#demotaak1").css("border-left-color", "#" + c);
     $j ("#demotaak2").css("background-color", "#" + c);
  }
  return false;
}


let getCalendar
let displayHeader=[]
let displayHeaderWithDate=[]
let year=''
let shiftDetailsObj={}
let limit=10
let offset=0
let continueNext=true
let job_id_for_schedule;
let old_guard_id;



let customer_id='',
     site_id='',
     guard_id='',
     from_date='';

$(document).ready(function(){

  let myButtonCopy=document.getElementById("copyContainer")
  myButtonCopy.addEventListener("click", function() {
    
  
    document.getElementById("copyText").innerHTML="copied"
    setTimeout(() => {
      document.getElementById("copyText").innerHTML="copy"
    }, 3000);
  
  });




//?customer_id=${customer_id}&guard_id=${guard_id}&site_id=${site_id}&from_date=${from_date}&to_date=${to_date}
  $('#loader1').css("display","block");

  getCalendar=function(customer_id , guard_id , site_id , from_date,limit,offset){
  
    $.ajax({
      type: "get", url:`${domain}/api/v1/job/calender?customer_id=${customer_id}&guard_id=${guard_id}&site_id=${site_id}&from_date=${from_date}&limit=${limit}&offset=${offset}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
      success: function (data) {
        $('#loader1').css("display","none");
        displayCalendar(data.data)

      },
      error: function (request, status, error) {
        $('#loader1').css("display","none");
        analyzeError(request)
      }
    });
  } 

  //console.log(customer_id, guard_id, site_id, from_date,limit,offset)
  getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)

  minDate = new DateTime($('#min'),{
    format: 'YYYY-MM-DD'
  })

  $.ajax({
    type: "get", url:`${domain}/api/v1/customer`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
  
    success: function (data) {
        displayCustomer(data.data)
    },
    error: function (request, status, error) {
        analyzeError(request)
    }
  });


  function displayCustomer(val){
    let data=`<option value="">All customer</option>`
  
    for(let i=0; i<val.length; i++){
            data+= `
            <option value="${val[i].id}"> ${val[i].company_name} </option>
          `
        if(i==val.length-1){
  
            $('#customerName').children().remove();
            $("#customerName").append(data)
            $('.selectpickerCustomer').selectpicker('refresh')
  
        }
    }
    if(val.length==0){
      $('#customerName').children().remove();
      $("#customerName").append(data)
      $('.selectpickerCustomer').selectpicker('refresh')
    }
  }

  //GET SITE AND DISPLAY
  $.ajax({
    type: "get", url:`${domain}/api/v1/job/getAllSite`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },

    success: function (data) {
        displayGetAllSite(data.data)
    },
    error: function (request, status, error) {

      analyzeError(request)
    }
  })
  function displayGetAllSite(val){
    let data=`<option value="">All site</option>`

    for(let i=0; i<val.length; i++){
            data+= `
            <option  data-subtext="${val[i].customer_name}" value="${val[i].site_id}"> ${val[i].name} </option>
          `
        if(i==val.length-1){

            $('#Site').children().remove();
            $("#Site").append(data)
            $('.selectpickerSite').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $('#Site').children().remove();
      $("#Site").append(data)
      $('.selectpickerSite').selectpicker('refresh')
    }
  }

  $.ajax({

    type: "get", url:`${domain}/api/v1/job/getAllGuard`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },

    success: function (data) {

        displayGetAllGuard(data.data)
    },
    error: function (request, status, error) {

        analyzeError(request)
    
    }
  })

  function displayGetAllGuard(val){
    let data=`<option value="">All guard</option>`

    for(let i=0; i<val.length; i++){
            data+= `
            <option data-subtext="${val[i].suspension_status}" value="${val[i].guard}"> ${val[i].name} </option>
          `
        if(i==val.length-1){

            $('#staffName').children().remove();
            $("#staffName").append(data)
            $('.selectpickerStaffName').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $('#staffName').children().remove();
      $("#staffName").append(data)
      $('.selectpickerStaffName').selectpicker('refresh')
    }
  }

})


function displaymodalForGuardSelection(){
  $j ("#add-guard2").modal("show");

}

function displayCalendar(val){



  
  if(from_date==''){
    displayHeader=[]
    displayHeaderWithDate=[]


    let currentDate = new Date(new Date().toLocaleString('en', {timeZone: val.my_time_zone}))
    let currentDay = currentDate.getDay();
  
    let startOfWeek = new Date(currentDate.getTime() - currentDay * 24 * 60 * 60 * 1000);
    let endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
  
    let startDate = new Date(moment(startOfWeek).format("YYYY-MM-DD"));
    let endDate = new Date(moment(endOfWeek).format("YYYY-MM-DD"));
    let currentDate2 = startDate;

    if(moment(startOfWeek).format("YYYY")==moment(startOfWeek).format("YYYY")){
      year=moment(startOfWeek).format("YYYY")
    }
    else{
      year=moment(startOfWeek).format("YYYY") +"-"+moment(endOfWeek).format("YYYY")
    }
  
    while (currentDate2 <= endDate) {
      let reArrange=moment(currentDate2).format("ddd")+" "+moment(currentDate2).format("MMM")+" "+moment(currentDate2).format("DD")
      displayHeader.push(reArrange)
      displayHeaderWithDate.push(moment(currentDate2).format("YYYY-MM-DD"))
      currentDate2 = new Date(currentDate2.getTime() + 24 * 60 * 60 * 1000);
    }
  }
  else{
     displayHeader=[]
     displayHeaderWithDate=[]
    let oneWeekLater = new Date(moment(from_date).add(6, 'days'))

    let startDate =new Date(moment(from_date).format("YYYY-MM-DD")); 
    let endDate = new Date(moment(oneWeekLater).format("YYYY-MM-DD"));

    if(moment(startDate).format("YYYY")==moment(endDate).format("YYYY")){
      year=moment(startDate).format("YYYY")
    }
    else{
      year=moment(startDate).format("YYYY") +"-"+moment(endDate).format("YYYY")
    }

    while (startDate <= endDate) {
      let reArrange=moment(startDate).format("ddd")+" "+moment(startDate).format("MMM")+" "+moment(startDate).format("DD")
      displayHeader.push(reArrange)
      displayHeaderWithDate.push(moment(startDate).format("YYYY-MM-DD"))
      startDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  displayHeadOfCalendar(year ,displayHeader)
  displayBodyOfCalendar(val)

}

function  displayHeadOfCalendar(year ,displayHeader){

  let data=`<th class="cal-viewmonth" id="changemonth">  <h6 style="font-size:11px;">weekly shift ${year}</h6></th>
  `
  for(let i=0;i<displayHeader.length;i++){

    data+=`
          <th class="cal-toprow">${displayHeader[i]}</th>
    `
    if(i==displayHeader.length-1){

      //$('#calendarHead').children().remove();
      $('#calendarHead').empty();
      $('#calendarHead').append(data)
     
    }
}
}






function displayBodyOfCalendar(val){

    console.log(val)
    let allGuard=val.obj
   //let allGuard=val


  if(allGuard.length!=0){
    continueNext=true
  shiftDetails(allGuard)
 
  let data=[`<tr id="h16">
          <td class="cal-usersheader" style="color:#000; background-color:#389fe8; padding: 0px;">Guards</td>
          <td colspan="31" style="color:#FFFFFF; background-color:#389fe8;"></td>
          </tr>`]

    for (let index = 0; index < allGuard.length; index++) {

      let allShift = allGuard[index].data;
      let data2='';
      let data2MoreDetail='';
      let pointer=0

      if(allShift.length!=0){
        for (let i = 0; i < allShift.length; i++) {
          let singleShift = allShift[i];


          for (pointer; pointer < displayHeaderWithDate.length; pointer++) {
            
              let Headers = displayHeaderWithDate[pointer]



              if(moment(Headers).isBetween(singleShift.start_date, singleShift.end_date, null, '[]')){
                  
                const maxLength = 15;
                const truncatedText = singleShift.job.description.length > maxLength 
                  ? singleShift.job.description.substring(0, maxLength) + "..." 
                  : singleShift.job.description;

                if(singleShift.Shift_comments.length!=0){

                  let comment=''
                  for (let m = 0; m < singleShift.Shift_comments.length; m++) {
                    comment+=` <div class='comment mt-4 text-justify float-left'>
                    <h6>Created by:  ${singleShift.Shift_comments[m].Admin_details.first_name} ${singleShift.Shift_comments[m].Admin_details.last_name}</h6>
                    <span>Created at: ${moment(singleShift.Shift_comments[m].created_at).format("YYYY-MM-DD hh:mm:ss a")}</span>
                    <br>
                    <p>${singleShift.Shift_comments[m].comment}</p>
                    </div>`
                  }


                  if(singleShift.status=="STARTED"){
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(81, 255, 0); position: relative;">
                      <h3 class="details-task" style=" background: #51FF00; color: #000000"  onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id} )" >${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div>
                                  <a class="gear"  href="#" data-bs-toggle="popover" title="Comment" data-bs-content="${comment}">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                      </svg>
                                    </a>
      
                              </div>
                              <div class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `     
                  }
                  else if(singleShift.status=="NOT_STARTED"){
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(36, 115, 171); position: relative;">
                      <h3 class="details-task" style=" background: #2473AB; color: #FFFFFF" onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id} )">${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div>
                                  <a class="gear"  href="#" data-bs-toggle="popover" title="Comment" data-bs-content="${comment}">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                      </svg>
                                    </a>
      
                              </div>
                              <div class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `     
                  }
                  else{
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(126, 126, 126); position: relative;">
                      <h3 class="details-task" style=" background: #7E7E7E; color: #FFFFFF" onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id})">${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div>
                                  <a class="gear"  href="#" data-bs-toggle="popover" title="Comment" data-bs-content="${comment}">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                      </svg>
                                    </a>
      
                              </div>
                              <div class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `     
                  }
                  
                  
                }
                else{



                  if(singleShift.status=="STARTED"){
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(81, 255, 0); position: relative;">
                      <h3 class="details-task" style=" background: #51FF00; color: #000000" onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id})">${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div  class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `
                  }
                  else if(singleShift.status=="NOT_STARTED"){
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(36, 115, 171); position: relative;">
                      <h3 class="details-task" style=" background: #2473AB; color: #FFFFFF" onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id})">${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div  class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `
                  }
                  else{
                    data2+=`
                    <td class="ui-droppable" data-date="${singleShift.start_date}" data-userid="ID${singleShift.id}">
                    <div class="drag details ui-draggable ui-draggable-handle" data-taskid='${JSON.stringify(allGuard[index])}' data-userid="ID${singleShift.id}" style="border-left: 5px solid rgb(126, 126, 126); position: relative;">
                      <h3 class="details-task" style=" background: #7E7E7E; color: #FFFFFF" onclick="viewDetails(${allGuard[index].user_id},${singleShift.job_id})">${truncatedText}</h3>
                      <div class="details-uren">
                      
                        <div class="d-flex justify-content-between">
                              <div  class="time-font-size">  
                              ${singleShift.start_time} -  ${singleShift.end_time} 
                              </div>
                        </div>
      
                      </div>
                    </div>
                  </td>
                    `
                  }
            
                }
              }
              else{


                if(i==allShift.length-1){ 
                  data2+=`
                  <td class="ui-droppable" data-date="1/7/2020" data-userid="2"></td>
                  ` 
                }
                
              }


              if(moment(Headers).isSame(singleShift.end_date)&&(i!=allShift.length-1)){   
                //this pointer here makes it easy to start from the next item instead of repeating thesame item
                pointer++ 
                break 
              }

          }

          if(i==allShift.length-1){

            data2MoreDetail=` <tr id="u1">
            <td class="cal-userinfo" style="height: 100px;">
            <span class="float-right-top"><b style="text-decoration: underline" class="float-start">${allGuard[index].name}  ID:(${allGuard[index].user_id})<span></span></span>
            <div class="cal-usercounter">
              <span class="cal-userbadge badge badge-light w-100">Job-Summary</span>

              <div class="cal-userbadge  badge-warning">
                Assigned : <span class="text-muted"> ${allGuard[index].hours_assigned}hrs</span>
              </div>
              <div class="cal-userbadge  badge-warning">
                Worked : <span class="text-muted">  ${allGuard[index].hours_worked}hrs</span>
              </div>

            </div>
            <div class="cal-userarrows">
              <i class="up mdi mdi-arrow-up-bold"></i><i class="down mdi mdi-arrow-down-bold"></i>
            </div>
          </td>       
            ${data2}           
            </tr>
            `
            data.push(data2MoreDetail)   

          }
        }
      }
      else{
            for (let k = 0; k < displayHeaderWithDate.length; k++) {
              
              data2+=`
                <td class="ui-droppable" data-date="1/7/2020" data-userid="2"></td>
                ` 
              if(k==displayHeaderWithDate.length-1){
            
                data2MoreDetail=` <tr id="u1">
                <td class="cal-userinfo" style="height: 100px;">
                <span class="float-right-top"><b style="text-decoration: underline" class="float-start">${allGuard[index].name}  ID:(${allGuard[index].user_id})<span></span></span>
                <div class="cal-usercounter">
                  <span class="cal-userbadge badge badge-light w-100">Job-Summary</span>

                  <div class="cal-userbadge  badge-warning">
                    Assigned : <span class="text-muted"> ${allGuard[index].hours_assigned}hrs</span>
                  </div>
                  <div class="cal-userbadge  badge-warning">
                    Worked : <span class="text-muted">  ${allGuard[index].hours_worked}hrs</span>
                  </div>

                </div>
                <div class="cal-userarrows">
                  <i class="up mdi mdi-arrow-up-bold"></i><i class="down mdi mdi-arrow-down-bold"></i>
                </div>
              </td>       
                ${data2}           
                </tr>
                `
                data.push(data2MoreDetail)

              }
            }
      }
      
        if(index==allGuard.length-1){
              
          setTimeout(() => {
              // show EDIT and TRASH tools
              $j (".drag").hover(
                function () {
                  var isAdmin = 1; // Ability to hide or show edit and delete options
                  if (isAdmin == 1) {
                    $j (this)
                      .css("z-index", "999")
                      .prepend(
                        `<div class="opt-tools"><div class="opt-edit">
                        <div class="icon icofont-paper"></div>
                        </div>
                        <div class="opt-trash">
                          <i class="fas fa-trash"></i>
                        </div></div>`
                      );
                  }
                },
                function () {
                  //When mouse hovers out DIV remove tools
                  $j (this).css("z-index", "0").find(".opt-tools").remove();
                }
              );
              
              $('.gear').popover({
                content:"click me",
                trigger:"click",
                html: true
              })
              
      
          }, 20);

          $('#calendarBody').children().remove();
          $("#calendarBody").append(data)

        }
    }
  }
  else{

    continueNext=false
    let data=[`<tr id="h16">
    <td class="cal-usersheader" style="color:#000; background-color:#389fe8; padding: 0px;">Guards</td>
    <td colspan="31" style="color:#FFFFFF; background-color:#389fe8;"></td>
    </tr>`]

    let data2=''

    for (let index = 0; index < displayHeaderWithDate.length; index++) {
      data2+=`
      <td class="ui-droppable" data-date="1/7/2020" data-userid="2" style="text-align: center">   NO SHIFT </td>
      ` 
      if(index==displayHeaderWithDate.length-1){

        let data2MoreDetail=` <tr id="u1">
        <td class="cal-userinfo" style="height: 100px;">
        <span class="float-right-top"><b style="text-decoration: underline" class="float-start">NO GUARD<span></span></span>
        <div class="cal-usercounter">
          <span class="cal-userbadge badge badge-light w-100">Job-Summary</span>

          

        </div>
        <div class="cal-userarrows">
          <i class="up mdi mdi-arrow-up-bold"></i><i class="down mdi mdi-arrow-down-bold"></i>
        </div>
      </td>       
        ${data2}           
        </tr>
        `
        data.push(data2MoreDetail)

        $('#calendarBody').children().remove();
        $("#calendarBody").append(data)

      }
    }
  }

    
}



function shiftDetails(details){

  shiftDetailsObj={}
  for (let index = 0; index < details.length; index++) {
    let shiftData= details[index].data;
    let image= details[index].image;
    

    for (let index2 = 0; index2 < shiftData.length; index2++) {

      $.ajax({
        type: "get", url:`${domain}/api/v1/job/check_if_job_can_be_re_assigned?job_id=${shiftData[index2].job.id}`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
     
        success: function (data) {  
          let canReasign=data.data

          const number = shiftData[index2].id;
          shiftDetailsObj["ID"+number]={...shiftData[index2].job,image,canReasign}
  
        },
        error: function (request, status, error) {
    
            analyzeError(request)
          
        }
      });
    }
  }

}

$('#customerName').on('change', function (e) {
  customer_id=this.value

  getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)
})

$('#Site').on('change', function () {
  site_id=this.value
  getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)

})

$('#staffName').on('change', function () {
  guard_id=this.value
  getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)

})

$('#min').on('change', function () {
  from_date=this.value

  //from_date="2023-01-25"

  if(from_date==""){
    from_date=''
    getCalendar(customer_id, guard_id, site_id,from_date,limit,offset)

  }else{

    from_date=this.value
    getCalendar(customer_id, guard_id, site_id, new Date(from_date),limit,offset)

  }
})


function previous(){
  if(offset==0){
    $("#Previous").addClass("disabled");
}
else{
    $("#Previous").removeClass("disabled");
    offset=offset-(limit)
    console.log(offset)
    console.log(limit)
    getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)
    $(".page-item").removeClass("active");
    $("#Previous").addClass("active");
}
}
function next(){
  offset=offset+limit

 
  if(continueNext){
    console.log(offset)
    console.log(limit)
  
    getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)
    $(".page-item").removeClass("active");
    $("#Next").addClass("active");
  }

}


document.getElementById("reassignForm").addEventListener("submit",(e)=>{
  e.preventDefault()
  
  let guard_id_array = $(".selectpickerReassign option:selected").map(function() {
    return $(this).data("name");
  }).get()



  $.ajax({
    type: "post", url:`${domain}/api/v1/job/reasign_schedule_and_remove_guard`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
    data: {
        old_guard_id,
        job_id:job_id_for_schedule,
        array_guard_id:JSON.stringify(guard_id_array)  
      },
    success: function (data) {
      
      showModal(data.message)
      limit=10
      offset=0

      getCalendar(customer_id, guard_id, site_id, from_date,limit,offset)

    },
    error: function (request, status, error) {
        analyzeError(request)
     
    }
  })

})

 //START GET fREE GUARD 

 function getAvailableGuard2(modalId,picker){
  
  $.ajax({
    type: "post", url:`${domain}/api/v1/job/get_free_Guard`,
    dataType  : 'json',
    encode  : true,
    headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    data: {
      job_id:job_id_for_schedule,
    },
    success: function (data) {
          console.log(data)
          displayGuard(data.data, modalId,picker)
          
        setTimeout(() => {
                hideModal()
        }, 3000);

    },
    error: function (request, status, error) {

        analyzeError(request)
     
    }
  });

}
//START GET AVAILABLE GUARD 

function displayGuard(val, modalId,picker){

  let data=''
    for(let i=0;i<val.length;i++){

        data+=`
        <option    data-subtext="${val[i].guard_id}" data-name=${val[i].guard_id}>${val[i].full_name}</option>
        `
        if(i==val.length-1){

          $(`#${modalId}`).children().remove();
          $(`#${modalId}`).append(data)
          $('.selectpicker').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $(`#${modalId}`).children().remove();
      $(`.${picker}`).selectpicker('refresh')

    }
}



function viewDetails(guard_id, job_id){
  openNav()

  $('#loader2').css("display","block");

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
    success: function (data) {

      $('#loader1').css("display","none");

      displayLog(data.data)

    },
    error: function (request, status, error) {

        $('#loader1').css("display","none");
        analyzeError(request)
      
    }
  });



  console.log(job_id)
  console.log(guard_id)

  $.ajax({
    type: "get", url:`${domain}/api/v1/job/get_single_job_with_agenda?job_id=${job_id}&guard_id=${guard_id}`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
    success: function (data) {

      console.log(data.data)

    },
    error: function (request, status, error) {

     // $('#loader1').css("display","none");
      analyzeError(request)
      
    }
  });

}



function displayLog(val){
  let data=''


  //moment(startDate).format("ddd")
  for(let i=0; i<val.length; i++){

      if(val[i].location_message=="In location"){
       
           if(val[i].check_out_date=="None"){

            data+=`
            <div class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">Check in</strong>
              <small>
              ${moment(new Date(val[i].check_in_date)).format("ddd")}
              </small>
            </div>
            <div class="col-10 mb-1 small">

              <table class="table table-striped">
                <tbody>
              
                  <tr>
                    <td>Check in </td>
                    <td>${val[i].check_in_date} ${val[i].check_in_time}</td>
                  </tr>
                 
                
                </tbody>
              </table>

            </div>
            <a href="#" style="width:fit-content;" 
            onclick="initMap(${val[i].lat},${val[i].log},${val[i].site_lat},${val[i].site_log},${val[i].radius})"
            data-bs-toggle="modal"
            data-bs-target="#view_location">
              <div class="icon icofont-street-view"></div>
            </a>
          </div>`

           }
           else{
                  data+=`
                  <div class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
                  <div class="d-flex w-100 align-items-center justify-content-between">
                    <strong class="mb-1">Check out</strong>
                    <small>
                      ${moment(new Date(val[i].check_out_date)).format("ddd")}
                    </small>
                  </div>
                  <div class="col-10 mb-1 small">

                    <table class="table table-striped">
                      <tbody>
                    
                        <tr>
                          <td>Check in </td>
                          <td>${val[i].check_in_date} ${val[i].check_in_time}</td>
                        </tr>
                        <tr>
                          <td>Check out </td>
                          <td>${val[i].check_out_date} ${val[i].check_out_time}</td>
                        </tr>
                      
                      </tbody>
                    </table>

                  </div>
                  <a href="#" style="width:fit-content;" 
                  onclick="initMap(${val[i].lat},${val[i].log},${val[i].site_lat},${val[i].site_log},${val[i].radius})"  data-bs-toggle="modal"
                  data-bs-target="#view_location">
                    <div class="icon icofont-street-view"></div>
                  </a>
                </div>`
           }
       

           
      }
      else{


        if(val[i].action_name==''&&val[i].action_name=="check_out"){


          data+=` <div class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Check out</strong>
            <small>
                ${ moment(new Date(val[i].check_out_date)).format("ddd")}
            </small>
          </div>
          <div class="col-10 mb-1 small alert-danger">

            Security guard tries to check out at the wrong location.
              <table class="table table-striped">
                <tbody>
              
                  <tr>
                    <td>Check out </td>
                    <td>${val[i].check_out_date}  ${val[i].check_out_time}</td>
                  </tr>
        
                </tbody>
              </table>
            
            </div>
          <a href="#" style="width:fit-content;" onclick="initMap(${val[i].lat},${val[i].log},${val[i].site_lat},${val[i].site_log},${val[i].radius})"    data-bs-toggle="modal"
          data-bs-target="#view_location">
            <span class="icon icofont-street-view"></span>
          </a>
        </div>`
        }
        else{

          data+=` <div class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Check in</strong>
            <small>
                ${moment(new Date(val[i].check_in_date)).format("ddd")}
            </small>
          </div>
          <div class="col-10 mb-1 small alert-danger">

            Security guard tries to check in at the wrong location.
              <table class="table table-striped">
                <tbody>
              
                  <tr>
                    <td>Check in </td>
                    <td>${val[i].check_in_date}  ${val[i].check_in_time}</td>
                  </tr>
        
                </tbody>
              </table>
            
            </div>
          <a href="#" style="width:fit-content;"  data-bs-toggle="modal"
          data-bs-target="#view_location"  onclick="initMap(${val[i].lat},${val[i].log},${val[i].site_lat},${val[i].site_log},${val[i].radius})">
            <span class="icon icofont-street-view"></span>
          </a>
        </div>`

        }

      }


      if(i==val.length-1){

          $('#jobLogs').children().remove();
          $("#jobLogs").append(data)
      }
  }
  if(val.length==0){
      $('#jobLogs').children().remove();
      $("#jobLogs").append(`
          <div class="alert alert-light outline text-dark w-100" role="alert" style="text-align:center;">
          YOU HAVE NO LOGS  
      </div>
        `)
  }

}



function initMap(lat=0,lon=0,site_lat=0,site_lon=0,rad=0) {
  var guardLocation = {lat:lat, lng:lon};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 19,
    mapTypeId: "satellite",
    center: guardLocation
  });
  
  var guardImage = 'assets/content/for_google_map3.png';

  var marker = new google.maps.Marker({
    position: guardLocation,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: guardImage
  });

  var siteLocation = {lat:site_lat, lng: site_lon};
  var line = new google.maps.Polyline({
    path: [guardLocation, siteLocation],
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  line.setMap(map);

  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: siteLocation,
    radius: rad
  });
}
