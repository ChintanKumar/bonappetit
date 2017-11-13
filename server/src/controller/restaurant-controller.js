const mysql = require('mysql')
const config = require('../config/config')

const con = mysql.createConnection(config.db)
con.connect()

module.exports = {
  search (req, res) {
    con.query('SELECT rest_id, name, cuisine, rating, address, image FROM RESTAURANT WHERE RESTAURANT.name LIKE (?)' +
      'UNION SELECT item_id, item_name, price, vegan, null, null FROM MENU_ITEM WHERE MENU_ITEM.item_name LIKE (?)',
      [req.body.q, req.body.q],
      (error, results) => {
        if (error) {
          console.log(error)
          console.log(results)
          res.status(400).send('Rest not found')
        } else {
          // console.log(req)
          console.log('User Created Successfully.')
          console.log(results)
          res.status(200).send(results)
        }
      }
    )
  }
}