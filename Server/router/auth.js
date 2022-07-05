const express = require('express')
var router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const con = require('../sqlServer')
const logger = require('../controller/logger');
const { now } = require('mongoose');

router.post('/register', async function (req, res) {
    registerData = req.body;

    // const email = req.body.Email;
    console.log(registerData)
    const hashedPassword = await bcrypt.hash(registerData.Password, 10);
    // console.log(hashedPassword);

    if (!registerData.Name || !registerData.Email || !registerData.ContactNo || !registerData.Password || !registerData.ConfirmPassword) {
        logger.log('error', 'please enter value of each field')
        return res.status(422).json({ error: "please enter value of each field" });
    }

    const selectRegisterData = "SELECT * FROM registerData"
    const createTable = "CREATE TABLE registerData (NAME varchar(255), Email varchar(255), ContactNo varchar(30), Password varchar(255), ConfirmPassword varchar(255))";
    const insertData = `INSERT INTO registerData (NAME, Email, ContactNo, Password, ConfirmPassword) VALUES ("${registerData.Name}", "${registerData.Email}", "${registerData.ContactNo}", "${hashedPassword}", "${hashedPassword}")`

    con.query(`SELECT COUNT(*) AS cnt FROM registerData WHERE Email = "${registerData.Email}"`,
        function (err, data) {
            try {
                if (data[0].cnt > 0) {
                    // Already exist 
                    console.log("email already exist")
                    logger.log('error', 'Email already exist')
                    return res.status(422).json({ error: "Email already Exist" })

                }
                else if (registerData.Password !== registerData.ConfirmPassword) {
                    console.log("Password are not matching")
                    logger.log('error', 'Password are not matching')
                    return res.status(422).json({ error: "Password are not matching" })
                }
                else {
                    con.query(insertData, (err, result) => {
                        if (err) throw err;
                        console.log("Result: " + JSON.stringify(result));
                        // console.log(insertData);
                        logger.log('info', 'User registered successfully')
                        res.status(201).json({ message: "user registration successfull" })
                    });
                }
            } catch (err) {
                console.log(err);
            }
        })
});

router.post("/login", (req, res) => {
    const email = req.body.Email
    const password = req.body.Password
    // console.log(email, password)

    const sqlSearch = "Select * from registerData where email = ?"
    const search_query = mysql.format(sqlSearch, [email])

    con.query(search_query, async (err, result) => {
        // console.log(result);
        if (err) throw (err)
        if (!email || !password ) {
            logger.log('error', 'Please enter valid credential')
            return res.status(404).json({ error: "Please enter valid credential" });
        }

        if (result.length == 0) {
            console.log("--------> User does not exist")
            logger.log('error', 'User does not exist')
            return res.status(404).json({ error: "User does not exist" });
        }
        else {
            const hashedPassword = result[0].Password
            // console.log(result);
            console.log(result[0]);


            if (await bcrypt.compare(password, hashedPassword)) {
                console.log("---------> Login Successful")
                logger.log('info', 'logged in successfully')
                // res.send(`${email} is logged in!`)

                //token generating 
                const token = jwt.sign({id:result[0].Email},'the-super-strong-secrect',{ expiresIn: '1h' });
                const tokenQuery = `UPDATE registerData SET last_login = now(), token = "${token}" WHERE Email = '${result[0].Email}'`
                con.query( tokenQuery, (err, data) => {
                    console.log(err); 
                });
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 100000),
                    httpOnly: true
                })

                // return res.status(200).json(`${email} is logged in!`);
                return res.status(200).json({
                    msg: `${email} is logged in!`,
                    token,
                    user: result[0]
                    });
                    
            }
            else {
                console.log("---------> Password Incorrect")
                logger.log('error', 'Password incorrect')
                // res.send("Password incorrect!")
                return res.status(404).json({ error: "Password incorrect" });
            }
        }
    })
})

router.post('/get-user',  (req, res, next) => {
    if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
    ){
    return res.status(422).json({
    message: "Please provide the token",
    });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
    });


    router.get('/logout', (req, res) => {
        console.log("my logout page");
        res.clearCookie('jwtoken', { path: '/' });
        res.status(200).send('user logout');
    })

module.exports = router;