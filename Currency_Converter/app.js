const BASE_URL= "https://v6.exchangerate-api.com/v6/26bd18ea4c73f6f8f989842a/latest"
const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for (let select of dropdown) {
  for (currCode in countryList) {
    // console.log(code,countryList[code]);
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
   newOption.value=currCode;
   if(select.name==="from"&& currCode=='USD'){
       newOption.selected='selected';
   }
   else if(select.name==="to" && currCode=="INR"){
       newOption.selected='selected';
   }
    select.append(newOption);
  }
  //evt=>event object 
  select.addEventListener("change",(evt)=>{
          updateFlag(evt.target);//target->where is a change
  })
}
//updateExchangerate
const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    //console.log(amount);
    let amountVal=amount.value;
    //console.log(amountVal);
    if(amountVal===" "||amountVal<1)
    {
        amountVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response=await fetch(URL);//return promise
    //console.log(response);//well work-200ok
    let data=await response.json();
    //console.log(data.conversion_rates[toCurr.value]);
    let rate=data.conversion_rates[toCurr.value];
    //console.log(rate);
    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value}=${finalAmount}${toCurr.value}`;//`1USD=80INR`
}
//For changing the flag:
const updateFlag=(element)=>{
   // console.log(element);
   let currCode=element.value;
  // console.log(currCode);
   let countryCode=countryList[currCode];//countryList[INR]=IN
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//From this if we refresh the page no url change all work is prevent and we will do our own..
    updateExchangeRate();

});
window.addEventListener("load",()=>{
    updateExchangeRate();
})



