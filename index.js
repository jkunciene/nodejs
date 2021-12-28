const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("nodemon - for monitoring changes")
});

const courses = [
    {id: 1, name: "js"},
    {id: 2, name: "react"},
    {id: 3, name: "node js"}
]
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   const my_course = courses.find(course => course.id === parseInt(req.params.id));
   if(!my_course) res.status(404).send("not found");
   res.send(my_course);
})

app.post('/api/courses', (req, res) => {
  const schema = {
      name: Joi.string().min(3).required()
  };
  const result = Joi.ValidationError(req.body, schema);
  console.log(result);

  if(result.error){
      res.status(400).send('Name is required and shold be min 3char');
      return;
  };

    const course = {
       id: courses.length + 1,
       name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});


// environment variables
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
});