const express = require("express");
const router = express.Router();
const item = require('../models/itemModel')
const upload = multer({ dest: '../images' });

//add new items
router.post("/add/item", upload.array('productImages', 5), async (req, res) => {
  const { sku,newName, newPrices, newDescription,newQty } = req.body;
  const newImages = req.files.map(file => file.path);
  try {
      const items = new item({
        sku : sku,
        name : newName,
        description : newDescription,
        prices : newPrices,
        qty : newQty
      });

      await items.save();
      res.send('Item added successfully!');
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});


//get all items
router.get("/getallitems", async (req, res) => {

    try {

        const items = await item.find({})
        res.send(items)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

//get current item
router.get("/getcurrentitem/:id", async (req, res) => {

    let itemId = req.params.id;
    try {

        const currentitem = await item.findById(itemId)
        res.send(currentitem)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

//update items
router.put("/update/item/:id", async (req, res) => {
    const itemId = req.params.id;
    const { sku,name, prices, image, description, qty } = req.body;
  
    try {
      const updateItems = {
        sku,
        name,
        image,
        description,
        prices,
        qty
      };
      await item.findByIdAndUpdate(itemId, updateItems);
      res.send('Items updated successfully!');
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });


  //Delete items
router.delete("/delete/item/:id", async (req, res) => {

  let itemId = req.params.id;

  try {
      await item.findByIdAndDelete(itemId)

      res.send('Item Deleted Successfully')
  }

  catch (error) {


      return res.status(400).json({ message: error });
  }
});
  
  

module.exports = router;