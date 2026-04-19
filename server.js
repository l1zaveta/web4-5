const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const MY_LOGIN = 'l1zavetkns';


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});


function getTodayFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        date: getTodayFormatted(),
        login: MY_LOGIN
    });
});


app.get('/:date/', (req, res) => {
    const dateParam = req.params.date;
    const dateRegex = /^\d{6}$/; 
    
    if (!dateRegex.test(dateParam)) {
        return res.status(400).json({ error: 'Invalid date format. Use DDMMYY' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
        date: getTodayFormatted(),
        login: MY_LOGIN
    });
});


app.get('/api/rv/:string/', (req, res) => {
    const inputString = req.params.string;
    const stringRegex = /^[a-z]+$/;
    
    if (!stringRegex.test(inputString)) {
        return res.status(400).json({ 
            error: 'String must contain only lowercase latin letters (a-z)' 
        });
    }
    
    const reversed = inputString.split('').reverse().join('');
    
    res.setHeader('Content-Type', 'application/json');
    res.json({ reversed });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;