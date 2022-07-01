const idPlaceholder = document.querySelector("#readOnlyInput");
const successAlert = document.querySelector(".alert-success");
const invalidAlert = document.querySelector(".alert-danger");
const submitText = document.querySelector(".submit-textbox");
const submitId = document.querySelector(".submit-uniqueid");
const submitbtn = document.querySelector("#clipit-submit");
const getbtn = document.querySelector("#clipit-retrieve");

document.querySelector(".copy-to-clipboard").addEventListener("click", () => {
    var copyText = document.querySelector(".modal-body").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Copied to clipboard!");
    });
})

submitbtn.addEventListener("click", async () => {
    submitbtn.setAttribute("disabled", "");
    const config = {
        url: '/tools/clipit/submit-data',
        method: 'post',
        data: {
            message: submitText.value,
        }
    }
    const res = await axios(config);
    const id = res.data.id;
    idPlaceholder.setAttribute("placeholder", id);
    submitText.innerText = "Paste your contents here.";
    submitbtn.removeAttribute("disabled");
    successAlert.classList.remove("hidden");
    setTimeout(() => {
        successAlert.classList.add("hidden");
    }, 10 * 1000);
})

getbtn.addEventListener("click", async () => {
    getbtn.setAttribute("disabled", "");
    const config = {
        url: '/tools/clipit/get-data',
        method: "post",
        data: {
            id: submitId.value
        }
    }
    const res = await axios(config);
    const message = res.data.message;
    if(message === -1){
        invalidAlert.classList.remove("hidden");
    }
    else{
        document.querySelector(".modal-body").innerHTML = message;
        $("#dataModal").modal("show");
        invalidAlert.classList.add("hidden");
    }
    submitId.value = "";
    getbtn.removeAttribute("disabled");
})
