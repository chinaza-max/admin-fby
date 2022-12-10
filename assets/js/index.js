//DASH BOARD
$.ajax({
    type: "get", url:`${domain}/api/v1/job/getDashBoardInfo`,
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
  
    success: function (data, text) {

        displayDashboardInfo(data.data)
 
    },
    error: function (request, status, error) {

       analyzeError(request)

    }
  });


function displayDashboardInfo(obj){

    console.log(obj)
    $("#customerNo").text(obj.noCustomer)
    $("#staffNo").text(obj.noStaff)
    $("#guardNo").text(obj.noGuard)
    $("#activeJobOn").text(obj.noActive)
}