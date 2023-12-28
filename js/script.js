// Toggle Menu
const menuIcon = document.querySelector(".toggle-menu");
const nav = document.querySelector(".nav-bar");

menuIcon.addEventListener("click", () => {
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
    nav.classList.add("active");
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
    nav.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      form.submit();
    }
  });

  function validateForm() {
    let isValid = true;

    const name = form.querySelector("[name='name']").value;
    const birthDate = form.querySelector("[name='birth-date']").value;
    const city = form.querySelector("[name='city']").value;
    const nationality = form.querySelector("[name='nationality']").value;
    const sex = form.querySelector("[name='gender']").value;
    const phoneNumber = form.querySelector("[name='phone number']").value;
    const email = form.querySelector("[name='mail']").value;
    const experience = form.querySelector("[name='experience']").value;
    const skills = form.querySelector("[name='skills']").value;
    const englishLevel = form.querySelector("[name='english-level']").value;
    const educationLevel = form.querySelector("[name='education-level']").value;
    const workUnderPressure = form.querySelector("[name='work under pressure']").value;
    const aboutYourself = form.querySelector("[name='about yourself']").value;

    if (name.trim() === "") {
      showError("من فضلك، قم بإدخال اسمك.");
      isValid = false;
      return false;
    }

    if (birthDate.trim() === "") {
      showError("من فضلك، قم بإدخال تاريخ ميلادك.");
      isValid = false;
      return false;
    }

    if (city.trim() === "") {
      showError("من فضلك، قم بإدخال مدينتك.");
      isValid = false;
      return false;
    }

    if (nationality.trim() === "") {
      showError("من فضلك، قم بإدخال جنسيتك.");
      isValid = false;
      return false;
    }

    if (phoneNumber.trim() === "") {
      showError("من فضلك، قم بإدخال رقم هاتفك.");
      isValid = false;
      return false;
    } else if (!/^\d+$/.test(phoneNumber)) {
      showError("يجب أن يحتوي رقم الهاتف على أرقام فقط.");
      isValid = false;
      return false;
    }

    if (email.trim() === "") {
      showError("من فضلك، قم بإدخال بريدك الإلكتروني.");
      isValid = false;
      return false;
    } else if (!isValidEmail(email)) {
      showError("من فضلك، قم بإدخال عنوان بريد إلكتروني صالح.");
      isValid = false;
      return false;
    }
    return isValid;
  }

  function submitFormData() {
    const formData = new FormData(form);
    const endpoint = "https://api.web3forms.com/submit";
    const accessKey = "c0625a52-0cf9-4207-857e-1ec4ff6f9398";

    fetch(endpoint, {
      method: "POST",
      body: {...formData, access_key: accessKey, subject: "New Submission from ARDR GLOBAL"},
      headers: {
        ContentType: "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          console.log(data);
          throw new Error(`HTTP error! Error: ${data.message}`);
        }
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'تم إرسال النموذج الخاص بك بنجاح!',
        });
      })
      .catch(error => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'فشل في إرسال النموذج. الرجاء معاودة المحاولة في وقت لاحق.',
        });
      });
  }


  function showError(message) {
    Swal.fire({
      icon: 'error',
      title: 'خطأ...',
      text: message,
    });
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
