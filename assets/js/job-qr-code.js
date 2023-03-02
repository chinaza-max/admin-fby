getCardData='';
job_id=activeJobID

let myCoor
  
getLatAndLon(function(latLon) {
  myCoor= latLon;
})



$(document).ready(function(){

    getCardData=function (){
        $.ajax({
            type: "post", url:`${domain}/api/v1/job/allJobs/security_code`,
            dataType  : 'json',
            encode  : true,
            headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            data: {
                job_id      
              },
            success: function (data) {
                createCards(data.data)
            },

            error: function (request, status, error) {

                analyzeError(request)
             
            }
        });
    }

    getCardData()


    function createCards(val){


        let data=''
                
        if(val.length!=0){
            for(let i=0; i<val.length; i++){
                data+= `
                <div class="col-12 col-md-4">
                <div class="card department bg-light bg-gradient">
                  <img src="assets/content/qr-code.png" class="card-img-top" width="400" height="250" alt="">
  
                  <div class="card-body">
                    <h3 class="h6 mt-0" id="date">Date : ${val[i].operation_date}</h3>
  
                    <div class="team d-flex align-items-center mb-4" id="ima">
                      <strong class="me-3">Team:</strong>
                     
                        <div id="image${i}">
                           
                        </div>

                    </div>
  
                    <p id="message"> ${val[i].message}</p>
                
                    <div class="button-box pb-2">
                      <button type="button" class="btn btn-outline-primary"
                       onclick="generateQRCode('${val[i].security_code}','${val[i].message}','${val[i].operation_date}')">
                        Print<span class="btn-icon icofont-prescription ms-2"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>                   
                 `

                if(i==val.length-1){
                    $('#qr_code_container').children().remove();
                    $("#qr_code_container").append(data)
                }
            }


            for(let k=0; k<val.length; k++){
                 
                let data2=''
                $(`#image${k}`).empty();
           
                for(let m=0; m<val[k].image.length; m++){
                    data2+= `
                
                        <img src="${val[k].image[m]}" width="40" height="40" alt="" class="team-img rounded-500">
                                       
                     `
    
                    if(m==val.length-1){
                        $(`#image${k}`).children().remove();
                        $(`#image${k}`).append(data2)
                    }
                }
    
            }

          



        }else{

        $('#qr_code_container').children().remove();
        $("#qr_code_container").append(`
        
        <div class="alert alert-light outline text-dark col-12" role="alert" style="text-align:center;">
        YOU HAVE NO QR-CODE TO PRINT 
      </div>
     `)
      }


    }

});


function generateQRCode(code,mes,ope){

    let contentPrint=document.getElementById("contentPrint")
    let qrCodeContainer=document.getElementById("qrcode-2")
    let contentPrintMessage=document.getElementById("contentPrintMessage")

    qrCodeContainer.style.marginTop="90px"
    contentPrint.style.marginTop="90px"
    contentPrintMessage.style.marginTop="100px"


    new QRCode(qrCodeContainer,  {
        text:code,
        width: 650,
        height: 650,
        colorDark :  "#5868bf",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });


    document.getElementById("contentPrintMessage").style.marginTop ="90%"

    ///document.getElementById("operationDate").style.marginTop ="50px"

    document.getElementById("operationDate").innerHTML="Operation date : "+ope
    document.getElementById("message").innerHTML=mes
    document.getElementById("nameOfOrganization").innerHTML="FBY TEAM"    
    let allE=document.querySelectorAll(".allE")

    allE.forEach(element => {
        element.style.display="none"
    })
    
    window.print();
    location.reload();
}


function confirmLocation(){
    $.ajax({
        type: "post", url:`${domain}/api/v1/job/check_position_qr_code`,
        dataType  : 'json',
        encode  : true,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        data: {
            latitude: Number(myCoor.lat).toFixed(8),
            longitude: Number(myCoor.lon).toFixed(8),
            job_id      
          },
        success: function (data) {

            Swal.fire({
                icon: 'success',
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        },

        error: function (request, status, error) {
            analyzeError(request)
        }
    });
}



