var mysql = require('mysql2')
var moment = require('moment')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'leaf-db'
})

connection.connect()


exports.main = (req, res, next) => {
    var empcount = 0
    var leavecount = 0
    var appcount = 0
    var deccount = 0

    connection.query('SELECT COUNT(id) FROM employees WHERE position="Staff";', function (err, row, fields) {
        if (err) throw err
        empcount = row[0]['COUNT(id)']

        connection.query('SELECT COUNT(id) FROM leaves;', function (err, row, fields) {
            if (err) throw err
            leavecount = row[0]['COUNT(id)']

            connection.query('SELECT COUNT(id) FROM leaves WHERE status="approved";', function (err, row, fields) {
                if (err) throw err
                appcount = row[0]['COUNT(id)']

                connection.query('SELECT COUNT(id) FROM leaves WHERE status="declined";', function (err, row, fields) {
                    if (err) throw err
                    deccount = row[0]['COUNT(id)']

                    res.render('../views/main', { empcount: empcount, leavecount: leavecount, appcount: appcount, deccount: deccount, user: req.user })
                })
            })
        })
    })
}

exports.employee = (req, res, next) => {
    connection.query('SELECT * FROM employees', function (err, rows, fields) {
        if (err) throw err

        console.log('User data: ', rows)
        res.render('../views/employee', { employees: rows, moment: moment, user: req.user })
    })
}

exports.emp_form = (req, res, next) => {
    res.render('../views/employee_sign', { user: req.user })
}

exports.leave = (req, res, next) => {
    connection.query('SELECT *, leaf.position FROM leaves AS leaf LEFT JOIN employees ON leaf.employee_id = employees.id;', function (err, rows, fields) {
        if (err) throw err

        console.log('User data: ', rows)
        res.render('../views/leave', { leaves: rows, moment: moment, user: req.user })
    })
}

exports.leave_form = (req, res, next) => {
    res.render('../views/leave_sign', { user: req.user })
}

exports.approval = (req, res, next) => {
    connection.query('SELECT *, leaf.position, leaf.id FROM leaves AS leaf LEFT JOIN employees ON leaf.employee_id = employees.id;', function (err, rows, fields) {
        if (err) throw err

        console.log('User data: ', rows)
        res.render('../views/approval', { leaves: rows, moment: moment, user: req.user })
    })
}

exports.login = (req, res, next) => {
    res.render('../views/login', { user: req.user })
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect("login");
}

exports.employee_submit = (req, res, next) => {
    let name = req.body.name
    let password = req.body.pwd
    let email = req.body.email
    let phone = req.body.phone
    let dob = req.body.dob
    let pos = req.body.pos
    var imgPath = req.file.filename

    var sql = `INSERT INTO employees
            (
                name, password, email, phone, dob, position, pfp, created_at, created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`;
    
    connection.query(sql, [name , password, email, phone, moment(dob).format('YYYY/MM/DD'), pos, imgPath, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), "Jimin Lee"], function (err, data) {
        if (err) {
            console.log(err)
        } else {
            // successfully inserted into db
            console.log('success: ' + data)
        }
    });

    res.redirect("/employee?success=true")
}

exports.leave_submit = (req, res, next) => {
    // let name = req.body.name
    let dep = req.body.department
    let reason = req.body.reason
    let explanation = req.body.explanation
    let start = req.body.start_date
    let end = req.body.end_date
    let total = req.body.total

    let user = req.user

    var sql = `INSERT INTO leaves
            (
                employee_id, position, department, submit_time, reason, explanation, start_date, end_date, total_days, status, created_at, created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`;
    
    connection.query(sql, [user.id, user.position, dep, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), reason, explanation, moment(start).format('YYYY/MM/DD'), moment(end).format('YYYY/MM/DD'), total, "pending", moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), "Jimin Lee"], function (err, data) {
        if (err) {
            console.log(err)
        } else {
            // successfully inserted into db
            console.log('success: ' + data)
            res.redirect("/leave?success=true")
        }
    });
}

exports.approve = (req, res, next) => {
    // confirm button; if confirm:
    var sql = `UPDATE leaves
                SET status = 'approved' WHERE id=?;`
    connection.query(sql, req.body.id, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('approval')
        }
    });
}

exports.decline = (req, res, next) => {
    // confirm button; if confirm:
    var sql = `UPDATE leaves
                SET status = 'declined' WHERE id=?;`
    connection.query(sql, req.body.id, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('approval')
        }
    });
}