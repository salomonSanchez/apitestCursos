var express = require('express');
var json2xml = require("json2xml");
const e = require('express');
var router = express.Router();
var cachecontrol = require('express-cache-control')
var cache = new cachecontrol().middleware

const cursos = [{
        id: 1,
        name: 'integracion',
        alumnos: [
            { id: 20, nombre: 'marco', apellido: 'lopez', nota: 10, },
            { id: 21, nombre: 'paola', apellido: 'borja', nota: 10, },
            { id: 22, nombre: 'manuel', apellido: 'alejandro', nota: 10, },
        ]
    },
    {
        id: 2,
        name: 'investigacion II',
        alumnos: [
            { id: 20, nombre: 'marco', apellido: 'lopez', nota: 10, },
            { id: 21, nombre: 'paola', apellido: 'borja', nota: 10, },
            { id: 22, nombre: 'manuel', apellido: 'alejandro', nota: 10, },
        ]
    },
    {
        id: 3,
        name: 'TI',
        alumnos: [
            { id: 20, nombre: 'marco', apellido: 'lopez', nota: 10, },
            { id: 21, nombre: 'paola', apellido: 'borja', nota: 10, },
            { id: 22, nombre: 'manuel', apellido: 'alejandro', nota: 10, },
        ]
    },
];

router.get('/', cache('minutes', 60), function(request, response) {
    var data = {
        items: cursos
    };
    var xml_cursos = json2xml(data);
    response.setHeader('Content-Type', 'application/xml');
    response.send(xml_cursos);
});

router.get('/', cache('minutes', 60), function(request, response) {
    //response.send(catalog);
    response.json(cursos);
});

router.get('/:curso_id', function(request, response) {
    const curso_id = request.params.curso_id;
    var product = cursos.find(item => item.id == curso_id);
    //response.send(catalog);
    response.json(product);
});

router.get('/course/:courseid', function(request, response) {
    const course_id = request.params.courseid;
    var course = cursos.find(item => item.id == course_id);
    //response.send(catalog);
    response.json(course);
});
router.get('/course/:courseid/student/', function(request, response) {
    const course_id = request.params.courseid;
    const studentid = request.params.studentid;
    var course = cursos.find(item => item.id == course_id);
    const student = course.alumnos;

    //response.send(catalog);
    response.json(student);
});

router.get('/course/:courseid/student/:studentid', cache('minutes', 60), function(request, response) {
    const course_id = request.params.courseid;
    const studentid = request.params.studentid;
    var course = cursos.find(item => item.id == course_id);
    const student = course.alumnos.find(e => e.id = studentid);

    //response.send(catalog);
    response.json(student);
});



module.exports = router;