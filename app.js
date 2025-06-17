const express = require('express');
const bodyParser = require('body-parser');
const { Composer, User } = require('./mongoschema.js');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;


function getFirst20Chars(text) {
  const fullText = Array.isArray(text) ? text.join(' ') : text;
  return fullText.length <= 75 ? fullText : fullText.slice(0, 75) + '...';
}

// Middleware for checking login
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).send('🔒 Unauthorized – Please login first');
}

const sampleParagraphs = [
  "Welcome to your new project layout. This sample text is here to fill space and showcase design.",
  "Each line reflects how future content might look once it's ready to go live.",
  "You can use this placeholder to test font sizes, colors, and alignment styles.",
  "The wording is intentionally generic to avoid drawing attention away from the layout.",
  "It helps ensure that your focus remains on the user interface and structure.",
  "Whether you're building a website or an app, placeholder text is a helpful tool.",
  "Adjust the content as needed to match the purpose of your project.",
  "Replace this sample when your final copy is prepared and approved."
];

// Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mysecretkey', // ⚠️ في الإنتاج حطه في .env
  resave: false,
  saveUninitialized: false
}));

// Routes
app.route('/register')
  .get((req, res) => {
    res.render('register.ejs');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    try {
      const exist = await User.findOne({ username });
      if (exist) return res.status(400).send('❌ User already exists');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.redirect('/login');
    } catch (err) {
      console.log(err);
      res.status(500).send('❌ Server error');
    }
  });

app.route('/login')
  .get((req, res) => {
    res.render('login.ejs');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send('❌ Invalid credentials');
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).send('❌ Invalid credentials');
      req.session.userId = user._id;
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('❌ Server error');
    }
  });

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('❌ Error during logout');
    res.redirect('/login');
  });
});

app.route('/')
  .get((req, res) => {
    Composer.find()
      .then((data) => {
        res.render('index.ejs', {
          title: 'Home',
          sampleText: sampleParagraphs,
          data: data,
          session: req.session
        });
      })
      .catch((err) => console.error(err));
  });

app.route('/c')
  .get(isAuthenticated, (req, res) => {
    res.render('compose.ejs', { title: 'Compose', PostDirection: '/c' });
  })
  .post(isAuthenticated, (req, res) => {
    const { title, content } = req.body;
    const NewCompose = new Composer({
      title,
      content,
      short: getFirst20Chars(content)
    });
    NewCompose.save()
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err));
  });

app.route('/post/:id')
  .get((req, res) => {
    Composer.findOne({ _id: req.params.id })
      .then((data) => {
        res.render('Readmore.ejs', { foundPost: data });
      })
      .catch((err) => console.error(err));
  });

app.route('/delete/:id')
  .get(isAuthenticated, (req, res) => {
    Composer.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err));
  });

app.route('/update/:id')
  .get(isAuthenticated, (req, res) => {
    res.render('compose.ejs', {
      title: 'Update',
      PostDirection: `/update/${req.params.id}`
    });
  })
  .post(isAuthenticated, (req, res) => {
    const { title, content } = req.body;
    const UpdatedData = {
      title,
      content,
      short: getFirst20Chars(content)
    };
    Composer.updateOne({ _id: req.params.id }, UpdatedData)
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err));
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
