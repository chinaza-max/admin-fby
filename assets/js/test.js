




$(document).ready(function() {



    let guardName=atob(localStorage.getItem("guardName"))  
    let guard_id=atob(localStorage.getItem("guardId"))  

    document.getElementById("headingTItle").value= "Report from "+ guardName  

    $('#example').DataTable({
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
          columns:[
            { data: "created_at" },
            { data: "message" },
            { data: "file_url" },
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
  

})