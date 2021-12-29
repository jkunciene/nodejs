const express = require('express');
const Joi = require('joi');
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
   const result = validateCourse(req.body);
    if(result.error){
        res.status(400).send("Name is required and shold be min 3char");
        return;
    }

   const course = {
       id: courses.length + 1,
       name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");
    //validate
    //if invalid, return 400
    const result = validateCourse(req.body);
    console.log(result);
    if(result.error){
        res.status(400).send("Name is required and shold be min 3char");
        return;
    }

    //update course
    //return the course
    my_course.name = req.body.name;
    res.send(my_course);
});

app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return
    const my_course = courses.find(course => course.id === parseInt(req.params.id));
    if(!my_course) res.status(404).send("not found");

    //delete
    const index = courses.indexOf(my_course);
    courses.splice(index, 1);

    res.send(my_course);
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
  return  schema.validate(course); 
   
}

// environment variables
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
});