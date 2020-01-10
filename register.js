if("serviceWorker" in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register("sw.js")
    .then(()=>{
      console.log("Navigator Success");
    })
    .catch(err=>{
      console.log("Navigator Failed:",err);
    })
  })
};