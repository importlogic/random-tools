const idPlaceholder = document.querySelector("#readOnlyInput");
const successAlert = document.querySelector(".alert-success");
const invalidAlert = document.querySelector(".alert-danger");
const submitText = document.querySelector(".submit-textbox");
const submitId = document.querySelector(".submit-uniqueid");
history.replaceState(null, '', '/tools/clipit');


document.addEventListener("DOMContentLoaded", () => {
    if(id != -1){
        successAlert.classList.remove("hidden");
        idPlaceholder.setAttribute("placeholder", id);
        submitText.innerText = "Paste your contents here.";
    }
    
    if(failure == true){
        invalidAlert.classList.remove("hidden");
        submitId.setAttribute("placeholder", "Enter Unique ID");
    }
    
    if(success == true){
        document.querySelector(".modal-body").innerHTML = message;
        $("#dataModal").modal("show");
    }
});

document.querySelector(".copy-to-clipboard").addEventListener("click", () => {
    var copyText = document.querySelector(".modal-body").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Copied to clipboard!");
    });
})
