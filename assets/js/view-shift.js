var minDate, maxDate
var customerName='';
var Site='';
var staffName='';
var test="Software Engineer";

let totalHours=0
let amountPending=0

let initiallze=true
let dateSearch=true
let userSearch=true






 
// Custom filtering function which will search data in column four between two values

$.fn.dataTable.ext.search.push(

  
    function( settings, data, dataIndex ) {


        if(dateSearch==true){
  
          var min = minDate.val();
          var max = maxDate.val();
          var date = new Date( data[3] );
          var date2 = new Date( data[5] );

          var minM = moment(min).format("MM-DD-YYYY") ;
          var maxM = moment(max).format("MM-DD-YYYY")  ;
          var dateM =moment(date).format("MM-DD-YYYY") ;
          var date2M = moment(date2).format("MM-DD-YYYY") ;
            




          if (
              ( min === null && max === null ) ||
              ( min === null &&  moment(dateM).isSameOrBefore(maxM)) ||
              (moment(minM).isSameOrBefore(dateM)  && max === null ) ||
              ( moment(minM).isSameOrBefore(dateM)   && moment(dateM).isSameOrBefore(maxM) )
  
              ||( min === null &&  moment(date2M).isSameOrBefore(maxM))||
              ( moment(minM).isSameOrBefore(date2M)   && max === null ) ||
              ( moment(minM).isSameOrBefore(date2M)   &&  moment(date2M).isSameOrBefore(maxM) )
          ) {
  
          
            if(data[16]=="false"&&!initiallze){
            //  calPayPerSchedule(data[10] ,data[12])
            }       
              return true;
          }
          return false;
        }
        else if(dateSearch=="none"){
          if(data[16]=="false"&&!initiallze){
          //  calPayPerSchedule(data[10] ,data[12])
          } 
         // calPayPerSchedule(data[10] ,data[12])
          return true
        }
        else{


            var customerNameVT = data[1];
            var SiteVT = data[2] ;
            var staffNameVT = data[0];
            
    
            if ((customerName ==='')&&(Site ==='' )&&(staffName==='')) {
    
                if(data[16]=="false"&&!initiallze){
                  //calPayPerSchedule(data[10] ,data[12])
                }
              
                
                return true;
            }
            else if((customerName===customerNameVT)&&(Site==='')&&(staffName==='')){
    
                if(data[16]=="false"&&!initiallze){
                //  calPayPerSchedule(data[10] ,data[12])
                 }
                
                return true
            }
            else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName==='')){
               
                if(data[16]=="false" &&!initiallze){
                //  calPayPerSchedule(data[10] ,data[12])
                }
                return true
            }
            else if((customerName==='')&&(Site===SiteVT)&&(staffName==='')){
    
                if(data[16]=="false" &&!initiallze){
                //  calPayPerSchedule(data[10] ,data[12])
                }
                return true
            }
            else if((customerName==='')&&(Site===SiteVT)&&(staffName===staffNameVT)){
                
              if(data[16]=="false" &&!initiallze){ 
               // calPayPerSchedule(data[10] ,data[12])
              }
                return true
            }
            else if((customerName==='')&&(Site==='')&&(staffName===staffNameVT)){
                
              if(data[16]=="false"&&!initiallze){
               // calPayPerSchedule(data[10] ,data[12])
              }
                return true
            }
            else if((customerName===customerNameVT)&&(Site==='')&&(staffName===staffNameVT)){
                
              if(data[16]=="false"&&!initiallze){  
               // calPayPerSchedule(data[10] ,data[12])
              }
                return true
            }
            else if((customerName===customerNameVT)&&(Site===SiteVT)&&(staffName===staffNameVT)){
               
              if(data[16]=="false"&&!initiallze){
               // calPayPerSchedule(data[10] ,data[12])
               }
                return true
            }
            
            //calPayOff(totalHours ,amountPending)
    
            return false;
          
        }

      }

)




function calPayPerSchedule(money ,hour){

 totalHours+=Number(hour)
 amountPending+= Number(money.slice(1))*Number(hour)


 console.log(totalHours ,amountPending)


 calPayOff(totalHours ,amountPending)
 
} 

 
$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    })


    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/allJobs/generalshift`,
            method: "get",
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          } ,
          columnDefs: [
            { "width": "200px", "targets": [5,6] },   
            { "width": "200px", "targets": [15] },   
            {
              render: function (data, type, full, meta) {
                  return "<div   class='text-wrap width-200'>" + data + "</div>";
              },
              targets: 15
            }, 
            {
              render: function (data, type, full, meta) {

                  return "<div class='text-wrap' style='min-width:200px'>" + data + "</div>";
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
            order:[[ 3, 'dsc']]
            ,
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true,
      
        createdRow: function (row, data, index) {

            if (data["job_status"] == "ACTIVE") {
                $('td', row).css('background-color', '#828204');
                $('td', row).css('color', 'white');

            }
            else if(data["job_status"] == "PENDING"){
                $('td', row).css('background-color','#b60707');
                $('td', row).css('color', 'white');
            }
            else if(data["job_status"] == "COMPLETED"){
                $('td', row).css('background-color', 'green');
                $('td', row).css('color', 'white');
            }
        },
        rowCallback: function( row, data, index ) {
          if(data["settlement_status"]==false){
            calPayPerSchedule(data["guard_charge"],data["hours_worked"])
          } 
        
        }
   
    })






    table.on( 'search.dt', function () {
      initializePayOff()

    } );

    table.row(0).select();
    table
        .on('order', function () {

           // console.log("order order order order order order")
        })
        .on('search', function () {
         // console.log("search search search search search ")

        })
        .on('page', function () {
          initializePayOff()
        });

    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
      
       var column = table.column($(this).attr('data-column'));
        // Toggle the visibility
        column.visible(!column.visible());
    });
     
    setTimeout(() => {

    //var column1 = table.column(15);
   // column1.visible(!column1.visible());

  
    }, 1000);
    
   
    // Refilter the table
    $('#min, #max').on('change', function () {
       // initializePayOff()
        dateSearch=true
        userSearch=false
        table.draw();
        //initiallze=false
       
    });
     // Refilter the table
    $('#staffName').on('change', function (e) {
        //initializePayOff()
       // initiallze=false
        staffName=this.value
        dateSearch=false
        userSearch=true
        table.draw();

        
    });
    $('#Site').on('change', function (e) {
        //initializePayOff()
       // initiallze=false
        Site=this.value
        dateSearch=false
        userSearch=true
        table.draw();
    });
    $('#customerName').on('change', function (e) {
        //initializePayOff()
        //initiallze=false
        customerName=this.value
        dateSearch=false
        userSearch=true
        table.draw();
    });
    
});


function initializePayOff(){
    totalHours=0
    amountPending=0
    calPayOff(totalHours ,amountPending)
}


function calPayOff(val1, val2){
    
    document.getElementById("totalHours").innerHTML =Number(val1).toFixed(2) 
    document.getElementById("amountPending").innerHTML ="$"+Number(val2).toFixed(2) 
}



//GET CUSTOMER AND DISPLAY
  $.ajax({
    type: "get", url:`${domain}/api/v1/customer`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
  
    success: function (data, text) {
        displayCustomer(data.data)
    },
    error: function (request, status, error) {
  
        analyzeError(request)
    }
  });
  function displayCustomer(val){
    let data=`<option value="">--Select--</option>`
  
    for(let i=0; i<val.length; i++){
            data+= `
            <option value="${val[i].company_name}"> ${val[i].company_name} </option>
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
  let data=`<option value="">--Select--</option>`

  for(let i=0; i<val.length; i++){
          data+= `
          <option data-subtext="${val[i].suspension_status}  ID:${val[i].guard}" value="${val[i].name}"> ${val[i].name} </option>
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

      console.log(request)
      analyzeError(request)
   
  }
});
function displayGetAllSite(val){
  let data=`<option value="">--Select--</option>`

  for(let i=0; i<val.length; i++){
          data+= `
          <option data-subtext="${val[i].customer_name}" value="${val[i].name}"> ${val[i].name} </option>
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


