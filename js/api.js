/**
 * Function To get tracked Item Property
 *
 */

// api url
const api_url = `https://bc-api.onrender.com/item/${
  window.location.href.split("=")[1]
}`;

async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  let d = false;
  try {
    // Storing data in form of JSON
    var data = await response.json();
    if (response.status === 200) {
      show(data);
      hideloader();
    } else {
      document.getElementById("loading").style.display = "block";
      d = true;
    }
  } catch (d) {
    console.log(d);
  }
}

// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<thead>
  <tr>
         <th>Customer</th>
            <th>Receiver</th>
            <th>Shipped From</th>
            <th>Shipping Id</th>
            <th>Destination</th>
            <th>Status</th>
            <th> Location</th>
            </tr>
  </thead>
            `;

  // Loop to access all rows

  if (data.status !== false) {
    tab += `<tbody>
     <tr> 
    <td>
          <div class="contact-container">
            <a href="#">${data.senderName}</a>
            <span>${data.shippingDate}</span>
            </div>
            </td>
            <td>
          <div class="contact-container">
            <a href="#">${data.recieverName}</a>
            <span>${data.recieverEmail}</span>
            </div>
            </td>
    <td>${data.comingFrom} </td>
    <td>${data.trackingNo} </td>
    <td>${data.recieverAddress} </td>
    <td>${data.status}</td>
    <td>${data.location || "----"}</td>
        
    
</tr>
    </tbody>
   `;
  } else {
    document.getElementById("error").innerHTML = "No Data Found";
  }

  // Setting innerHTML as tab variable
  document.getElementById("tabledata").innerHTML = tab;
}

/**
 * EOF To get tracked Item Property
 *
 */
