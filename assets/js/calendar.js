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
);

// Show modal to edit task
 $j (document).on("click", ".opt-edit", function () {
  // Get task ID and DATE from DATA attribute
  var taskid =  $j (this).parent().parent().data("taskid"),
    userid =  $j (this).parent().parent().data("userid");
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
  var taskid =  $j (this).parent().parent().data("taskid");

   $j ("#taskdelid").val(taskid);
   $j ("#modal-delete").html(
    "Are you sure you want to delete task ID <b>" + taskid + "</b>?"
  );
   $j ("#deletetask").modal("show");
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

$(document).ready(function(){



//?customer_id=${customer_id}&guard_id=${guard_id}&site_id=${site_id}&from_date=${from_date}&to_date=${to_date}
  getCalendar=function(customer_id, guard_id, site_id, from_date, to_date){
    $.ajax({
      type: "get", url:`${domain}/api/v1/job/calender`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
      success: function (data) {
  

        displayCalendar(data.data)
        
      },
      error: function (request, status, error) {
          analyzeError(request)
       
      }
    });
  } 

  getCalendar()

  minDate = new DateTime($('#min'), {
    format: 'YYYY-MM-DD'
  });
  maxDate = new DateTime($('#max'), {
      format: 'YYYY-MM-DD'
  });



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
    let data=`<option value="null">All customer</option>`
  
    console.log(val)
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
        console.log(data.data)
        displayGetAllSite(data.data)
    },
    error: function (request, status, error) {

        analyzeError(request)
    
    }
  });
  function displayGetAllSite(val){
    let data=`<option value="null">All site</option>`

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
  });

  function displayGetAllGuard(val){
    let data=`<option value="null">All guard</option>`

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

function displayCalendar(val){

  console.log(val)

 ///console.log( new Date().date())
  let currentDate = new Date();
  let currentDay = currentDate.getDay();
  let startOfWeek = new Date(currentDate.getTime() - currentDay * 24 * 60 * 60 * 1000);
  let endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
  console.log("Start of week: " + startOfWeek);

  console.log(moment(startOfWeek).format("YYYY"))
  console.log("End of week: " + endOfWeek)

  let startDate = new Date("2022-01-01");
  let endDate = new Date("2022-01-08");
  let currentDate2 = startDate;
  while (currentDate2 <= endDate) {
    //console.log(currentDate2);

    let reArrange=moment(currentDate2).format("ddd")+" "+moment(currentDate2).format("MMM")+" "+moment(currentDate2).format("DD")
    console.log(moment(currentDate2).format("YYYY-MM-DD"));
    displayHeader.push(reArrange)
    displayHeaderWithDate.push(moment(currentDate2).format("YYYY-MM-DD"))
    currentDate2 = new Date(currentDate2.getTime() + 24 * 60 * 60 * 1000);
  }

}


let customer_id,
     site_id,
     guard_id,
     from_date,
     to_date=null;
$('#customerName').on('change', function (e) {
  customer_id=this.value

  getCalendar(customer_id, guard_id, site_id, from_date, to_date)
})

$('#Site').on('change', function () {
  site_id=this.value
  getCalendar(customer_id, guard_id, site_id, from_date, to_date)

})

$('#staffName').on('change', function () {
  guard_id=this.value
  getCalendar(customer_id, guard_id, site_id, from_date, to_date)

})

$('#min').on('change', function () {
  from_date=this.value

  if(is_date_one_week_from_each_other(from_date,to_date) ==true){
    getCalendar(customer_id, guard_id, site_id, from_date, to_date)
  }
  else{
  
  }

})

$('#max').on('change', function () {
  to_date=this.value

  if(  is_date_one_week_from_each_other(from_date,to_date)==true){
    getCalendar(customer_id, guard_id, site_id, from_date, to_date)
  }
  else{

  }


})


function is_date_one_week_from_each_other(from_date,to_date){

  let date1 = new Date(from_date);
  let date2 = new Date(to_date);
  
  let oneWeek = 6 * 24 * 60 * 60 * 1000;
  
  if (Math.abs(date1 - date2) == oneWeek  ) {
    Swal.close()

    return true
  } else {

    if((from_date==null&&to_date==null)||(to_date==null)||from_date==null){
        return "dont_filter"
    }
    else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Date must be one week apart',
        footer: "Check date range"
      })

    }
  
  }
}