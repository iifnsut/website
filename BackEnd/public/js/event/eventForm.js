
DecoupledEditor
    .create( document.querySelector( '#description' ) )
    .then( editor => {
        let toolbarContainer = document.querySelector( '#toolbar-container' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    } )
    .catch( error => {
        console.error( error );
    } );

let createFormCheckbox = document.querySelector(".create-form");

createFormCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
        e.target.value = "true";
        document.querySelectorAll('.create-new-form').forEach((form) => {
            form.style.display = "block";
            form.querySelectorAll("input:not(#description input)").forEach((input) => {
                input.required = true;
            }
            );
        });
        document.querySelectorAll(".ck-hidden").forEach((input) => {
            input.required = false;
        }
        );
    }
    else {
        e.target.value = "false";
        document.querySelectorAll('.create-new-form').forEach((form) => {
            form.style.display = "none";
            form.querySelectorAll("input").forEach((input) => {
                input.required = false;
            }
            );
        });
    }
});

document.querySelector("#image-url").addEventListener("input", (e) => {
    let image = document.querySelector(".image-preview img");
    console.log(e.target.value);
    image.src = e.target.value;
});

document.getElementById("newEventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    let form = e.target;
    console.log(form)
    let formData = new FormData(form);
    if (document.querySelector(".create-form").checked) {
        let description = document.querySelector("#description").innerHTML;
        formData.append("description", description);
    }
    let checked = document.querySelector(".create-form").checked;
    formData.delete("formCreate");
    formData.append("formCreate", checked);
    for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }
    let response = await fetch("/event?format=json", {
        method: "POST",
        body: formData,
    });
    let data = await response.json();
    if (response.status === 201) {
        form.reset();
        document.querySelector(".image-preview img").src = "";
        document.querySelector(".create-form").checked = false;
        document.querySelectorAll('.create-new-form').forEach((form) => {
            form.style.display = "none";
            form.querySelectorAll("input").forEach((input) => {
                input.required = false;
            }
            );
        });
        let editor = document.querySelector("#description");
        for (let i = 0; i < editor.children.length; i++) {
            editor.children[i].remove();
        }

        Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }
});

