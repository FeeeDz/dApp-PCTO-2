var amount;
var reach;
var chooseReason;
let finishAnimation = false;
//logic part of the app

var btn_confirm = document.getElementById('btn-confirm');
var notvalidparameters = document.getElementById('notvalidparameters');

const contractAddress = "0x441fC9267F20904A7872ab95790913955d2019F5";
let abi = {};

web3 = new Web3(ethereum);

var x = $(window).width() - 400;

//function that wait wuntil the variable becomes true, used for the final animation of the donation
const waitUntil = (condition) => {
  return new Promise((resolve) => {
      let interval = setInterval(() => {
          if (!condition()) {
              return
          }

          clearInterval(interval)
          resolve()
      }, 100)
  })
}

async function getAbiContract(){
  await fetch("https://krypto-medical.herokuapp.com/api/v1/getabi")
  .then((res) => res.json())
  .then((data) => {abi = data.abi;} )
  .catch((error) => {console.log(error); });
}

//function that init the transaction where you can send ethereum to the contract
//choosing the reason for the donation the string will be passed in input to the function of the contract
//and automatically the contract send the money to the wallet dedicated to the specific reason choiced
btn_confirm.addEventListener('click', async function() {
    //get the reason for the donation and the amount of the donation
    var reason = chooseReason;
    var quantityOfEthereum = amount;
    //check for non valid parameter passed

    if(quantityOfEthereum === "") alert("valore non corretto")

    else{
        //converting the quantity in ethereum in wei and adding a "0x" to let understand metamask that i'm passing a hexadecimal number
        let quantityInWei = BigNumber(quantityOfEthereum).multipliedBy(10 ** 18);

        //getting the address of the person by the cookie
        //doing this because when the user is redirected to the logged page i can't access the account address with the web3 functions
        const fromAddress = window.ethereum.selectedAddress;

        await getAbiContract();
        console.log(reason);
        //setting up the contract with his address and abi
        var myContract = new web3.eth.Contract(abi, contractAddress);

        //sendig the transaction to the contract with the address of the person, the reason for the donation and the amount of the donation
       await myContract.methods.sendc(reason).send({
            from: fromAddress,
            to: contractAddress,
            value: "0x" + quantityInWei.toString(16),
            gas: "50000"
        },).then((response) => {
            finishAnimation = true;            
        })
        .catch((err => {
          console.log("errore");
        })); 
    }
});
