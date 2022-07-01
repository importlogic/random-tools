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
    const config = {
        url: '/tools/clipit/submit-data',
        method: 'post',
        data: {
            message: submitText.value,
        }
    }
    const res = await axios(config);
    const id = res.data.id;
    successAlert.classList.remove("hidden");
    idPlaceholder.setAttribute("placeholder", id);
    submitText.innerText = "Paste your contents here.";
})

getbtn.addEventListener("click", async () => {
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
        submitId.setAttribute("placeholder", "Enter Unique ID");
    }
    else{
        document.querySelector(".modal-body").innerHTML = message;
        $("#dataModal").modal("show");
    }
})
