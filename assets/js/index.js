//DASH BOARD
$.ajax({
    type: "get", url:`${domain}/api/v1/job/getDashBoardInfo`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
    success: function (data) {

      displayDashboardInfo(data.data)
 
    },
    error: function (request, status, error) {

      console.log(request)
       analyzeError(request)

    }
  });


function displayDashboardInfo(obj){

    console.log(obj)
    $("#customerNo").text(obj.noCustomer)
    $("#staffNo").text(obj.noStaff)
    $("#guardNo").text(obj.noGuard)
    $("#activeJobOn").text(obj.noActive)
}







$(document).ready(function() {
   

    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/allJobs/generalshiftStarted`,
            method: "get",
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          columnDefs: [
            { "width": "200px", "targets": [5,6] },   
            {
              render: function (data, type, full, meta) {
                  return "<div class='text-wrap width-200'>" + data + "</div>";
              },
              targets: 15
            }, 
            {
              render: function (data, type, full, meta) {
                  return "<div class='text-wrap' style='min-width: 200px'>" + data + "</div>";
              },
              targets: 8
            } 
            , 
            {
              render: function (data, type, full, meta) {
                  return "<div class='text-wrap' style='min-width: 200px;'>" + data + "</div>";
              },
              targets: 9
            }         
          ] ,
          },
          columns:[
            { data: "name" },
            { data: "customer" },
            { data: "site" },
            { data: "start_date" },
            { data: "start_time" },
            { data: "end_date" },
            { data: "end_time" },
            { data: "hours"},
            { data: "check_in" },
            { data: "check_out"},
            { data: "guard_charge"},
            { data: "client_charge" },
            { data: "hours_worked" },
            { data: "earned"},
            { data: "job_status" },
            { data: "description" },
            { data: "settlement_status" },
            ],
            responsive: true,
            paging:   true,
            order:[[ 3, 'dsc']]
    })
  

    setTimeout(() => {

        var column1 = table.column(16);
        column1.visible(!column1.visible());
        var column2 = table.column(14);
        column2.visible(!column2.visible());
        var column3 = table.column(15);
        column3.visible(!column3.visible());
            /*
        var column1 = table.column(0);
        column1.visible(!column1.visible());
        var column2 = table.column(2);
        column2.visible(!column2.visible());
        var column3 = table.column(3);
        column2.visible(!column3.visible());
        */
        }, 1000);

 
    
});
