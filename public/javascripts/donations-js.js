var amount;
var reach;

var x = $(window).width() - 400;
$('.choose').css('display', 'none');

$('.donate form').on("click", function(){
  amount = $('input[name=amount]:checked', '#donAmount').val();
  reach = amount * 22;
  $('#confirm .amount').text("ETH" + amount);
  $('#check span').text("ETH" + amount);
  $('#confirm strong').text(reach + " voters");
});

$(".donate button").on("click", function(){
  $(".donate").toggleClass("active");
  if( $(".donate").is(".active") ) {
    $("form").slideDown(450, "easeOutQuart");
  } else {
    $("form").slideUp(300, "easeInOutQuad");
  }
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
    } else {
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
  console.log(chooseReason);
  $('#confirm .choose-reason').text("ETH " + amount);
  $('#check span').text("ETH " + amount);
  $('#confirm strong').text(reach + " voters");
});

$(".choose button").on("click", function(){
  $(".choose").toggleClass("active");
  if( $(".choose").is(".active") ) {
    $("form").slideDown(450, "easeOutQuart");
  } else {
    $("form").slideUp(300, "easeInOutQuad");
  }
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

$("#check .next").on('click', function(){
  $("#check").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $(".processing").fadeIn(1500, function(){
      $(".progress").animate({ width: "14em" }, 3500, "easeInOutCirc", function() {
        $( ".mask" ).hide("slide", { easing: "easeInQuart", direction: "right" }, 400);
      });
    });
  });
  
  setTimeout(function() {
    $('.processing .message, .outer').fadeOut();
    $("#confirm").addClass('animated fadeInUp');
  }, 6250);
});