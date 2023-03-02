let guard_id=activeGuardID

let getProfileData
let getAllJobDoneByGuard

$(document).ready(function(){

    getProfileData=  function(){
        $.ajax({
            type: "post", url:`${domain}/api/v1/auth/profile_info`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data:{
                id:guard_id
            },
            success: function (data) {

              $("#guard_role").text("USER ROLE: "+data.data.user.role);
              $("#address").text(data.data.user.address);
              $("#tel").text(data.data.user.phone_number);
              $("#email").text(data.data.user.email);
              $("#createdAt").text(data.data.user.created_at);
              $("#lastUpdate").text(data.data.user.updated_at);
              $("#guard_role2").text(data.data.user.role)
              $('#name').text(data.data.user.first_name+" "+data.data.user.last_name)
                
            },
            error: function (request, status, error) {
                    analyzeError(request)
            }
        });
    }
    getProfileData()


    getAllJobDoneByGuard=  function(){
      $.ajax({
          type: "get", url:`${domain}/api/v1/job/all_jobs_done_by_gaurd?guard_id=${guard_id}`,
          dataType  : 'json',
          encode  : true,
          headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          success: function (data) {
            displaySelect(data.data,'selectpickerCus')
        
          },
          error: function (request, status, error) {
                  analyzeError(request)
          }
      });
  }
  getAllJobDoneByGuard()

  var table =$('#example').DataTable({
    ajax: {
        url: `${domain}/api/v1/job/allMemoDetailGuard?type=allMemo&id=${guard_id}`,
        method: "get",
        dataType  : 'json',
        encode  : true,  
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
      },
      columnDefs: [
        {
          render: function (data, type, full, meta) {
              return "<div   class='text-nowrap  width-200' >" + data + "</div>";
          },
          targets: 1
        },
        {
          render: function (data, type, full, meta) {


            
            return  `
              <button type="button" onclick="guardOnMemo(${data})" class="btn btn-outline-primary" data-toggle="modal" data-target="#guards">
                Send to
              </button>                      

              <button type="button" class="btn btn-outline-danger mt-1" onclick="deleteMemo(${data})">
                <span class="d-none d-sm-block">Remove</span>
                <span class="d-sm-none">Delete</span>
              </button>
            </div>
        `

          },
          targets: 6
        }
        ,
        {
          render: function (data, type, full, meta) {



            if(data=="Sent"){
              return  `<span class="badge badge-pill badge-success">SENT</span>
              `
            }
            else if(data=="Pending"){
              return  `<span class="badge badge-pill badge-info">PENDING</span>
              `
            }
              `
              <button type="button" onclick="guardOnMemo(${data})" class="btn btn-outline-primary" data-toggle="modal" data-target="#guards">
                Send to
              </button>                      

              <button type="button" class="btn btn-outline-danger mt-1" onclick="deleteMemo(${data})">
                <span class="d-none d-sm-block">Remove</span>
                <span class="d-sm-none">Delete</span>
              </button>
            </div>
        `

          },
          targets: 4
        }
      ],
      columns:[
        { data: "Created" },
        { data: "CreatedBy" },
        { data: "message" },
        { data: "send_date" },
        { data: "send_status" },
        { data: "memo_id" },
        { data: "memo_receiver_id" }
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
        order:[[ 0, 'dsc']]
  })


  let column1 = table.column(5);
   column1.visible(!column1.visible());
   let column2 = table.column(6);
   column2.visible(!column2.visible());

})


function displaySelect(val,picker){

  let data=`<option>--select--</option>
  `
    for(let i=0;i<val.length;i++){
        data+=`
        <option data-tokens=${val[i].job_id}>${val[i].company_name}</option>
        `
        if(i==val.length-1){

          $(`.${picker}`).children().remove();
          $(`.${picker}`).append(data)
          $('.selectpicker').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $(`#${picker}`).children().remove();
      $(`.${picker}`).selectpicker('refresh')
    }
}


function displaySelectSite(val,picker){


  let data=`<option>--select--</option>
  `
    for(let i=0;i<val.length;i++){
        data+=`
        <option data-tokens=${val[i].job_id}>${val[i].name}</option>
        `
        if(i==val.length-1){

          $(`.${picker}`).children().remove();
          $(`.${picker}`).append(data)
          $('.selectpicker').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $(`#${picker}`).children().remove();
      $(`.${picker}`).selectpicker('refresh')
    }
}




function selectedCustomer(){

    $('.selectpickerCus').on("changed.bs.select", function() {
      let=  my_job_id = $('option:selected', this).attr("data-tokens");
        getSite(my_job_id)
    });


    let data=`<option>--empty--</option>
    `
    $(`.selectpickerSite`).children().remove();
          $(`.selectpickerSite`).append(data)
          $('.selectpicker').selectpicker('refresh')

          cleanDisplay() 
}

function cleanDisplay(){
  $("#job_status").text("None")
  $("#jobDes").text("")

  $(`#containerDes`).children().remove();
  $(`#containerDes`).append("")
}
function getSite(id){
  $.ajax({
    type: "get", url:`${domain}/api/v1/job/get_site_from_job?job_id=${id}`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data) {

      displaySelectSite(data.data,'selectpickerSite')
  
    },
    error: function (request, status, error) {
            analyzeError(request)
    }
});
}

function getJobDetail(){


  cleanDisplay()
  $('.selectpickerSite').on("changed.bs.select", function() {
    let=  my_job_id = $('option:selected', this).attr("data-tokens");
      fetchJob(my_job_id)
  });

}

function fetchJob(id){

  $.ajax({
    type: "get", url:`${domain}/api/v1/job/get_job_details?job_id=${id}`,
    dataType  : 'json',
    encode  : true,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data) {

        console.log(data)  
        $("#job_status").text(data.data.payment_status)
        $("#jobDes").text(data.data.description)

        let data2=`<a onclick="storeCurrentJobID(${data.data.id})" href="guard-in-job.html"  class="btn btn-outline-primary">
        More<span class="btn-icon icofont-prescription ms-2"></span>
      </a>
    `
    $(`#containerDes`).children().remove();
          $(`#containerDes`).append(data2)

    },
    error: function (request, status, error) {
            analyzeError(request)
    }
});
}