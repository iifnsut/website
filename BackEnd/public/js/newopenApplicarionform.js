
DecoupledEditor
    .create( document.querySelector( '#description' ) )
    .then( editor => {
        const toolbarContainer = document.querySelector( '#toolbar-container' );

        toolbarContainer.appendChild( editor.ui.view.toolbar.element );
    } )
    .catch( error => {
        console.error( error );
    } );

window.onload = function () {
    const form = document.getElementById("ApplicationForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData()
        // console.log(form.name.value);
        // console.log(e.target.name.value);
        // const formData = new FormData(e.target);
        formData.append("name", e.target.name.value);
        formData.append("link", e.target.link.value);
        formData.append("start", e.target.start.value);
        formData.append("deadline", e.target.end.value);
        formData.append("description", document.querySelector("#description").innerHTML);

        const response = await fetch("/admin/newApplicants?format=json", {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.status === 201) {
            form.reset();
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
}