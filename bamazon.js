var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazonDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    runPurchaseItem();
  });

  var amount_purchased = 0;
  var product_id = 1;

  function runPurchaseItem() {
    var query = "SELECT * FROM products";
    connection.query(query, { id: query.item_id, product: query.product_name, price: query.price }, function(err, res) {
        if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
      }
      inquirer
    .prompt({
      name: "Product",
      type: "input",
      message: "Please type the ID Number of the product you would like to buy."
    })
    .then(function(answer) {
        product_id = parseInt(answer.Product);
        howMany();
    });
    });
    
}

function checkQuantity() {
    
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
          item_id: product_id
        },
        function(err, res) {
            if (err) throw err;
            console.log(res)
          console.log(res[0].stock_quantity + " units available!\n");
          if (amount_purchased < res[0].stock_quantity) {
            console.log("Enough in Stock");
        } else {
            console.log("Not Enough in Stock!");
        }
        }
      );
    
}

function howMany() {
    inquirer
    .prompt({
      name: "Quantity",
      type: "input",
      message: "How many would like to buy?"
    })
    .then(function(answer) {
        amount_purchased = answer.Quantity;
        console.log(product_id)
        console.log(amount_purchased)
        checkQuantity();        
    });
}

