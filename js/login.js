const api_url = `https://pcgseduporch.com/bc-api/login`;
class Login {
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
        const username = document.querySelector(`#username`).value;
        const password = document.querySelector(`#password`).value;
        // const loading = document.getElementById("loading");
        //do login api here
        // loading.style.display = "block";
        const response = await fetch(api_url, {
          body: JSON.stringify({
            username,
            password,
          }),
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.status === 200) {
          localStorage.setItem("auth", 1);

          let data = await response.json();
          // loading.style.display = "none";
          showToast(data.message);
          // window.location.replace("/pages/dashboard.html");
        }
      }
    });
  }

  validateFields(field) {
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
      window.location.replace("/pages/dashboard.html");
    }
  });
  //   setTimeout(function () {
  //     document.getElementById("toast").style.display = "none";
  //   }, 7000);
}

const form = document.querySelector(".loginForm");
if (form) {
  const fields = ["username", "password"];
  const validator = new Login(form, fields);
}
