const express = require('express');
const {getItem} = require('../../DataAccess/items');
const {createItem} = require('../../DataAccess/items');
const {updateItem} = require('../../DataAccess/items');
const {deleteItem} = require('../../DataAccess/items');
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
          console.log("Got it!")
          const data = await getItem(); 
          res.send(data);
    } catch (err) {
          console.log(err);
          res.send(500, "Error-Internal Server Issue. Failure.");
    };
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await createItem(req.body); 
             res.send(data);
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
  };
});

router.put('/:id', async function(req, res, next) {
    console.log(req.body);
       try {
             const data = await updateItem(req.params.id, req.body); 
             res.send(data);
             
       } catch (err) {
             console.log(err);
             res.status(500).send  ("Error-Internal Server Issue. A total failure.");
       };
});

router.delete('/:id', async function(req, res, next) {
    console.log(req.body);
         try {
               const data = await deleteItem(req.params.id); 
               res.send(data);
               
         } catch (err) {
               console.log(err);
               res.status(500).send  ("Error-Internal Server Issue. A total failure.");
    };
});

module.exports = router;