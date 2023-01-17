







let getAllMemo=''

$(document).ready(function() {



    $j('#summernote').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']]
      ]
    });
//guard limit and offset not been use
  $.ajax({
      type: "get", url:`${domain}/api/v1/user/getAllStaff?role=ALL_GUARD&limit=${15}&offset=${0}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
      success: function (data) {
        displayGuard(data.data,"selectedGuards")
      },
      error: function (request, status, error) {
        analyzeError(request)
      }
  });


  function displayGuard(val,picker){
    let data=''

      for(let i=0;i<val.length;i++){
  
          data+=`
          <option data-subtext="ID:${val[i].id}" data-name=${val[i].id}>${val[i].full_name};</option>
          `
          if(i==val.length-1){

            $(`#${picker}`).children().remove()
            $(`#${picker}`).append(data)
            $('.selectpicker').selectpicker('refresh')

          }
      }
      if(val.length==0){
        $(`#${modalId}`).children().remove();
        $(`.${picker}`).selectpicker('refresh')

      }


  }



  $.ajax({
      type: "get", url:`${domain}/api/v1/job/allJobs?type=ALL_JOB&limit=${15}&offset=${0}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
    
      success: function (data) {

        displayJob(data.data,"selectpickerJob")
      },
      error: function (request, status, error) {

        analyzeError(request)
      
      }
  });




  getAllMemo=function(){
    $.ajax({
      type: "get", url:`${domain}/api/v1/job/allMemoDetail?type=allMemo`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
    
      success: function (data) {

          displayMemo(data.data)
      },
      error: function (request, status, error) {

        analyzeError(request)
      
      }
  });
  }
  getAllMemo()


});

function displayMemo(val){

  let data=''

  if(val.length!=0){

      for(let i=0; i<val.length; i++){

        if(val[i].send_status=="Sent"){

            if(val[i].message_length <500){
              data+=` <div class="col-12 col-md-4">
              <div class="card department bg-light bg-gradient">
                <div class="card-body">
                  <h3 class="h5 mt-0">${val[i].CreatedBy}</h3>
  
                  <div style="min-height:180px;">${val[i].message}
                  </div>
  
                  <div class="team  align-items-center">
                    
                      <h6>Status <span class="badge badge-secondary badge-inside">Sent</span></h6>
                      <h6>Sent on  : ${val[i].send_date}</h6>
                      <h6>Created : ${val[i].Created}</h6>
                  </div>
  
  
                  <div class="row">
                    <div class="col">
                      <button type="button" onclick="guardOnMemo(${val[i].id})" class="btn btn-outline-primary"  data-toggle="modal" data-target="#guards">
                        Sent to
                      </button>                      
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-outline-danger"  onclick="deleteMemo(${val[i].id})">
                        <span class="d-none d-sm-block">Remove</span>
                        <span class="d-sm-none">Delete</span>
                      </button>
                    </div>
                  </div>
  
                  
                </div>
              </div>
            </div>`
            }
            else{
              data+=` <div class="col-12 col-md-4">
              <div class="card department bg-light bg-gradient">
                <div class="card-body">
                  <h3 class="h5 mt-0">${val[i].CreatedBy}</h3>
  
                  <div style="height:160px;overflow-y: hidden;">${val[i].message}
                  </div>
                  <a href="#" onclick="getFullMessage(${val[i].id})"  data-toggle="modal" data-target="#memo-message">more</a>

  
                  <div class="team  align-items-center">
                    
                      <h6>Status <span class="badge badge-secondary badge-inside">Sent</span></h6>
                      <h6>Sent on  : ${val[i].send_date}</h6>
                      <h6>Created : ${val[i].Created}</h6>
                  </div>
  
  
                  <div class="row">
                    <div class="col">
                      <button type="button" onclick="guardOnMemo(${val[i].id})" class="btn btn-outline-primary"  data-toggle="modal" data-target="#guards">
                        Sent to
                      </button>                      
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-outline-danger" onclick="deleteMemo(${val[i].id})">
                        <span class="d-none d-sm-block">Remove</span>
                        <span class="d-sm-none">Delete</span>
                      </button>
                    </div>
                  </div>
  
                  
                </div>
              </div>
            </div>`
            }
        }
        else if(val[i].send_status=="Pending"){


            if(val[i].message_length <500){
              data+=`  <div class="col-12 col-md-4">
              <div class="card department bg-light bg-gradient" >
    
                <div class="card-body">
    
                  <h3 class="h5 mt-0">${val[i].CreatedBy}</h3>
    
    
                  <div style="min-height:180px;">
                  ${val[i].message}
                  </div>
    
                  <div class="team  align-items-center">
                      <h6>Status <span class="badge badge-secondary badge-inside">Pending</span></h6>
                      <h6>Delivery date: ${val[i].send_date}</h6>
                      <h6>Created : ${val[i].Created}</h6>
                  </div>
    
    
                  <div class="row">
                    <div class="col">
                      <button type="button" onclick="guardOnMemo(${val[i].id})" class="btn btn-outline-primary" data-toggle="modal" data-target="#guards">
                        Send to
                      </button>                      
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-outline-danger" onclick="deleteMemo(${val[i].id})">
                        <span class="d-none d-sm-block">Remove</span>
                        <span class="d-sm-none">Delete</span>
                      </button>
                    </div>
                  </div>
    
                  
                </div>
              </div>
            </div>`
            }
            else{
              data+=`  <div class="col-12 col-md-4">
              <div class="card department bg-light bg-gradient" >
    
                <div class="card-body">
    
                  <h3 class="h5 mt-0">${val[i].CreatedBy}</h3>
    
    
                  <div style="height:160px;overflow-y: hidden">
                  ${val[i].message}
                    
                  </div>
                  <a href="#"  onclick="getFullMessage(${val[i].id})" data-toggle="modal" data-target="#memo-message">more</a>
    
                  <div class="team  align-items-center">
                      <h6>Status <span class="badge badge-secondary badge-inside">Pending</span></h6>
                      <h6>Delivery date: ${val[i].send_date}</h6>
                      <h6>Created : ${val[i].Created}</h6>
                  </div>
    
    
                  <div class="row">
                    <div class="col">
                      <button type="button" onclick="guardOnMemo(${val[i].id})" class="btn btn-outline-primary" data-toggle="modal" data-target="#guards">
                        Send to
                      </button>                      
                    </div>
                    <div class="col text-end">
                      <button type="button" class="btn btn-outline-danger" onclick="deleteMemo(${val[i].id})">
                        <span class="d-none d-sm-block">Remove</span>
                        <span class="d-sm-none">Delete</span>
                      </button>
                    </div>
                  </div>
    
                  
                </div>
              </div>
            </div>`
            }
        }

          if(i==val.length-1){

              $('#memoContainer').children().remove();
              $("#memoContainer").append(data)
          }
      }
  }
  else{
      $('#memoContainer').children().remove();
      $("#memoContainer").append(`
  
      <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
      YOU HAVE NO MEMO
    </div>
      `)
  }    
}



function getFullMessage(id){

  $.ajax({
    type: "get", url:`${domain}/api/v1/job/allMemoDetail?type=memoMessageOnly&id=${id}`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    dataType  : 'json',
    encode  : true,
  
    success: function (data) {
      $('#memo-message-container').children().remove();
      $("#memo-message-container").append(data.data[0])
    },
    error: function (request, status, error) {

      analyzeError(request)
    
    }
  });
}
function displayJob(val,picker){

  let data=''

    for(let i=0;i<val.length;i++){
        data+=`
        <option  data-subtext="ID:${val[i].id}" data-name=${val[i].id} >Customer: ${' '+val[i].customer}; Site : ${' '+val[i].site};</option>
        `
        if(i==val.length-1){

          $(`.${picker}`).children().remove();
          $(`.${picker}`).append(data)
          $('.selectpicker').selectpicker('refresh')

        }
    }
    if(val.length==0){
      $(`#${modalId}`).children().remove();
      $(`.${picker}`).selectpicker('refresh')

    }


}



let sentToSelection="selectGuard"
let selectDate="now"

document.getElementById("displayJob").style.display="none";
document.getElementById("sentToSelection").addEventListener("change", function() {
    if(this.value=="selectGuard"){
      document.getElementById("displayGuard").style.display="block";
      document.getElementById("displayJob").style.display="none";  
    }
    else if(this.value=="guardInJob"){
      document.getElementById("displayGuard").style.display="none";
      document.getElementById("displayJob").style.display="block";
  
    }
    else if(this.value=="allGuard"){
      document.getElementById("displayGuard").style.display="none";
      document.getElementById("displayJob").style.display="none";  
    }
})


document.getElementById("date").style.display="none";  
document.getElementById("dateToSend").addEventListener("change", function() {

  if(this.value=="now"){
    document.getElementById("date").style.display="none";  
  }
  else if(this.value=="selectDate"){
    document.getElementById("date").style.display="block";
  }
  selectDate=this.value

})
  




document.getElementById("sentToSelection").addEventListener("change", function() {
  sentToSelection=this.value
})

document.getElementById("uploadButton").addEventListener("click", myFunction);
   function myFunction(){
    let markupStr = $j('#summernote').summernote('code');
  
    let editorTag=document.querySelector("#summernote  p")

    function isEmpty(node) {
      return node.textContent.trim() === "";
    }

   if(markupStr.includes("Enter message here")==false&&isEmpty(editorTag)==false){
          
    if(sentToSelection=="selectGuard"){

      let guard_id_array = $("#selectedGuards option:selected").map(function() {
        return $(this).data("name");
      }).get();


      if(guard_id_array.length==0){
        handleError("No guard is selected")
      }
      else{

        if(selectDate=="selectDate"){
          let myDate=document.getElementById('myDate').value
          let myTime=document.getElementById('myTime').value
          if(myDate==myTime){
            handleError("Date and Time is required")
          }
          else{
            upload(guard_id_array,markupStr,moment(new Date(myDate+' '+myTime)).format("YYYY-MM-DD hh:mm:ss a"))
          }
        }
        else{
          upload(guard_id_array,markupStr,'')
        }
      }

    }
    else if(sentToSelection=="guardInJob"){
      let job_id_array = $(".selectpickerJob option:selected").map(function() {
        return $(this).data("name");
      }).get();

      if(job_id_array.length==0){
        handleError("No Job is selected")
      }
      else{
        if(selectDate=="selectDate"){
            let myDate=document.getElementById('myDate').value
            let myTime=document.getElementById('myTime').value
            if(myDate==myTime){
              handleError("Date and Time is required")
            }
            else{
              getGuardIdInJob(job_id_array,markupStr,moment(new Date(myDate+' '+myTime)).format("YYYY-MM-DD hh:mm:ss a") )
            }
        }
        else{
          getGuardIdInJob(job_id_array,markupStr,'')
        }
      }

    }
    else if(sentToSelection=="allGuard"){
  

      if(selectDate=="selectDate"){
          let myDate=document.getElementById('myDate').value
          let myTime=document.getElementById('myTime').value
        if(myDate==myTime){
          handleError("Date and Time is required")
        }
        else{
          getAllGuardId(markupStr,moment(new Date(myDate+' '+myTime)).format("YYYY-MM-DD hh:mm:ss a") )
        }

      }
      else{
        getAllGuardId(markupStr,'')
      }
      
    
    }
   }else{
    handleError("Message can not be empty ")
   }

  }


  function getAllGuardId(message,send_date){
    //guard limit and offset not been use

    $.ajax({
      type: "get", url:`${domain}/api/v1/user/getAllStaff?role=ALL_GUARD&limit=${15}&offset=${0}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
      success: function (data) {

        if(data.data.length==0){
          handleError("No guard vailable")
        }
        else{
     
          let guard_id_array2=[]
          for (let i = 0; i < data.data.length; i++) {
              
            guard_id_array2.push(data.data[i].id)
            if(i==data.data.length-1){
              upload(guard_id_array2,message,send_date )
            }
          }
        }

      },
      error: function (request, status, error) {
        analyzeError(request)
      }
    });

}

  function getGuardIdInJob(jobs_id,message,send_date ){

    $.ajax({
      type: "post", url:`${domain}/api/v1/job/get_guard_id_from_job`,
      dataType  : 'json',
      encode  : true,
      headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      data: {
        jobs_id:JSON.stringify(jobs_id), 
      },
      success: function (data) {
  
        if(data.data.length==0){
          handleError("No guard vailable")
        }
        else{
          upload(data.data,message,send_date )
        }

      },
      error: function (request, status, error) {
    
          analyzeError(request)
       
      }
    });
  }


  function upload(guards_details,message,send_date ){
    $.ajax({
      type: "post", url:`${domain}/api/v1/job/create_memo`,
      dataType  : 'json',
      encode  : true,
      headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      data: {
        guards_details:JSON.stringify(guards_details),
        message,
        send_date      
      },
      success: function (data) {
  
          showModal(data.message)
          $j("#RegisterationSuccessFull").modal('show');

          setTimeout(() => {
            getAllMemo()
          }, 200);
          setTimeout(() => {

            $j("#RegisterationSuccessFull").modal('hide');
                  
          }, 3000);

      },
      error: function (request, status, error) {
  
        analyzeError(request)
       
      }
    });
  }


  function handleError(message){
    Swal.fire({
      icon: 'warning',
      text: message,
      showCloseButton: true,
      confirmButtonAriaLabel: 'ok'
    })
  }

  function guardOnMemo(id){
    $.ajax({
      type: "get", url:`${domain}/api/v1/job/allMemoDetail?type=guardDetails&id=${id}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
    
      success: function (data) {
       displayGuardInMemo(data.data)
      },
      error: function (request, status, error) {
  
        analyzeError(request)
      
      }
  });
  }
  
  function displayGuardInMemo(val){


    $("#NumberOfGuard").text(val[0].number_of_guard)
    let data=''
  
        for(let i=0; i<val.length; i++){
  
              if(val[i].is_message){
                data+=` <li class="list-group-item d-flex justify-content-between align-items-center">
                ${val[i].full_name}
                <a href="#" onclick="getMemoReply(${val[i].id},${val[i].guard_id})" data-toggle="modal" data-target="#message">
                  <span class="badge badge-primary badge-pill">message</span>
                </a>
              </li>`
              }
              else{
                data+=` <li class="list-group-item d-flex justify-content-between align-items-center">
                ${val[i].full_name}
                <a href="#">
                  <span class="badge badge-primary badge-pill">unread</span>
                </a>
              </li> `
              }
         
  
            if(i==val.length-1){
  
                $('#guardInMemoContainer').children().remove();
                $("#guardInMemoContainer").append(data)
            }
        }
    
   

  }


  function getMemoReply(id,guard_id){


    $.ajax({
      type: "get", url:`${domain}/api/v1/job/allMemoDetail?type=guardMessageOnly&id=${id}&guard_id=${guard_id}`,
      headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },
      dataType  : 'json',
      encode  : true,
    
      success: function (data) {
      
        $("#containerForGuardReply").text(data.data[0].message)
        $("#guardNameWithreply").text(data.data[0].full_name)
        $("#guardReplyDate").text(data.data[0].read_date)


      },
      error: function (request, status, error) {
        analyzeError(request)
      
      }
  });
  }


  function deleteMemo(memo_id){

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
    
        if (result.isConfirmed) {
          $.ajax({
            type: "post", url:`${domain}/api/v1/job/delete_memo`,
            dataType  : 'json',
            encode  : true,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
              memo_id     
            },
            success: function (data) {
        
               
              showModal(data.message)
              $j("#RegisterationSuccessFull").modal('show');
    
              setTimeout(() => {
                getAllMemo()
              }, 200);
              setTimeout(() => {
    
                $j("#RegisterationSuccessFull").modal('hide');
                      
              }, 3000);
               
            },
            error: function (request, status, error) {
        
                analyzeError(request)
             
            }
          });
        }
      
      })
    
    
    
    }