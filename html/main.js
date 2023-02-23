var categoryID = 0
var currentCategory = 1
var categoryPage = 1
var currentMethod = "cash"
var totalCost = 0

$(function() {
    window.addEventListener('message', function(event) {
        var item = event.data
        if (item.type == "open") {
          $("html").css("display", "block");
          
          div = `<div class="market-textArea">`+item.title+`<b id="market-text">market</b></div>`
          $("#market-title").append(div)
          $("#market-text").text(item.text);


        }
      if (item.type == "addCategory") {
        if(categoryID == 8) {
          currentCategory++
          categoryID = 0
        }
        div = `<li id="category_`+item.name+`" onclick="selectCategory('`+item.name+`')" class="category_`+currentCategory+` categoryList">`+item.name+`</li>`
        $("#categoryList").append(div)
        categoryID++
      }
      if (item.type == "addItem") {
        div = `<div class="store__content_items-item `+item.category+`">
        <h1>`+item.label+`</h1>
        <h2>`+formatBalance(item.price)+`</h2>
        <img src="`+item.image+`" alt="">
        <h3>`+item.desc+`</h3>
        <button onclick="addBasket('`+item.name+`', '`+item.label+`')">Buy</button>
    </div>`
    $(".store__content_items").append(div)
      }
      if (item.type == "addList") {
        div = `<li id="itemlist_`+item.name+`" class="store__cart_item">
        <div class="store__cart_item-icon"><img src="`+item.image+`"></div>
        <div class="store__cart_item-info">
            <h1>`+item.label+` <b id="`+item.name+`_amount">(`+item.amount+`)</b></h1>
            <div class="store__cart_item-info_buttons">
                <button onclick="addAmount('`+item.name+`')">+</button>
                <button onclick="removeAmount('`+item.name+`')">-</button>
                <button onclick="deleteItem('`+item.name+`')"><img src="./assets/img/bin.svg" alt=""></button>
            </div>
        </div>
    </li>`
        $("#basket").append(div)
        totalCost = totalCost+item.price
        $("#totalCost").text(formatBalance(totalCost));
      }
      if (item.type == "addAmount") {
        totalCost = totalCost+item.price
        $("#totalCost").text(formatBalance(totalCost));
        document.getElementById(item.name+'_amount').innerHTML = "("+item.amount+")"
      }
      if (item.type == "removeAmount") {
        totalCost = totalCost-item.price
        $("#totalCost").text(formatBalance(totalCost));
        document.getElementById(item.name+'_amount').innerHTML = "("+item.amount+")"
      }
      if (item.type == "removeItem") {
        totalCost = totalCost-item.price
        $("#totalCost").text(formatBalance(totalCost));
        document.getElementById('itemlist_'+item.name).remove()
      }
      if (item.type == "updateMoney") {
        $("#myMoney").text(formatBalance(item.money ));
      }
      if (item.type == "close") {
        exit()
      }
    })
})

function nextCategory() {
  if(currentCategory >= categoryPage+1) {
    console.log("11")
    categoryPage++
    document.querySelectorAll(".categoryList").forEach(function(a){a.style.display = "none"})
    document.querySelectorAll(".category_"+categoryPage).forEach(function(a){a.style.display = "block"})
}
else {
  categoryPage = 1
  document.querySelectorAll(".categoryList").forEach(function(a){a.style.display = "none"})
  document.querySelectorAll(".category_"+categoryPage).forEach(function(a){a.style.display = "block"})
}
}

function backCategory() {
  if(categoryPage-1 > 0) {
    categoryPage--
    document.querySelectorAll(".categoryList").forEach(function(a){a.style.display = "none"})
    document.querySelectorAll(".category_"+categoryPage).forEach(function(a){a.style.display = "block"})
}
}


function formatBalance(balance) {
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
 return formatter.format(balance)   
}

function addBasket(item, label) {
  $.post('https://devine_shop/addbasket', JSON.stringify ({
      name: item,
      label: label
  }));
}

function addAmount(item) {
  $.post('https://devine_shop/addAmount', JSON.stringify ({
      name: item
  }));
}

function removeAmount(item) {
  $.post('https://devine_shop/removeAmount', JSON.stringify ({
      name: item
  }));
}

function deleteItem(item) {
  $.post('https://devine_shop/deleteItem', JSON.stringify ({
    name: item
}));
}

function selectMethod(method) {
  currentMethod = method
  console.log(method)
  if(method == "cash") {
    document.getElementById('cash').src = "./assets/img/cash.svg"
    document.getElementById('bank').src = "./assets/img/bank.svg"
  }
  else {
    document.getElementById('bank').src = "./assets/img/credit.svg"
    document.getElementById('cash').src = "./assets/img/cash_white.svg"
  }

}

function buy() {
  $.post('https://devine_shop/buy', JSON.stringify ({
    totalCost: totalCost,
    method: currentMethod
}));
}

function exit() {
  categoryID = 0
  currentCategory = 1
  categoryPage = 1
  currentMethod = "cash"
  totalCost   = 0

  $("html").css("display", "none");
  document.querySelectorAll(".categoryList").forEach(function(a){a.remove()})
  document.querySelectorAll(".store__content_items-item").forEach(function(a){a.remove()})
  document.querySelectorAll(".store__cart_item").forEach(function(a){a.remove()})
  document.querySelectorAll(".market-textArea").forEach(function(a){a.remove()})

  totalCost = 0
  $("#totalCost").text(formatBalance(totalCost));
  $.post('https://devine_shop/exit', JSON.stringify ({}));

}

$(document).on('keydown', function() {
  switch (event.keyCode) {
    case 27:
      exit()
    break;
  }
});


function selectCategory(category) {
  $( ".categoryList" ).removeClass( "active" ).addClass( "yourClass" );
  $( "#all" ).removeClass( "active" ).addClass( "yourClass" );

  document.querySelectorAll(".store__content_items-item").forEach(function(a){a.style.display = "none"})

  if(category == "all") {
    $( "#all").addClass( "active" );
    document.querySelectorAll(".store__content_items-item").forEach(function(a){a.style.display = "block"})
  }
  else {
    console.log(category)
    $( "#category_"+category).addClass( "active" );
    document.querySelectorAll("."+category).forEach(function(a){a.style.display = "block"})
  }

}