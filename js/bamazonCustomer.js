var mysql = require("mysql");

var inquirer = require("inquirer");

require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: process.env.DB_PW,
  database: "bamazon_db"
});

//for some reason i can get inquirer to return the answers as objects but not aactually get at the values themselves
var itemId;
var quantity;

//inquirer list all the possible things so user can pick

connection.connect(function (err)
{
  if (err) throw err;

  start();
});


function start() 
{

  connection.query("SELECT * FROM products", function (err, results)
  {
    console.log(results);
    inquirer
      .prompt(
        {
          name: "getitemId",
          type: "input",
          message: "Please type the id number of the item you would like to purchase",
          validate: function (value) 
          {

            if (value >= results.length + 1)
            {
              return "please enter a valid number";

            } else if (!checkForId(value))
            {

              return "please enter a valid number";

            } else
            {
              itemId = value;
              return true;

            }

          }

        }


      ).then(() =>// have user input how much they want -------------------------------------------------------------------------
      {
        console.log(itemId);
        // console.log(answer.getItemId);  these should return as numbers but return as undefined
        // console.log(results[answer - 1]);
        inquirer
          .prompt(
            {
              name: "getStock",
              type: "input",
              message: "Please input how much you would like",
              validate: function (value) 
              {

                if (value > results[itemId - 1].stock)
                {
                  return "We do not have enough of that in stock right now";

                } else
                {
                  quantity = value;
                  return true;

                }

              }

            }


          ).then(function ()
          {

            var setStock = results[itemId - 1].stock - quantity;
            updateStock(setStock);
            console.log(`That will be $${results[itemId - 1].price * quantity}`);

          });

      });

    function checkForId(x)
    {

      for (var i = 0; i < results.length + 1; i++)
      {
        if (results[i].id == (x))
        {
          return true;
        }
      }

      return false;

    }

  })
}

function updateStock(newStock)
{

  connection.query(
    `UPDATE products SET ? WHERE id = ${itemId}`,
    {
      stock: newStock
    }, function (err)
    {
      if (err) throw err;
      console.log("Thank you for you purchase");

    }
  )

}