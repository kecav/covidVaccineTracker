//Variable Section
let submitBtn = document.getElementById("submit");
let outputSection = document.getElementsByClassName("output-section")[0];
let messageSection = document.getElementsByClassName("message")[0];
let idate;
let session;
let apiResult;


//Array
let array1 = ["Center ID", "Name", "Address", "District", "Pincode", "Minimum Age", "Total available vaccine", "Available Dose 1", "Available Dose 2", "Fee Type", "Fee (₹)", "Vaccine", "Date", "From", "To"];
let array2 = ["center_id", "name", "address", "disctrict_name", "pincode", "min_age_limit", "available_capacity", "available_capacity_dose1", "available_capacity_dose2", "fee_type", "fee", "vaccine", "date", "from", "to"];

//Get date in format of API
function getDate() {
    idate = document.getElementById("input-date").value;
    let tempDate = idate.slice(8, 10) + "-" + idate.slice(5, 7) + "-" + idate.slice(0, 4);
    idate = String(tempDate);
    // console.log(idate);
}

//Getting response from API
async function getByPinCode() {
    getDate();
    let pincode = document.getElementById("input-pincode").value;
    const datapoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${idate}`;
    const response = await fetch(datapoint);
    session = await response.json();
    apiResult = session.sessions;
    console.log(session);
    getTable();
}

function getTable() {
    makeTable();
    // outputSection.innerHTML = session.sessions[0];
}

function makeTable() {

    //No of centers available
    let length = apiResult.length;
    console.log("Center :" + length);

    //If empty response
    if (length == 0) {
        messageSection.innerHTML = `<p class="failure">No response from center !<p>`;
        return;
    } else if (length == 1) {
        messageSection.innerHTML = `<p class="success">${length} center found !<p>`;
    } else {
        document.body.style.height = "auto";
        messageSection.innerHTML = `<p class="success">${length} centers found !<p>`;
    }


    //Each center iteration
    for (let i = 0; i < length; i++) {
        //Adding Table name
        let centerName = document.createElement("h3");
        centerName.setAttribute("class", "centerName");
        centerName.innerHTML = `CENTER ${i}`;
        outputSection.appendChild(centerName);

        //Creating Table for each center
        let table = document.createElement("table");
        table.setAttribute("class", `output-table table${i}`);
        outputSection.appendChild(table);

        //Each data of  center iteration
        for (let j = 0; j < 15; j++) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            td2.setAttribute("class", `${array2[j]}`);
            table.appendChild(tr);
            tr.appendChild(td1);
            tr.appendChild(td2);

            td1.setAttribute("class", "title");
            td1.innerHTML = array1[j];
            // td1.innerHTML = "Hello1";
            // td2.innerHTML = "Hello2";
            td2.innerHTML = apiResult[i][array2[j]];
        }
    }
}
submitBtn.addEventListener('click', () => {

    //Clearing previous data on each submission
    document.body.style.height = "100vh";
    messageSection.innerHTML = "";
    outputSection.innerHTML = "";

    //Calling next submission request
    getByPinCode();
});