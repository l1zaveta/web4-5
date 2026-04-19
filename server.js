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


app.get('/:date/', (req, res) => {
    const dateParam = req.params.date;
    
   
    const dateRegex = /^(\d{2})(\d{2})(\d{2})$/;
    const match = dateParam.match(dateRegex);
    
    if (!match) {
        return res.status(400).json({ error: 'Invalid date format. Use DDMMYY' });
    }
    
    const day = match[1];
    const month = match[2];
    const year = '20' + match[3]; 
    
   
    const today = new Date();
    const todayDay = String(today.getDate()).padStart(2, '0');
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayYear = today.getFullYear();
    const todayFormatted = `${todayDay}-${todayMonth}-${todayYear}`;
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
        date: todayFormatted,
        login: MY_LOGIN
    });
});


app.get('/api/rv/:string/', (req, res) => {
    const inputString = req.params.string;
    
    
    const stringRegex = /^[a-z]+$/;
    
    if (!stringRegex.test(inputString)) {
        return res.status(400).json({ 
            error: 'String must contain only lowercase latin letters (a-z) and be at least 1 character long' 
        });
    }
    
    
    const reversed = inputString.split('').reverse().join('');
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
        original: inputString,
        reversed: reversed
    });
});


app.get('/', (req, res) => {
    res.json({ 
        status: 'Server is running',
        endpoints: {
            date: '/DDMMYY/ (e.g., /021023/)',
            reverse: '/api/rv/abc/ (e.g., /api/rv/hello/)'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;