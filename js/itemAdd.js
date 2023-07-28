const api_url = `https://pcgseduporch.com/bc-api/add-to-track`;
class AddItem {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
    let self = this;
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      document.getElementById("submitBtn").disabled = true;
      var error = 0;
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);

        if (self.validateFields(input) == false) {
          error++;
        }
      });

      if (error == 0) {
        const senderName = document.querySelector(`#senderName`).value;
        const senderEmail = document.querySelector(`#senderEmail`).value;
        const senderPhone = document.querySelector(`#senderPhone`).value;
        const recieverAddress =
          document.querySelector(`#recieverAddress`).value;
        const recieverEmail = document.querySelector(`#recieverEmail`).value;
        const recieverName = document.querySelector(`#recieverName`).value;
        const shippingDate = document.querySelector(`#shippingDate`).value;
        const packageShipped = document.querySelector(`#packageShipped`).value;
        const senderAddress = document.querySelector(`#senderAddress`).value;
        const shippingDuration =
          document.querySelector(`#shippingDuration`).value;
        const comingFrom = document.querySelector(`#comingFrom`).value;
        // const loading = document.getElementById("loading");
        //do login api here
        // loading.style.display = "block";
        const response = await fetch(api_url, {
          body: JSON.stringify({
            senderEmail,
            senderName,
            senderPhone,
            recieverAddress,
            recieverEmail,
            recieverName,
            comingFrom,
            shippingDate,
            packageShipped,
            shippingDuration,
            senderAddress,
          }),
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.status === 200) {
          // loading.style.display = "none";
          let data = await response.json();
          //   console.log(data);

          showToast(data.message);
        }
      }
    });
  }

  validateFields(field) {
    // Swal.fire({
    //   title: "Error!",
    //   text: `${field.previousElementSibling.innerText} cannot be blank`,
    //   icon: "error",
    // });
    // //   errorMessage.innerText = message;

    // document.getElementById("submitBtn").disabled = false;
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error"
      );
      return false;
    } else {
      if (field.type == "password") {
        if (field.value.length < 8) {
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} must be at least 8 characters`,
            "error"
          );
          return false;
        } else {
          this.setStatus(field, null, "success");
          return true;
        }
      } else {
        this.setStatus(field, null, "success");
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status == "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.classList.remove("input-error");
    }

    if (status == "error") {
      console.log(message);
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
      //   errorMessage.innerText = message;

      document.getElementById("submitBtn").disabled = false;
      field.classList.add("input-error");
    }
  }
}
function showToast(txt) {
  Swal.fire({
    title: "Success",
    text: txt,
    icon: "success",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace("/index.html");
    }
  });
  //   setTimeout(function () {
  //     document.getElementById("toast").style.display = "none";
  //   }, 7000);
}

const form = document.querySelector(".loginForm");
if (form) {
  const fields = [
    "senderEmail",
    "senderName",
    "senderAddress",
    "recieverAddress",
    "senderPhone",
    "recieverName",
    "recieverEmail",
    "shippingDuration",
    "shippingDate",
    "comingFrom",
    "packageShipped",
  ];
  const validator = new AddItem(form, fields);
}
