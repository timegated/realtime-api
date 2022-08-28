import express from 'express';
import {io} from '../index.js' ;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.send('IMPLEMENT GET');
  } catch (error) {
    res.send(error);
  }
});

/**
 * means that whenever someone will add an order, 
 * it will be posted to all clients connected the socket, 
 * so will be updated instantly with the orders array in the db
 */
/**
 * This is pretty basic and needs some work on security issues such as SSL/TLS
 * and also setting up max concurrent connections and weighing the viability of 
 * trying to integrate this into an older codebase with a lot of cruft.
 * But it is certainly do-able/possible it's just a matter of doing the RnD and implementing it
 * Definitely a 3-5 range task.
 */
router.post('/', async (req, res) => {
  try {
    io.emit('order-added', 'realtime'); // We emit the event to everyone that is currently connected to the socket.
    res.status(201).send('IMPLEMENT POST');
  } catch (error) {
    res.send(error);
  }
});

export default router;
