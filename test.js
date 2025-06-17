const express = require('express');
const bodyParser = require('body-parser');
const Composer = require('./mongoschema.js');

const app = express();
const PORT = 3000;

function getFirst20Chars(text) {
    const fullText = Array.isArray(text) ? text.join(' ') : text;
    return fullText.length <= 75 ? fullText : fullText.slice(0, 75) + '...';
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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

// الصفحة الرئيسية
app.get('/', (req, res) => {
  Composer.find()
    .then((data) => {
      res.render('index.ejs', {
        title: 'Home',
        sampleText: sampleParagraphs,
        data: data
      });
    })
    .catch((err) => console.error(err));
});

// صفحة الإنشاء
app.get('/c', (req, res) => {
  res.render('compose.ejs', { title: 'Compose', PostDirection: '/c' });
});

app.post('/c', (req, res) => {
  const { title, content } = req.body;
  const newCompose = new Composer({
    title,
    content,
    short: getFirst20Chars(content)
  });
  newCompose.save()
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err));
});

// صفحة عرض التفاصيل
app.get('/post/:id', (req, res) => {
  Composer.findById(req.params.id)
    .then((data) => {
      res.render('Readmore.ejs', { foundPost: data });
    })
    .catch((err) => console.error(err));
});

// صفحة التحديث
app.get('/update/:id', (req, res) => {
  res.render('compose.ejs', {
    title: 'Update',
    PostDirection: `/update/${req.params.id}`
  });
});

app.post('/update/:id', (req, res) => {
  const { title, content } = req.body;
  const updatedData = {
    title,
    content,
    short: getFirst20Chars(content)
  };
  Composer.findByIdAndUpdate(req.params.id, updatedData)
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err));
});

// صفحة الحذف
app.get('/delete/:id', (req, res) => {
  Composer.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err));
});

// RESTful API
app.route('/posts')
  .get((req, res) => {
    Composer.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    const { title, content } = req.body;
    const newPost = new Composer({
      title,
      content,
      short: getFirst20Chars(content)
    });
    newPost.save()
      .then((savedPost) => res.status(201).json(savedPost))
      .catch((err) => res.status(500).json({ error: err.message }));
  });

app.route('/posts/:id')
  .get((req, res) => {
    Composer.findById(req.params.id)
      .then((post) => post ? res.json(post) : res.status(404).json({ error: 'Not found' }))
      .catch((err) => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { title, content } = req.body;
    const updatedData = {
      title,
      content,
      short: getFirst20Chars(content)
    };
    Composer.findByIdAndUpdate(req.params.id, updatedData, { new: true })
      .then((updatedPost) => res.json(updatedPost))
      .catch((err) => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    Composer.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).end())
      .catch((err) => res.status(500).json({ error: err.message }));
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
