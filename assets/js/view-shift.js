var minDate, maxDate
var customerName='';
var Site='';
var staffName='';
var test="Software Engineer";

let totalHours=0
let amountPending=0





 
// Custom filtering function which will search data in column four between two values

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[4] );
        var date2 = new Date( data[6] );

        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )

            ||( min === null && date2 <= max )||
            ( min <= date2   && max === null ) ||
            ( min <= date2   && date2 <= max )
        ) {
            return true;
        }
        return false;
    }
)


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        
        var customerNameVT = data[1];
        var SiteVT = data[2] ;
        var staffNameVT = data[0];
        

        if ((customerName ==='')&&(Site ==='' )&&(staffName==='')) {
            console.log("1")

            if(data[17]==false){
            
            calPayPerSchedule(data[11] ,data[12])
            }
          
            
            return true;
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName==='')){
            console.log("2")

            if(data[17]==false){
              calPayPerSchedule(data[11] ,data[12])
             }
            
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName==='')){
            console.log("3")
           
            if(data[17]==false){
              calPayPerSchedule(data[11] ,data[12])
            }
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName==='')){
            console.log("4")

            if(data[17]==false){
              calPayPerSchedule(data[11] ,data[12])
            }
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)&&(staffName===staffNameVT)){
            
          if(data[17]==false){ 
            calPayPerSchedule(data[11] ,data[12])
          }
            return true
        }
        else if((customerName==='')&&(Site==='')&&(staffName===staffNameVT)){
            
          if(data[17]==false){
            calPayPerSchedule(data[11] ,data[12])
          }
            return true
        }
        else if((customerName===customerNameVT)&&(Site==='')&&(staffName===staffNameVT)){
            
          if(data[17]==false){  
            calPayPerSchedule(data[11] ,data[12])
          }
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName===staffNameVT)){
           
          if(data[17]==false){
            calPayPerSchedule(data[11] ,data[12])
           }
            return true
        }
        
        calPayOff(totalHours ,amountPending)

        return false;
    }
);


function calPayPerSchedule(money ,hour){

 totalHours+=hour
 amountPending+=money*hour
 calPayOff(totalHours ,amountPending)
 
} 

 
$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
 
    // DataTables initialisation
    console.log("data")

    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/allJobs/generalshift`,
            method: "get"
          } ,
          columnDefs: [
            { "width": "200px", "targets": [5,6] },   
            { "width": "200px", "targets": [8] },             
            { "width": "20px", "targets": [10,11]}
          ] ,
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
            { data: "earned" },
            { data: "job_status" },
            { data: "description" },
            { data: "settlement_status" },

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
          
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
        ,
            createdRow: function (row, data, index) {


              if(data["settlement_status"]==false){

                  calPayPerSchedule(data["guard_charge"],data["hours_worked"])
              }
              else{
                console.log(data)

              }
              

    
                if (data["job_status"] == "ACTIVE") {
                    $('td', row).css('background-color', '#828204');
                    $('td', row).css('color', 'white');

                }
                else if(data["job_status"] == "PENDING"){
                    $('td', row).css('background-color','#b60707');
                    $('td', row).css('color', 'white');
                }
                else if(data["job_status"] == "COMPLETED"){
                    $('td', row).css('background-color', 'green ');
                    $('td', row).css('color', 'white');
                }
            }
   
    })


    
    console.log(table)
    table.row(0).select();


    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
      
        var column = table.column($(this).attr('data-column'));
        // Toggle the visibility
        column.visible(!column.visible());
    });
     
    setTimeout(() => {


    var column1 = table.column(14);
    column1.visible(!column1.visible());
    var column2 = table.column(15);
    column2.visible(!column2.visible());
    var column3 = table.column(16);
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
    
   
    // Refilter the table
    $('#min, #max').on('change', function () {
        initializePayOff()
        table.draw();
    });
     // Refilter the table
    $('#staffName').on('change', function (e) {
        initializePayOff()
        staffName=this.value
        table.draw();

        
    });
    $('#Site').on('change', function (e) {
        initializePayOff()
        Site=this.value
        table.draw();
    });
    $('#customerName').on('change', function (e) {
        initializePayOff()
        customerName=this.value
        table.draw();
    });
    
});


function initializePayOff(){
    console.log("clear")
    totalHours=0
    amountPending=0
}


function calPayOff(val1, val2){
    
    document.getElementById("totalHours").innerHTML =val1
    document.getElementById("amountPending").innerHTML ="$"+val2
}



//GET CUSTOMER AND DISPLAY
  $.ajax({
    type: "get", url:`${domain}/api/v1/customer`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
  
    success: function (data, text) {
        console.log(data.data)
  
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











  
//GET GUARD AND DISPLAY
$.ajax({
  type: "get", url:`${domain}/api/v1/job/getAllGuard`,
  headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
  },

  success: function (data, text) {
      console.log(data.data)
      displayGetAllGuard(data.data)
  },
  error: function (request, status, error) {

      console.log(request)
      analyzeError(request)
   
  }
});
function displayGetAllGuard(val){
  let data=`<option value="">--Select--</option>`

  for(let i=0; i<val.length; i++){
          data+= `
          <option value="${val[i].name}"> ${val[i].name} </option>
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




  
//GET SITE AND DISPLAY
$.ajax({
  type: "get", url:`${domain}/api/v1/job/getAllSite`,
  headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
  },

  success: function (data, text) {
      console.log(data.data)
      displayGetAllSite(data.data)
  },
  error: function (request, status, error) {

      console.log(request)
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