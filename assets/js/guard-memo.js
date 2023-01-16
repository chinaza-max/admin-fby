

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

});


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


        console.log(data)
        let guard_id_array2=[]
        for (let i = 0; i < data.data.length; i++) {
            
          guard_id_array2.push(data.data[i].id)
          if(i==data.data.length-1){
            upload(guard_id_array2,message,send_date )
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
  
        upload(data.data,message,send_date )

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
  
          console.log(data)
          console.log(data.message)
      /*
          setTimeout(() => {
                  hideModal()
          }, 3000);

          */
        
      },
      error: function (request, status, error) {
  
         
          console.log(request.responseJSON.status)
  
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