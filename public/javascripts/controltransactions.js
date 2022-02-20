var amount;
var reach;
var chooseReason;
let finishAnimation = false;
//logic part of the app

var btn_confirm = document.getElementById('btn-confirm');
var notvalidparameters = document.getElementById('notvalidparameters');

const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";
let abi = {};

web3 = new Web3(ethereum);

var x = $(window).width() - 400;

$('.choose').css('display', 'none'); //hiding the choose div

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

$('.donate form').on("click", function(){
  amount = $('input[name=amount]:checked', '#donAmount').val();
  reach = amount * 22;
  $('#confirm .amount').text("ETH" + amount);
  $('#check span').text("ETH" + amount);
  $('#confirm strong').text(reach + " voters");
});

$(".donate button").on("click", function(){
  $(".donate").toggleClass("active");
  if( $(".donate").is(".active") ) $("form").slideDown(450, "easeOutQuart");
  
  else $("form").slideUp(300, "easeInOutQuad");
});

$('.donate label').on("click", function(){
  setTimeout(function() {
    if (amount == "other"){
      $("#custom").css("margin-left", x/2);
$("#custom").css("margin-right", x/2);
      $('body').addClass('custom');
      $(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
        $("#custom").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
      });
    } 
    else {
      $('body').removeClass('custom');
      $(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
        $(".choose").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
      });
    }
  }, 150);
});

$('#custom .next').on("click", function(){
  amount = $('input[name=custom-amount]', '#customDonation').val();
  reach = amount * 22;
  $('#confirm .amount').text("ETH " + amount);
  $('#check span').text("ETH " + amount);
  $('#confirm strong').text(reach + " voters");
  $("#custom").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $(".choose").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
  });
});

$('#custom .back').on("click", function(){
  $("#custom").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $(".donate").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
});


$('.choose form').on("click", function(){
  chooseReason = $('input[name=choose-reason]:checked', '#chooseReason').val();
  $('#confirm .choose-reason').text("ETH " + amount);
  $('#check span').text("ETH " + amount);
  $('#confirm strong').text(reach + " voters");
});

$(".choose button").on("click", function(){
  $(".choose").toggleClass("active");
  if( $(".choose").is(".active") ) $("form").slideDown(450, "easeOutQuart");

  else $("form").slideUp(300, "easeInOutQuad");
});

$('.choose label').on("click", function(){
  $(".choose ").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $("#check").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
});

$('#check .back').on("click", function(){
  $("#check").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $(".choose").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
});


$("#check .next").on('click', async function(){
  $("#check").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $(".processing").fadeIn(1500, function(){
      $(".progress").animate({ width: "14em" }, 3500, "easeInOutCirc", function() {
        $( ".mask" ).hide("slide", { easing: "easeInQuart", direction: "right" }, 400);
      });
    });
  });

  await waitUntil(() => finishAnimation == true);
  setTimeout(function () { 
    $('.processing .message, .outer').fadeOut();
    $("#confirm").addClass('animated fadeInUp');
  }, 4000);
  });
  

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

        //setting up the contract with his address and abi
        var myContract = new web3.eth.Contract(abi, contractAddress);

        //sendig the transaction to the contract with the address of the person, the reason for the donation and the amount of the donation
       await myContract.methods.inviare(reason).send({
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
