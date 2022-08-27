import express from 'express';
import Order from '../models/order';
import {io} from '../index' ;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
});

/**
 * means that whenever someone will add an order, 
 * it will be posted to all clients connected the socket, 
 * so will be updated instantly with the orders array in the db
 */
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    const orders = await Order.find();
    io.emit('order-added', orders);
    res.status(201).send(order);
  } catch (error) {
    res.send(error);
  }
});

export default router;
