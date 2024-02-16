// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if(event.submitter.value === "approved"){
          if(form.querySelector('input[name="pitchDate"]').value === ""){
            form.querySelector('input[name="pitchDate"]').setAttribute("required", true);
          }
        }else{
          form.querySelector('input[name="pitchDate"]').removeAttribute("required");
        }
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();


// Function for past date not allowed
const DateValidation = (date) => {
  var today = new Date();
  var inputDate = new Date(date);
  if(inputDate < today){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Past date not allowed!',
    });
    return false;
  }
  return true;
}

// const pitchDate = document.querySelector('input[name="pitchDate"]');
// pitchDate.addEventListener('change',()=>{
//   if(!DateValidation(pitchDate.value)){
//     pitchDate.value = "";
//   }
// })