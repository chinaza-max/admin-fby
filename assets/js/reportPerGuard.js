var minDate, maxDate
var customerName='';
var Site='';
var staffName='';






 

 
$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
 
    // DataTables initialisation
    let guardName=atob(localStorage.getItem("guardName"))  
    let guard_id=atob(localStorage.getItem("guardId"))  


    console.log(guardName)
    document.getElementById("headingTitle").innerHTML= "Report from "+ guardName  

    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/getSingleReportGuard`,
            method: "post",
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            job_id:activeUserID,
            guard_id
          },
          },
          columnDefs: [
            { "width": "20px", "targets": [0] },   
            { "width": "200px", "targets": [1] },             
            { "width": "300px", "targets": [2]}
          ] ,
          columns:[
            { data: "created_at" },
            { data: "message" },
            { data: "file_url" ,
            "render": function ( data,index) {
              if(data.includes("image")){
                return `<img src="${data}" width="40px">`;
              }
              else if(data.includes("video")){
                return ` <video  src="${data}"  width="120px" height="100px"  controls></video>`;
              }
              else{
                return "no file"
              }

              }
            },
            { data: "report_type" },
            { data: "is_emergency" },
            { data: "is_read" },
            { data: "who_has_it" },
            { data: "mime_type"},
            { data: "report_id" }
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
            order:[[ 0, 'dsc']]
            ,
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true


    })
    

    setTimeout(() => {


      
      var column1 = table.column(5);
      column1.visible(!column1.visible());
      var column2 = table.column(3);
      column2.visible(!column2.visible());
      /*var column3 = table.column(8);
      column3.visible(!column3.visible());
      var column4 = table.column(7);
      column4.visible(!column4.visible());
     
     /* var column2 = table.column(2);
      column2.visible(!column2.visible());
      var column3 = table.column(3);
      column2.visible(!column3.visible());
      */
      }, 1000);
});






  


