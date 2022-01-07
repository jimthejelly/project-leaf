# Project Leaf

A simple webpage to document employees and their leaves over the year. Made with EJS, CSS and JS.

## How to Use

- npm install
- Set up MySQL database (named leaf-db)
- Load dummy database leaf-db.sql into created database
- npm start to localhost:3000

### Routes:

- localhost:3000/
- localhost:3000/login
- localhost:3000/leave
- localhost:3000/leave-form
- localhost:3000/employee
- localhost:3000/emp-form
- localhost:3000/approval
- localhost:3000/notauthorized

## Authorization

### Login

[GET] /login

<strong>Parameters:</strong> None

<strong>Response:</strong> <img src="/public/images/login.png">

### Logout

[GET] /logout

<strong>Parameters:</strong> None

<strong>Response:</strong> User logout; Redirect to login page

## Dashboard

[GET] /

<strong>Parameters:</strong> None

<strong>Response:</strong>

No login:
- can view dashboard only
<img src="/public/images/dashboard-nologin.png">

Staff:
- dashboard says welcome with logged in name
- can access dashboard and leave
<img src="/public/images/dashboard-staff.png">

Admin (Manager, Director, HR):
- dashboard says welcome with logged in name
- can access every page (dashboard, leave, employee and approval)
<img src="/public/images/dashboard-admin.png">

## Leave

*Only users who have logged in can access this page*

### Leave List

[GET] /leave

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/leavelist.png">

[GET] /leave?success=true

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/leaveform-success.png">

### Leave Form

[GET] /leave-form

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/leaveform.png">

[POST] /leave-submit

<strong>Parameters:</strong>

- employee_id
- department
- submit_time
- reason
- explanation
- start_date
- end_date
- total_days
- status
- created_at
- created_by

<strong>Response:</strong>
```
{
    id: 26,
    department: 'IT',
    submit_time: 2022-01-07T07:06:58.000Z,
    reason: 'Sick',
    explanation: 'Death is upon me, fellas',
    start_date: 1901-12-11T16:52:48.000Z,
    end_date: 1901-12-29T16:52:48.000Z,
    total_days: 18,
    created_at: 2022-01-07T07:06:58.000Z,
    updated_at: null,
    created_by: bloop,
    updated_by: null,
    employee_id: 2,
    status: 'pending',
    name: 'bloop',
    email: 'bloop@gmail.com',
    phone: '321543765',
    dob: 2021-10-07T17:00:00.000Z,
    password: 'password',
    position: 'Manager',
    pfp: 'https://media.moddb.com/images/members/5/4550/4549205/duck.jpg'
}
```

## Employee

*Only users with positions of Manager, Director or HR can access this page*

### Employee List

[GET] /employee

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/emplist.png">

[GET] /employee?success=true

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/empform-success.png">

### Employee Form

[GET] /emp-form

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/empform.png">

[POST] /employee-submit

<strong>Parameters:</strong>

- name
- password
- email
- phone
- dob
- position
- pfp
- created_at
- created_by

<strong>Response:</strong>
```
```

## Approval

*Only users with positions of Manager, Director or HR can access this page*

[GET] /approval

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/approval.png">

### Approve

[POST] /approve

<strong>Parameters:</strong>

- status

<strong>Response:</strong>
```
```

### Decline

[POST] /decline

<strong>Parameters:</strong>

- status

<strong>Response:</strong>
```
```

## Other

Pages that aren't part of the main project page

### Not Authorized page

[GET] /notauthorized

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/noauth.png">

### Error page

[GET] /error or anything that isn't part of the main get functions

<strong>Parameters:</strong> None

<strong>Response:</strong>
<img src="/public/images/error.png">

## Created with

### Functionality
- HTML/<a href="https://ejs.co/">EJS</a>
- <a href="https://www.npmjs.com/">npm</a>
- <a href="https://www.passportjs.org/">Passport.js</a>
- <a href="sweetalert2.github.io">SweetAlert2</a>

### Style
- CSS
- <a href="https://getbootstrap.com/">Bootstrap</a>