
DecoupledEditor
    .create( document.querySelector( '#description' ) )
    .then( editor => {
        const toolbarContainer = document.querySelector( '#toolbar-container' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    } )
    .catch( error => {
        console.error( error );
    } );

const createFormCheckbox = document.querySelector(".create-form");

createFormCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
        e.target.value = "true";
        document.querySelectorAll('.create-new-form').forEach((form) => {
            form.style.display = "block";
            form.querySelectorAll("input").forEach((input) => {
                input.required = true;
            }
            );
        });
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
    const image = document.querySelector(".image-preview img");
    console.log(e.target.value);
    image.src = e.target.value;
});

document.getElementById("newEventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    if (document.querySelector(".create-form").checked) {
        const description = document.querySelector("#description").innerHTML;
        formData.append("description", description);
    }
    const response = await fetch("/event?format=json", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
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
        document.querySelector("#description").innerHTML = "";
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

