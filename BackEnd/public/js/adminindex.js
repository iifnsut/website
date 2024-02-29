class AccessDetails {
    constructor(targetElement,url='/admin/access?format=json',) {
        this.url = url;
        this.targetElement = targetElement;

    }

    async getAccessDetails(email) {
       const target = document.getElementById(this.targetElement);
       console.log(target);
         target.innerHTML = `<div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;

        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) {
            console.log(data);
            target.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
            return 0;
        }else{
        return data;
        }
    }

    async updateAccessDetails(email, roles, status) {
        console.log(email, roles, status, 'update access');
        const target = document.getElementById(this.targetElement);
        target.innerHTML = `<div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;

        const response = await fetch(this.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, roles, status }),
        });
        const data = await response.json();
        if (!response.ok) {
            target.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
            return 0;
        }else{
        return data;
        }
    }

    async fetchUpdateAccessDetails(form) {
        console.log(form);
        const data = await this.updateAccessDetails(form.email.value, Array.from(
            form.roles).filter((role) => role.checked).map((role) => role.value), form.status.value);
        console.log(data);
        if (data) {
        await this.renderAccessDetails(form.email.value);
        }
    }

    async renderAccessDetails(email) {
        const data = await this.getAccessDetails(email);
        const target = document.getElementById(this.targetElement);
        console.log(data);
        if (data) {
        target.innerHTML = `
        <h4>Update Access</h4>
        <div id="">
        <form action="">
                <div class="row">
                  <div class="col-auto">
                    <div class="form-group">
                      <label for="accessname">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="accessname"
                        placeholder="Name"
                        name="name"
                        value="${data.name}"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="form-group">
                      <label for="accessmail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="accessmail"
                        placeholder="Email"
                        name="email"
                        value="${data.email}"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-auto">
                    <div class="form-group">
                      <label for="accessrole" class="form-check-label"
                        >Role :
                      </label>
                      <div id="accessrole" class="form-check-inline">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="aradmin"
                          name="roles"
                          value="admin"
                          ${data.roles.includes('admin') ? 'checked' : ''}
                        />
                        <label for="aradmin">Admin</label>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="aruser"
                          name="roles"
                          value="user"
                          checked
                          disabled
                        />
                        <label for="aruser" class="form-check-label"
                          >User</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-auto">
                    <div class="form-group-inline">
                      <label for="accessstatus" class="form-check-label"
                        >Status :
                      </label>
                      <select
                        class="form-select"
                        id="accessstatus"
                        name="status"
                      >
                        <option value="1" ${data.status===1 ? 'selected' : ''} >Active</option>
                        <option value="0" ${data.status===0 ? 'selected' : ''} >Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-auto">
                    <button type="reset" class="btn btn-secondary">
                      Reset
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Update
                    </button>
                    
                  </div>
                </div>
              </form>
        </div>
        `;
        const form = target.querySelector('form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.fetchUpdateAccessDetails(e.target);
        });

        }
    }
    
}

document.addEventListener('DOMContentLoaded', async () => {
    const accessDetails = new AccessDetails(targetElement="accessuserdata");
    const form = document.getElementById('accessSearch');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const data = await accessDetails.renderAccessDetails(email);
    });
});
