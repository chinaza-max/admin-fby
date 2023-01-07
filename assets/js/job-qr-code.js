
getCardData='';
job_id=activeUserID




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
            success: function (data, text) {

                console.log(data)
                createCards(data.data)
               // updateTopContent(data.data)

            },

            error: function (request, status, error) {

                analyzeError(request)
             
            }
        });
    }

    getCardData()


    function createCards(val){


        console.log(val)
        let data=''
                
        if(val.length!=0){
            for(let i=0; i<val.length; i++){
                data+= `
                <div class="col-12 col-md-4">
                <div class="card department bg-light bg-gradient">
                  <img src="../assets/content/qr-code.png" class="card-img-top" width="400" height="250" alt="">
  
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
        $("#qr_code_container").append(`    <tr>
        <td colspan="1000">
        
        <div class="alert alert-light outline text-dark " role="alert" style="text-align:center;">
        YOU HAVE NO QR-code to print
      </div>
        </td>
      </tr>`)
      }


    }

});


function generateQRCode(code,mes,ope){


    console.log(code)

    let contentPrint=document.getElementById("contentPrint")
    let qrCodeContainer=document.getElementById("qrcode-2")
    let contentPrintMessage=document.getElementById("contentPrintMessage")

    qrCodeContainer.style.marginTop="90px"
    contentPrint.style.marginTop="90px"
    contentPrintMessage.style.marginTop="100px"


    new QRCode(qrCodeContainer,  {
        text:code,
        width: 300,
        height: 300,
        colorDark : "#5868bf",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
console.log(code,mes,ope)

    document.getElementById("operationDate").innerHTML="operation date : "+ope
    document.getElementById("message").innerHTML=mes
    document.getElementById("nameOfOrganization").innerHTML="FBY TEAM"
    document.getElementById("nameOfOrganization").innerHTML="FBY TEAM"






    //document.getElementById("allE").style.display="none"
    

    let allE=document.querySelectorAll(".allE")

    allE.forEach(element => {
            element.style.display="none"
    });
    

    window.print();

    location.reload();

    
   // document.body.innerHTML = originalContents;

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
            job_id      
          },
        success: function (data, text) {

            console.log(data)
           
        },

        error: function (request, status, error) {

            console.log(request)

            analyzeError(request)
         
        }
    });
}



