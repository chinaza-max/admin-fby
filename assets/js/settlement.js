






let getTableData='',
 getTableData2='',
  limit=15,
  offset=0,
  limit2=15,
  offset2=0;


$(document).ready(function(){


    //FOR UNSETTLED SHIFT
    getTableData=function ( limit,offset){
        console.log( limit,offset)
      $.ajax({
          type: "get", url:`${domain}/api/v1/job/getGeneralUnsettleShift?settlement=false&limit=${limit}&offset=${offset}`,
          headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
        
          success: function (data, text) {
  
              console.log(data.data)
              CreateTable(data.data)
              /*
              showModal("REGISTRATION SUCCESSFULL")
              setTimeout(() => {
                      hideModal()
              }, 3000);
  
              $("#signInButton").css("display","block")
              $("#loadingButton").css("display","none")
  
      */
          },
          error: function (request, status, error) {
  
              console.log(request)
              analyzeError(request)
           
          }
      });
    }
    getTableData(limit,offset)



    function CreateTable(val){
        let data=''
            
        console.log(val)
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
      getTableData2=function ( limit,offset){
        
        console.log( limit,offset)

        //Guard id here is not required
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/getAllUnsettleShiftOneGuard?settlement=true&limit=${limit}&offset=${offset}`,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                guard_id:1,
                settlement:true  
            },
          
            success: function (data, text) {
    
                console.log(data.data)
                CreateTable2(data.data)
                /*
                showModal("REGISTRATION SUCCESSFULL")
                setTimeout(() => {
                        hideModal()
                }, 3000);
    
                $("#signInButton").css("display","block")
                $("#loadingButton").css("display","none")
    
        */
            },
            error: function (request, status, error) {
    
                console.log(request)
                analyzeError(request)
             
            }
        });
      }

      getTableData2(limit2,offset2)
  
  
  
      function CreateTable2(val){
          let data=''
              
          console.log(val)
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
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/getAllUnsettleShiftOneGuard`,
        data: {
            guard_id,
            settlement:false  
        },
        success: function (data, text) {
    
            console.log(data)

            console.log(data.data)
            displayShift(data.data)
        
        },
        error: function (request, status, error) {
    
            console.log(request)
            console.log(status)
            console.log(error)
            console.log(request.responseJSON.status)
    
            analyzeError(request)
         
        }
      });
  }


  function displayShift(val){

        let data=''

        console.log(val)
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
              <button type="button" class="btn btn-primary" onclick="settleguard([${val[i].shedule_id}])">settle</button>
            </td>
          </tr>
            `

        if(i==val.length-1){
            console.log("dirty  dirty dirty dirtyvv dirtydirtydirty")


            $('#displayDetail').children().remove();
            $("#displayDetail").append(data)
            $('#view-detail').modal('show');
        }
    }
    if(val.length==0){
        console.log("cleaning cleaning cleaningcleaning cleaning")
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
        
                console.log(request)
                console.log(status)
                console.log(error)
                console.log(request.responseJSON.status)
        
                analyzeError(request)
             
            }
            
          });

  }


  //does so clean up 
  $('#view-detail').on("hide.bs.modal", function() {
    guard_id_been_viewed=''
})