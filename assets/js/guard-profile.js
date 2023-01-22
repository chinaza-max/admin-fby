
 
$(document).ready(function() {
  

    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/allJobs/shiftPerGuardAllJob`,
            method: "post",
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            guard_id:29,
          },
          } ,
          columns:[
            { data: "customer" },
            { data: "first_name" },
            { data: "last_name" },
            { data: "site" },
            { data: "start_date" },
            { data: "start_time" },
            { data: "end_date" },
            { data: "end_time" },
            { data: "hours" },
            { data: "check_in" },
            { data: "check_out" },
            { data: "hours_worked"},
            { data: "guard_charge" },
            { data: "client_charge" },
            { data: "guard_id" },
            { data: "earned"},
            { data: "settlement_status"},
            ]
            ,
            select: true,
            dom: 'Bfrtip',
            buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5',
            'print'
            ],
        responsive: true,
            createdRow: function (row, data, index) {

                if (data["settlement_status"] == "empty") {
                    $('td', row).css('background-color','#B5BCB5');
                    $('td', row).css('color', 'white');

                }
                else if(data["settlement_status"] == false){
                    $('td', row).css('background-color', '#F43939');
                    $('td', row).css('color', 'white');
                }
                else if(data["settlement_status"] == true){
                    $('td', row).css('background-color', '#39F447');
                    $('td', row).css('color', 'white');
                }
            },
           
          order:[[2, 'dsc']]

    })
    
    
});



  $.ajax({
    type: "get", url:`${domain}/api/v1/customer` + `?token=`+`Bearer ${atob(localStorage.getItem("myUser"))}`,
    dataType  : 'json',
          encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
  
    success: function (data, text) {
        displayCustomer(data.data)
    },
    error: function (request, status, error) {
  
        console.log(request)
        analyzeError(request)
    }
  });
  function displayCustomer(val){
    let data=`<option value="">--Select--</option>`
  
    for(let i=0; i<val.length; i++){
            data+= `
            <option value="${val[i].full_name}"> ${val[i].full_name} </option>
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
  type: "get", url:`${domain}/api/v1/job/getAllSite` + `?token=`+`Bearer ${atob(localStorage.getItem("myUser"))}`,
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
});
function displayGetAllSite(val){
  let data=`<option value="">--Select--</option>`

  for(let i=0; i<val.length; i++){
          data+= `
          <option value="${val[i].name}"> ${val[i].name} </option>
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
