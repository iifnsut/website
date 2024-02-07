(() => {
    "use strict";
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
           const fromList = document.querySelectorAll(`#${form.id}`)[0];
           for (let i = 0; i < fromList.length; i++) {
               console.log(fromList[i]);
               if (!fromList[i].checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              fromList[i].parentElement.classList.add("was-validated");
            }
  
          
        },
        false
      );
    });
  })();
  


const addData = (id, data, name, type = "hidden") => {
  const list = document.getElementById(id);
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex align-items-center");
  const div = document.createElement("div");
  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-danger mx-2");
  const i = document.createElement("i");
  i.setAttribute("class", "fa-solid fa-trash");
  button.appendChild(i);
  button.onclick = () => {
    list.removeChild(li);
  };
  div.setAttribute(
    "class",
    "flex-row d-flex align-items-center justify-content-between flex-row"
  );
  const nameInput = document.createElement("input");
  nameInput.setAttribute("class", "form-control-plaintext");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("form", "applicationForm");
  nameInput.setAttribute("value", data.name.value);
  nameInput.setAttribute("readonly", "readonly");
  nameInput.setAttribute("required", true);
  if (type === "file") {
    nameInput.setAttribute("name", `${name}Name`);
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", `${name}File`);
    fileInput.setAttribute("accept", ".pdf,.doc,.docx");
    fileInput.setAttribute("required", true);
    fileInput.setAttribute("class", "form-control-file");
    fileInput.setAttribute("form", "applicationForm");
    fileInput.style.display = "none";
    fileInput.files = data.file.files;
    div.appendChild(fileInput);
  } else {
    nameInput.setAttribute("name", `${name}`);
  }
  div.appendChild(nameInput);
  div.appendChild(button);
  li.appendChild(div);
  list.appendChild(li);
};
document.getElementById("addMember").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target.checkValidity());
  if(event.target.checkValidity()){

  addData("teamList", event.target, "team");
  event.target[0].value = "";
  }
});
document.getElementById("addDocument").addEventListener("submit", (event) => {
  event.preventDefault();
  if(event.target.checkValidity()){
  addData("documentList", event.target, "file", "file");
  event.target[0].value = "";
  event.target[1].value = null;
    }
});

// document.getElementById('applicationForm').
//   addEventListener('submit', (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     fetch('/api/application', {
//       method: 'POST',
//       body: data
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   });

function displaySelectedImage(event, elementId) {
  const selectedImage = document.getElementById(elementId);
  const fileInput = event.target;

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}
