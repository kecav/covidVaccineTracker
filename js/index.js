//Variable Section
let submitBtn = document.getElementById("submit");
let idate;
//Calling API and storing in a variable
let myjson1;
let myjson2;
let session;
let apiResult;

async function getByPinCode() {
    getDate();
    let pincode = document.getElementById("input-pincode").value;
    const datapoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${idate}`;
    const response = await fetch(datapoint);
    session = await response.json();
    apiResult = session.sessions[0];
    console.log(apiResult);
    getTable();
}

function getDate() {
    idate = document.getElementById("input-date").value;
    let tempDate = idate.slice(8, 10) + "-" + idate.slice(5, 7) + "-" + idate.slice(0, 4);
    idate = String(tempDate);
    // console.log(idate);
}

function getTable() {

    document.getElementById("slots").innerHTML = "";
    if (apiResult) {
        document.getElementById("name").innerText = apiResult.name;
        document.getElementById("available_capacity").innerText = apiResult.available_capacity;
        document.getElementById("available_capacity_dose1").innerText = apiResult.available_capacity_dose1;
        document.getElementById("available_capacity_dose2").innerText = apiResult.available_capacity_dose2;
        document.getElementById("center_id").innerText = apiResult.center_id;
        document.getElementById("date").innerText = apiResult.date;
        document.getElementById("fee").innerText = apiResult.fee;
        document.getElementById("min_age_limit").innerText = apiResult.min_age_limit + "+";
        document.getElementById("pincode").innerText = apiResult.pincode;
        document.getElementById("vaccine").innerText = apiResult.vaccine;
        document.getElementById("address").innerText = apiResult.address;
        document.getElementById("from").innerText = apiResult.from;
        document.getElementById("to").innerText = apiResult.to;
        document.getElementById("district").innerText = apiResult.district_name;
        for (let i = 0; i < apiResult.slots.length; i++) {
            document.getElementById("slots").innerHTML += apiResult.slots[i] + "<br>";
        }
    } else {
        document.getElementsByClassName("output-section")[0].innerHTML = "No Records";
    }
};

submitBtn.addEventListener('click', () => {
    document.getElementsByClassName("output-section")[0].style.display = "block";
    if (document.getElementById("input-pincode").value.length == 6) {
        getByPinCode();
    } else {
        document.getElementsByClassName("output-section")[0].innerHTML = '<h4 style="color: red">Invalid PinCode </h4><br><p>Please Refresh the page</p>';
    }
});