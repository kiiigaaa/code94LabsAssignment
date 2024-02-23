const express = require("express");
const router = express.Router();
const item = require('../models/itemModel')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './images'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename for the uploaded file
  }
});

const upload = multer({ storage: storage });

//add new items
router.post("/add/item", upload.array('productImages', 5), async (req, res) => {
  const { sku, newName, newPrices, newDescription, newQty,thumbnail } = req.body;
  
  // Check if files are present in the request
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
  }

  // Map file paths if files are present
  const newImages = req.files.map(file => file.path);

  console.log("image path:" , newImages);

  try {
      const items = new item({
          SKU: sku,
          name: newName,
          description: newDescription,
          price: newPrices,
          QTY: newQty,
          images: newImages,
          thumbnail: thumbnail
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
// Update item details
router.put("/update/item/:id", upload.array('productImages', 5), async (req, res) => {
  const itemId = req.params.id;
  const { SKU, name, prices, description, QTY } = req.body;
  const newImages = req.files.map(file => file.path);
  try {
      const updateItems = {
          SKU,
          name,
          description,
          prices,
          QTY,
          images: newImages
      };
      await item.findByIdAndUpdate(itemId, updateItems);
      res.send('Item updated successfully!');
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

// Update favorites route
router.post("/updateFavorites", async (req, res) => {
  const { favorites } = req.body;

  try {
      // Update isFavourite field for all items
      await item.updateMany({}, { $set: { isFavourite: false } });

      // Update isFavourite field for items in favorites array
      await item.updateMany({ _id: { $in: favorites } }, { $set: { isFavourite: true } });

      res.send('Favorites updated successfully!');
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});

  
  

module.exports = router;