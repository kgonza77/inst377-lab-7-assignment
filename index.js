const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const { error } = require('console');
const app = express();
const port = 3000;
app.use(bodyParser.json());
/** this will help us pull/use the files inside the public folder
 * this is stating the source of the static content */
app.use(express.static(__dirname + '/public'));

//linking to the  relational dabase 
const supabaseUrl = 'https://ujjazqaqsibbgtopdejb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqamF6cWFxc2liYmd0b3BkZWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NTM1NzQsImV4cCI6MjAxNjAyOTU3NH0.ccsVtbNQf0OnOcMExqpkmVkcl2--SJIfH4bE5H-3Esk';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    //Here the name for the static files HTML
    res.sendFile('public/lab7-App-PPt.html', {root: __dirname});
});

app.get('/customers', async (req, res) => {
    console.log(`Getting Customer`)

    const {data, error} = await supabase
        .from('Customer')
        .select();
    if (error) {
        console.log(error);
        //res.status(400).json(error);
    } else if (data) {
        res.send(data);
    
    }
});

app.post('/add-customer', async (req, res) => {
    console.log('Adding Customer');

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customer')
        .insert([
            {cust_first_name: firstName, cust_last_name: lastName, cust_state: state}
        ])
        .select();
    
    console.log(data);
    res.header('Content-Type', 'application/json')
    res.send(data);
});

app.listen(port, () => {
    //console will display this line
    console.log(`Server running and working on port ${port}`);
});