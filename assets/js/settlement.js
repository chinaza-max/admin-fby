let getTableData='',
 getTableData2='',
  limit=15,
  offset=0,
  limit2=15,
  offset2=0;


$(document).ready(function(){

    //FOR UNSETTLED SHIFT
    $('#loader1').css("display","block");

    getTableData=function (limit,offset){
    
      $.ajax({
          type: "get", url:`${domain}/api/v1/job/getGeneralUnsettleShift?settlement=false&limit=${limit}&offset=${offset}`,
          headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          dataType  : 'json',
          encode  : true,
        
          success: function (data) {
 
            $('#loader1').css("display","none");

            CreateTable(data.data)
            
          },
          error: function (request, status, error) {
  
              $('#loader1').css("display","none");
              analyzeError(request)
           
          }
      });
    }
    getTableData(limit,offset)

    function CreateTable(val){
        let data=''
            
          for(let i=0; i<val.length; i++){
  
              data+= `<tr>
  
              <td>
              ${val[i].first_name}
            </td>
              <td>
              ${val[i].last_name}
              </td>
              <td>
              ${val[i].hours_worked}

  
              </td>
              <td>
              $${val[i].amount}
              </td>
            
              <td>
                <div class="actions">
                  <a href="#" onclick="getDetailOfShift(${val[i].id})"  class="btn btn-dark btn-sm btn-square rounded-pill" data-bs-toggle="modal"
                  data-bs-target="#view-detail"   >
                  <span class="btn-icon icofont-external-link"></span>
                  </a>
                  <button type="button" class="btn btn-outline-primary"  onclick="settleguard([${val[i].shedule_id}])">Settle</button>
                </div>
              </td>
            </tr>`
  
              if(i==val.length-1){
  
                  $('#mytable1').children().remove();
                  $("#mytable1").append(data)
              }
          }
          if(val.length==0){
            $('#mytable1').children().remove();
            $("#mytable1").append(`
            <td colspan="1000">
        
            <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
            YOU HAVE NO UNSETTLED SHIFT
          </div>
            </td>
          </tr>`)

        }
    }
  


    
      //FOR SETTLED SHIFT
      $('#loader2').css("display","block");

      getTableData2=function ( limit,offset){
        

        //Guard id here is not required for processing but must be 
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/getAllUnsettleShiftOneGuard?settlement=true&limit=${limit}&offset=${offset}`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                guard_id:1,
                settlement:true  
            },
          
            success: function (data) {
    
              $('#loader2').css("display","none");
              CreateTable2(data.data)
             
            },
            error: function (request, status, error) {
    
              $('#loader2').css("display","none");
              analyzeError(request)
             
            }
        });
      }

      getTableData2(limit2,offset2)

      function CreateTable2(val){
          let data=''
              
            for(let i=0; i<val.length; i++){
    
                data+= ` <tr> 
                <td class="nowrap">
                 ${val[i].site_name}
                </td>       
                <td class="nowrap">
                  ${val[i].first_name}   ${val[i].last_name}
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].start_date}
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].start_time}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_out_date}
                    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_out_time}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].Job_hours}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_in_date}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_in_time}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_out_date}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].check_out_time}
    
                  
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  ${val[i].hours_worked}
    
                  </div>
                </td>
                
                <td>
                  <div class="text-muted text-nowrap">
                  $${val[i].charge}
    
                  </div>
                </td>
                <td>
                  <div class="text-muted text-nowrap">
                  $${val[i].amount}
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-primary" onclick="settleguard([${val[i].shedule_id}])">Revert</button>
                </td>
              </tr>`
    
                if(i==val.length-1){
    
                    $('#mytable2').children().remove();
                    $("#mytable2").append(data)
                }
            }
            if(val.length==0){
              $('#mytable2').children().remove();
              $("#mytable2").append(`
              <td colspan="1000">
          
              <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
              YOU HAVE NO SETTLED SHIFT HERE
            </div>
              </td>
            </tr>`)
  
          }
      }
    


  })










//FOR UNSETTLED 

function Previous(){
    if(offset==0){
        $("#Previous").addClass("disabled");
    }
    else{
        $("#Previous").removeClass("disabled");
        offset=offset-(limit+1)
        getTableData(limit,offset)
        $(".page-item1").removeClass("active");
        $("#Previous").addClass("active");
  
    }
  }
  
  function Next(){
    offset=offset+limit+1
    getTableData(limit,offset)
    $(".page-item1").removeClass("active");
    $("#Next").addClass("active");
  
  }
  
  function page(val){
    if(val==1){
        offset=0
        $(".page-item1").removeClass("active");
        $("#page1").addClass("active");
    }
    else if(val==2){
        offset=16
        $(".page-item1").removeClass("active");
        $("#page2").addClass("active");
  
    }
    else if(val==3){
        offset=32
        $(".page-item1").removeClass("active");
        $("#page3").addClass("active");
    }
    
  
    
    getTableData(limit,offset)
  }
  
  
  
  //FOR SETTLED
  
  function Previous2(){
    if(offset2==0){
        $("#Previous2").addClass("disabled");
    }
    else{
        $("#Previous2").removeClass("disabled");
        offset2=offset2-(limit2+1)
        getTableData2(limit2,offset2)
        $(".page-item2").removeClass("active");
        $("#Previous2").addClass("active");
  
    }
  }
  
  function Next2(){
    offset2=offset2+limit2+1
    getTableData2(limit2,offset2)
    $(".page-item2").removeClass("active");
    $("#Next2").addClass("active");
  }
  
  function page2(val){
    if(val==1){
        offset2=0
        $(".page-item2").removeClass("active");
        $("#page12").addClass("active");
    }
    else if(val==2){
        offset2=16
        $(".page-item2").removeClass("active");
        $("#page22").addClass("active");
  
    }
    else if(val==3){
        offset2=32
        $(".page-item2 ").removeClass("active");
        $("#page32").addClass("active");
    }
    
    getTableData2(limit2,offset2)
  }
  
  
  let guard_id_been_viewed=''
  
  function getDetailOfShift(guard_id){
    guard_id_been_viewed=guard_id

    $('#loader3').css("display","block");
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/getAllUnsettleShiftOneGuard`,
        headers: {
          "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        dataType  : 'json',
        encode  : true,
        data: {
            guard_id,
            settlement:false  
        },
        success: function (data, text) {
    
          $('#loader3').css("display","none");

            displayShift(data.data)
        
        },
        error: function (request, status, error) {
    
          $('#loader3').css("display","none");

    
            analyzeError(request)
         
        }
      });
  }


  function displayShift(val){

        let data=''

        
    for(let i=0; i<val.length;i++){
        
            data+=`
            <tr> 
            <td class="nowrap">
             ${val[i].site_name}
            </td>       
            <td class="nowrap">
              ${val[i].first_name}   ${val[i].last_name}
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].start_date}
              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].start_time}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].end_date}
                
              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].end_time}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].Job_hours}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].check_in_date}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].check_in_time}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].check_out_date}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].check_out_time}

              
              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              ${val[i].hours_worked}

              </div>
            </td>
            
            <td>
              <div class="text-muted text-nowrap">
              $${val[i].charge}

              </div>
            </td>
            <td>
              <div class="text-muted text-nowrap">
              $${val[i].amount.toFixed(2)}
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-primary" onclick="settleguard([${val[i].shedule_id}])">Settle</button>
            </td>
          </tr>
            `

        if(i==val.length-1){

            $('#displayDetail').children().remove();
            $("#displayDetail").append(data)
            $('#view-detail').modal('show');
        }
    }
    if(val.length==0){
        $('#displayDetail').children().remove();
        $("#displayDetail").append(`
        <td colspan="1000">
        
            <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
            YOU HAVE NO UNSETTLED SHIFT
          </div>
            </td>
          </tr>`)
        $('#view-detail').modal('show');
    }

  }

  function settleguard(val){

        $.ajax({
            type: "post", url:`${domain}/api/v1/job/settleShift`,
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            dataType  : 'json',
            encode  : true,
            data: {
                schedule_id:JSON.stringify(val),
            },
            success: function (data, text) {
                
                getTableData(limit,offset)
                getTableData2(limit2,offset2)
                if(guard_id_been_viewed!=""){
                    getDetailOfShift(guard_id_been_viewed)
                }
                showModal(data.message)
                
                setTimeout(() => {
                    hideModal()
                }, 3000);
            
            },
            error: function (request, status, error) {
      
                console.log(request.responseJSON.status)
        
                analyzeError(request)
             
            }
            
          });

  }


  //does so clean up 
  $('#view-detail').on("hide.bs.modal", function() {
    guard_id_been_viewed=''
})