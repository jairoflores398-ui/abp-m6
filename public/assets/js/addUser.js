const formAddUser = document.getElementById("form-add-user");
if (formAddUser) {
    formAddUser.addEventListener("submit", async (event) => {
        const loader = document.getElementById("loader");
        const btnsForm = document.getElementById("btns-form");
        const boxAlert = document.getElementById("box-alert");

        loader.classList.remove("d-none");
        btnsForm.classList.add("d-none");

        try {
            event.preventDefault();

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const response = await fetch("/api/users", requestOptions);
            const data = await response.json();

            if (response.status == 201) {
                formAddUser.reset();

                setTimeout(() => {
                    loader.classList.add("d-none");
                    btnsForm.classList.remove("d-none");

                    boxAlert.innerHTML = `<div class="alert alert-success mt-2 alert-dismissible fade show" role="alert" id="message-success">
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <p>${data.message}</p>
                            <p>ID: ${data.user.id}</p>
                        </div>
                        `;
                }, 1500);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error al intentar crear el usuario.");
        }
    });
}
