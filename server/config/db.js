import {DB_URL} from '../config/variables'

// ended frienship with mongo, now SQL is my new best friend.
mongoose.connect(DB_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true
}, () => {
  console.log(DB_URL);
  console.log(`DB up and running`);
})