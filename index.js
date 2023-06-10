

/*
caseNumber: "S230SKAN"
date: "Mar 24, 2023, 5:03:24 PM"
fare: "₹ 0"
fromLocation: "Bellenduru spike lake"
status: "APPROVED"
toLocation: "KHB Colony, Basaveshwar Nagar, Bengaluru, Karnataka, India"
*/

//    http//localhost:3000/`${dataArray[i].caseNumber}

let containerEl = document.getElementsByClassName("grid-cont")[0];

//promise chaining
let data_arr = [];
function fetch_data() {

    fetch("https://gauravgitacc.github.io/postAppData/auctionData.json").then((response) => {
        return response.json();
    }).then((data) => {
        data_arr = data;
        // alert("set the data in sesson storage");

        sessionStorage.setItem("data_arr", JSON.stringify(data_arr));
        append_data_in_dom(data_arr);
    }).catch((err) => {
        console.log("err is:", err);
    })

}
if (sessionStorage.getItem("data_arr")) {
    // alert("fetching from sessIOnStorage")

    let new_arr = JSON.parse(sessionStorage.getItem("data_arr"));//get from session Storage
    append_data_in_dom(new_arr);
    data_arr = new_arr;
} else {
    // alert("fetching from API")
    fetch_data();//from api

}

function append_data_in_dom(arr) {
    containerEl.innerHTML = ""

    arr.forEach((obj, i) => {
        containerEl.innerHTML += `<div class="drig-child">
        <div class="up_card">
          <div>
              <div class="status ${obj.status}">${obj.status}</div>
              <div id="case">${obj.caseNumber}</div>
          </div>
          <div>${obj.date}</div>

        </div>

        <strong>${obj.fromLocation}</strong>
        <div>${obj.toLocation}</div>
        <div>${obj.fare}</div>
      </div>`

    })
}

document.querySelectorAll(".drig-child").forEach((card) => {
    card.addEventListener("click", () => {
        console.log(card.children[0].children[0].children[1].textContent.trim());

        let case_number=card.children[0].children[0].children[1].textContent.trim();

        // location.href = `http//localhost:5500/S230SKAN`;
        // location.href = `http//localhost:3000/${case_number}`;

    })
})


document.getElementById("searchId").addEventListener("input", (e) => {
    let inputStr = e.target.value.toLowerCase().trim();
    if (inputStr == "") return;

    let cardEl = document.querySelectorAll(".drig-child");
    for (let i = 0; i < cardEl.length; i++) {
        let add1El = cardEl[i].children[1];
        let add2El = cardEl[i].children[2];

        let add1 = add1El.textContent.toLowerCase().trim();
        let add2 = add2El.textContent.toLowerCase().trim();

        if (add1.includes(inputStr) || add2.includes(inputStr)) {
            cardEl[i].style.display = "";
        } else {
            cardEl[i].style.display = "none";
        }
    }

})