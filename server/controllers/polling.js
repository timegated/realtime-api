import express from 'express';
import NanoBuffer from '../utils/NanoBuffer';

const router = express.Router();
const msg = new NanoBuffer(50);

const getMsgs = () => Array.from(msg).reverse();

msg.push({
  user: 'dan',
  text: 'lol hey',
  time: Date.now()
});

router.get('/', (req, res) => {
  res.status(Math.random() > 0.5 ? 200 : 500).json({
    msg: getMsgs(),
  });
});

router.post('/', (req, res) => {
  const { user, text } = req.body;
  msg.push({
    user,
    text,
    time: Date.now(),
  });

  res.json({
    status: 'ok'
  });
});

export default router;
