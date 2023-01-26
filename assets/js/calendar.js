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



$(document).ready(function(){

        


})
