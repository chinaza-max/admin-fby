
let site_id=activeSiteID




$(document).ready(function(){
    
    let table =$('#example').DataTable({
        ajax: {
            url: `${domain}/api/v1/job/get_jobs_attached_to_site?site_id=${site_id}`,
            method: "get",
            dataType  : 'json',
            encode  : true,  
            dataSrc: function (data) {

                console.log(data)
                $("#cName").text("Company's Name : "  +data.data.company_name)
                $("#sName").text("Site's Name : " +data.data.company_name)

                return data.data.jobs;
              },
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
          },
          columnDefs: [
        
            {
              render: function (data, type, full, meta) {
                    

                if(data==100){
                    return  `
                    <div class="progress">
                    <div class="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${data}%"></div>
                    </div>
                `
                }
                else{
                    return  `
                    <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${data}%"></div>
                    </div>
                `
                }
          
    
              },
              targets: 5
            },
            
            {
                render: function (data, type, full, meta) {
                      
  
                  if(data=="Paid"){
                      return  `
                      <div class="text-nowrap text-success">
                        <i class="icofont-check-circled"></i> Paid
                      </div>
                  `
                  }
                  else{
                      return  `

                      <div class="text-nowrap text-danger">
                        <i class="icofont-close-circled"></i> Un-Paid
                      </div>
           
                  `
                  }
            
      
                },
                targets: 6
              }
              ,
            
              {
                  render: function (data, type, full, meta) {

                            return  `
                            <a  onclick="storeCurrentUserID(${data})" href="guard-in-job.html"  class="btn btn-dark btn-sm btn-square rounded-pill">
                            <span class="btn-icon icofont-external-link"></span>
                            </a>
                    `
                
                  },
                  targets: 7
                }
                ,
            
                {
                    render: function (data, type, full, meta) {
                          
                        if(data=='ACTIVE'){
                            return`
                            <span class="badge badge-success">${data}</span>
                            `
                        }
                        else if(data=='PENDING'){
                            return`
                            <span class="badge badge-warning">${data}</span>`
                        }
                        else{
                            return`
                            <span class="badge badge-info">${data}</span>`
                        }
  
                    },
                    targets: 3
                  }
          
          ],
          
          columns:[
            { data: "created_at" },
            { data: "client_charge" },
            { data: "staff_charge" },
            { data: "job_status" },
            { data: "job_type" },
            { data: "job_progress" },
            { data: "payment_status" },
            { data: "id" }
            ],
            select: true,
            responsive: true,
            createdRow: function (row, data, index) {
    
            },
            order:[[ 0, 'dsc']]
    
    
      })
    

      console.log(site_id)
      $.ajax({
        type: "get", url:`${domain}/api/v1/job/get_jobs_attached_to_site?site_id=${site_id}`,
        dataType  : 'json',
        encode  : true,
        dataSrc: function (data) {
            return data.data.jobs;
          },
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        success: function (data) {
            console.log(data)
        },
        error: function (request, status, error) {

            console.log(request)
            analyzeError(request)
         
        }
      });
      
    
  });