const myApi = `https://pcgseduporch.com/bc-api/item`;

let trackData;

async function getItem() {
  const response = await fetch(myApi); // make HTTP request
  const data = await response.json();
  trackData = data;
  show(data);

  for (let i = 0; i < data.length; i++) {
    var status = document.getElementById(`select-${i}`);
    if (data[i].status === "Pending") {
      status.options[0].setAttribute("selected", true);
    } else if (data[i].status === "Shipped") {
      status.options[1].setAttribute("selected", true);
    } else if (data[i].status === "Delivered") {
      status.options[2].setAttribute("selected", true);
    } else if (data[i].status === "Canceled") {
      status.options[3].setAttribute("selected", true);
    } else {
      status.options[4].setAttribute("selected", true);
    }
  }
}

async function updateStatus(index) {
  var status = document.getElementById(`select-${index}`);
  var selectedValue = status.options[status.selectedIndex].value;
  console.log(selectedValue);
  const response = await fetch(
    `https://pcgseduporch.com/bc-api/item/${trackData[index].trackingNo}`,
    {
      method: "post", // make a PUT request to update data
      body: JSON.stringify({ status: selectedValue }), // request body
      headers: { "Content-Type": "application/json" }, // request headers
    }
  );

  if (response.ok) {
    const data = await response.json(); // parse response body as JSON
    showToast(data.message); // update HTML content
    console.log(data);
  } else {
    console.log("Failed to update data");
  }
}

async function updateLocation(index) {
  var location = document.getElementById(`location-${index}`).value;
  document.getElementById(`updateBtn-${index}`).disabled = true;
  const response = await fetch(
    `https://pcgseduporch.com/bc-api/item/${trackData[index].trackingNo}`,
    {
      method: "post", // make a PUT request to update data
      body: JSON.stringify({ location }), // request body
      headers: { "Content-Type": "application/json" }, // request headers
    }
  );

  if (response.ok) {
    const data = await response.json(); // parse response body as JSON
    showToast(data.message); // update HTML content
    document.getElementById(`updateBtn-${index}`).disabled = false;

    console.log(data);
  } else {
    console.log("Failed to update data");
  }
}
function showToast(txt) {
  Swal.fire({
    title: "Success",
    text: txt,
    icon: "success",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}
function show(data) {
  if (data.length) {
    let tab = `<thead>
  <tr>
         <th>Customer</th>
            <th>Receiver</th>
            <th>Shipped From</th>
            <th>Shipping Id</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Location</th></tr>
  </thead>
            `;

    // Loop to access all rows
    for (let index = 0; index < data.length; index++) {
      tab += `<tbody>
     <tr> 
    <td>
          <div class="contact-container">
            <a href="#">${data[index].senderName}</a>
            <span>${data[index].shippingDate}</span>
            </div>
            </td>
            <td>
          <div class="contact-container">
            <a href="#">${data[index].recieverName}</a>
            <span>${data[index].recieverEmail}</span>
            </div>
            </td>
    <td>${data[index].comingFrom} </td>
    <td>${data[index].trackingNo} </td>
    <td>${data[index].recieverAddress} </td>
    <td>
     <select name="" id='select-${index}' onchange="updateStatus(${index})">
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Hold (Your goods has been seized- Please contact: - (956) 332-2899 or email:  Bluecargocourierexpress@fastservice.com)">On Hold </option>
                      </select>
   </td>
    <td class="tabled">
    <input id="location-${index}" value="${data[index].location}" placeholder="enter current location of goods" />
    <button id="updateBtn-${index}" onclick="updateLocation(${index})">Update</button>
    </td>
</tr>
    </tbody>
   `;
    }

    // Setting innerHTML as tab variable
    document.getElementById("data").innerHTML = tab;
  } else {
    let tab = `<thead>
  <tr>
         <th>Customer</th>
            <th>Receiver</th>
            <th>Shipped From</th>
            <th>Shipping Id</th>
            <th>Destination</th>
            <th>Status</th></tr>
  </thead>
            `;
    document.getElementById("data").innerHTML = tab;
    document.getElementById("error").innerHTML = "No Record Found";
  }
}

getItem();
