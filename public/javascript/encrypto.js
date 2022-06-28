const encryptFormFile = document.querySelector(".encrypto-file-encrypt");
const decryptFormFile = document.querySelector(".encrypto-file-decrypt");

function validateFileTypeEncrypt(){
  var ext = encryptFormFile.value.match(/\.([^\.]+)$/);
  if(ext == undefined){
    document.querySelector("#encrypt-submit").classList.add("disabled");
    document.querySelector("#encrypto-alert").classList.remove("hidden");
    encryptFormFile.value = '';
    return false;
  }
  else ext = ext[1];
  switch (ext) {
    case 'jpeg':
    case 'jpg':
    case 'png':
      document.querySelector("#encrypt-submit").classList.remove("disabled");
      document.querySelector("#encrypto-alert").classList.add("hidden");
      return true;
    default:
      document.querySelector("#encrypt-submit").classList.add("disabled");
      document.querySelector("#encrypto-alert").classList.remove("hidden");
      encryptFormFile.value = '';
      return false;
    }
} 

function validateFileTypeDecrypt(){
  var ext = decryptFormFile.value.match(/\.([^\.]+)$/);
  if(ext == undefined){
    document.querySelector("#decrypt-submit").classList.add("disabled");
    document.querySelector("#encrypto-alert-two").classList.remove("hidden");
    decryptFormFile.value = '';
    return false;
  }
  else ext = ext[1];
  console.log(ext);
  switch (ext) {
    case 'png':
      document.querySelector("#decrypt-submit").classList.remove("disabled");
      document.querySelector("#encrypto-alert-two").classList.add("hidden");
      return true;
    default:
      document.querySelector("#decrypt-submit").classList.add("disabled");
      document.querySelector("#encrypto-alert-two").classList.remove("hidden");
      decryptFormFile.value = '';
      return false;
    }
} 

encryptFormFile.addEventListener("change", validateFileTypeEncrypt);
decryptFormFile.addEventListener("change", validateFileTypeDecrypt);

document.querySelector(".encrypto-encrypt-btn").addEventListener("click", () => {
  document.querySelector(".encrypto-main").classList.add("hidden");
  document.querySelector("#encrypto-encrypt-form").classList.remove("hidden");
});

document.querySelector(".encrypto-decrypt-btn").addEventListener("click", () => {
  document.querySelector(".encrypto-main").classList.add("hidden");
  document.querySelector("#encrypto-decrypt-form").classList.remove("hidden");
});

document.querySelector("#encrypt-submit").addEventListener("click", () => {
  if(validateFileTypeEncrypt()) {
    document.querySelector("#encrypto-encrypt-form").submit();
    document.querySelector("#encrypto-encrypt-form").reset();
  }
});

document.querySelector("#decrypt-submit").addEventListener("click", () => {
  if(validateFileTypeDecrypt()) document.querySelector("#encrypto-decrypt-form").submit();
  if(validateFileTypeDecrypt()) document.querySelector("#encrypto-decrypt-form").reset();
});





