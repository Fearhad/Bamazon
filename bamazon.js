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

connection.connect(function (err) {
    if (err) throw err;
    runPurchaseItem();
});

var amount_purchased = 0;
var product_id = 1;

function runPurchaseItem() {
    var query = "SELECT * FROM products";
    connection.query(query, {
        id: query.item_id,
        product: query.product_name,
        price: query.price
    }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price);
        }
        inquirer
            .prompt([{
                    name: "Product",
                    type: "input",
                    message: "Please type the ID Number of the product you would like to buy."
                },
                {
                    name: "Quantity",
                    type: "input",
                    message: "How many would you like to buy?"

                }
            ]).then(function (answer) {
                product_id = parseInt(answer.Product);
                amount_purchased = answer.Quantity;
                console.log(product_id)
                console.log(amount_purchased)
                checkQuantity();
            });
    });

}

function checkQuantity() {

    connection.query(
        "SELECT * FROM products WHERE ?", {
            item_id: product_id
        },
        function (err, res) {
            if (err) throw err;
            if (amount_purchased <= res[0].stock_quantity) {
                console.log("Enough in Stock. Proceeding with purchase...\n");
                updateQuantity();
                runPurchaseItem();
            } else {
                console.log("Not Enough in Stock! There are only " + res[0].stock_quantity + " available.");
                runPurchaseItem();
            }
        }
    );

}

function updateQuantity() {
    connection.query(
        "SELECT * FROM products WHERE item_id=?", [product_id], function (err, res) {
            if (err) throw err;
            var revised_stock = res[0].stock_quantity - amount_purchased;
            var total_cost = res[0].price * amount_purchased;
        connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
            [revised_stock, product_id],

            function (innerErr, res) {

                if (innerErr) throw innerErr;
                
                connection.end();
            }
            
            );   
            console.log("Order Placed! There are " + revised_stock + " left in stock.\n");
            console.log("The total cost of your purchase is " + total_cost.toFixed(2) + "\n");
});
}
