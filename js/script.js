// Toggle Menu
const menuIcon = document.querySelector(".toggle-menu");
const nav = document.querySelector(".nav-bar");
const apiURL = "https://ardr-tawzif-server.vercel.app";

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

  // get all jobs
  const jobsSelect = document.getElementById('jobsSelect');
  // Fetch all jobs from the server using Axios
  axios.get(`${apiURL}/all-jobs`)
    .then(response => {
      const jobs = response.data.data;
      // Add job IDs as options to the select element
      jobs.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        jobsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
    });

  // get sections
  const sectionsSelect = document.getElementById('sectionsSelect');
  // Fetch all sections from the server using Axios
  axios.get(`${apiURL}/all-sections`)
    .then(response => {
      const sections = response.data.data;
      // Add job IDs as options to the select element
      sections.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        sectionsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching sections:', error);
    });

  // submit form
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      submitFormData();
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
    } 
    // else if (!/^\d+$/.test(phoneNumber)) {
    //   showError("يجب أن يحتوي رقم الهاتف على أرقام فقط.");
    //   isValid = false;
    //   return false;
    // }

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
    const form = document.querySelector("form");
    const formDataObject = {
      name: form.querySelector("[name='name']").value,
      'birth-date': form.querySelector("[name='birth-date']").value,
      city: form.querySelector("[name='city']").value,
      nationality: form.querySelector("[name='nationality']").value,
      gender: form.querySelector("[name='gender']").value,
      'phone number': form.querySelector("[name='phone number']").value,
      mail: form.querySelector("[name='mail']").value,
      section: form.querySelector("[name='sectionsSelect']").value,
      job: form.querySelector("[name='jobsSelect']").value,
      experience: form.querySelector("[name='experience']").value,
      skills: form.querySelector("[name='skills']").value,
      'english-level': form.querySelector("[name='english-level']").value,
      'education-level': form.querySelector("[name='education-level']").value,
      'work under pressure': form.querySelector("[name='work under pressure']").value,
      'about yourself': form.querySelector("[name='about yourself']").value,
      'cv link': form.querySelector("[name='cv link']").value,
    };

    // Use Axios instead of Fetch
    axios.post(`${apiURL}/submit`, formDataObject)
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          console.log(data);
          throw new Error(`HTTP error! Error: ${data.message}`);
        }
        Swal.fire({
          icon: 'success',
          title: 'نجح ارسال طلبك',
          text: 'تم إرسال النموذج الخاص بك بنجاح!',
        });
        form.reset();
        // window.location.href = `${location.origin}/success.html`;
      })
      .catch((error) => {
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
