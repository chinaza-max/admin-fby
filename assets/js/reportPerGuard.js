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

    document.getElementById("headingTitle").innerHTML= "Report from "+ guardName  

    var table = $('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/getSingleReportGuard`,
            method: "post",
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          data: {
            job_id:activeJobID,
            guard_id
          },
          },
          columnDefs: [
            { "width": "20px", "targets": [0] },               
            { "width": "300px", "targets": [2]},  
            { "width": "200px", "targets": [1]},  

            {
              render: function (data, type, full, meta) {
                  return "<div class='text-wrap width-200'>" + data + "</div>";
              },
              targets: 1
            }
          ] ,
          columns:[
            { data: "created_at" },
            { data: "message" },
            { data: "file_url" ,
            "render": function ( data,index) {

              if(data.endsWith("jpeg")||data.endsWith("png")||data.endsWith("jpg")){
                return `<img src="${data}" width="90px">  <a href="${data}" download>download</a>`;
              }
              else if(data.endsWith("mp4")){
                return ` <video  src="${data}"  width="120px" height="100px"  controls></video>`;
              }
              else{
                return "None"
              }

              }
            },
            { data: "report_type" },
            { data: "is_emergency",
            "render": function ( data,index) {

              if(data){
                return `<button type="button" class="btn btn-danger" >Emergency</button>`;
              }
              else if(data==false){
                return `<button  class="btn btn-primary cursor-auto disabled" >Non emergency</button>`;
              }
              else{
                return "None"
              }

              } },
            { data: "is_read" },
            { data: "who_has_it" },
            { data: "mime_type",
            "render": function ( data,index) {
              if(data){
                return `${data}`;
              }
              else{
                return "None"
              }

              }
            },
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
      var column3 = table.column(6);
      column3.visible(!column3.visible());
      var column4 = table.column(8);
      column4.visible(!column4.visible());
     
     /* var column2 = table.column(2);
      column2.visible(!column2.visible());
      var column3 = table.column(3);
      column2.visible(!column3.visible());
      */
      }, 1000);
});



//https://datatables.net/forums/discussion/51339/pdf-with-many-columns-get-cut-short




  


