const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fitness'
})

app.post('/Register', (req, res) => {
    const {username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Failed to register user' });
        }
        return res.status(201).json({ username });
    });
});

app.get('/Register', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.get('/Register/:username', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, username, (err, data) => {
        if(err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Error fetching user" });
        }
        
        if(data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(data[0]);
    });

});


app.post('/Nutrition', (req, res) => {
    const { foodName, weight, calories, protein, fats, carbs, username } = req.body;
    const sql = "INSERT INTO nutrition (`foodName`, `weight`, `calories`, `protein`, `fats`, `carbs`, `username`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [foodName, weight, calories, protein, fats, carbs, username];

    db.query(sql, values, (err,data) => {
        if(err) return res.json(err);
        return res.json({ message: 'Macro added successfully', id: data.insertId, values });
        
    })
})

app.get('/Nutrition/:username', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM nutrition WHERE username = ?";
    db.query(sql, username, (err, data) => {
        if (err) {
            console.error('Error retrieving nutrition records:', err);
            return res.status(500).json({ error: 'Failed to retrieve nutrition records' });
        }
        return res.json(data);
    });
});

app.get('/Nutrition/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM nutrition WHERE id = ?";
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: 'Record not found' });
        return res.json(data[0]); 
    });
});


app.delete('/Nutrition/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM nutrition WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })

});


app.post('/UserInfo', (req, res) => {
    const { age, weight, height, bmi, username, isImperial } = req.body;
    const sql = "INSERT INTO userinfo (`age`, `weight`, `height`, `bmi`, `username`, `isImperial`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [age, weight, height, bmi, username, isImperial];

    db.query(sql, values, (err, data) => {
        if(err) return res.json(err);
        return res.json({ message: 'User info added successfully', id: data.insertId, values });
        
    })

});

app.get('/UserInfo/:username', (req, res) => {
    const sql = "SELECT * FROM userinfo WHERE username = ?";
    db.query(sql, (err, data) => {
        if(err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Error fetching user" });
        }
        
        if(data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(data[0]);
    })

});


app.post('/Goals', (req, res) => {
    const { calorieGoal, proteinGoal, carbGoal, fatGoal, username} = req.body;
    const sql = 'INSERT INTO usergoals (`calorieGoal`, `proteinGoal`, `carbGoal`, `fatGoal`, `username`) VALUES ( ?, ?, ?, ?, ?)';
    const values = [calorieGoal, proteinGoal, carbGoal, fatGoal, username];

    db.query(sql, values, (err, data) => {
        if(err) return res.json(err);
        return res.json({ message: 'Goals added successfully', id: data.insertId, values });
        
    })

})

app.get('/Goals/:username', (req, res) => {
    const sql = 'SELECT * FROM usergoals';

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
        
    })

})


app.post('/Fitness', (req, res) => {
    const { exerciseName, sets, caloriesBurned, username } = req.body;
    const sql = "INSERT INTO fitness (`exerciseName`, `sets`, `caloriesBurned`, `username`) VALUES (?, ?, ?, ?)";
    const values = [exerciseName, sets, caloriesBurned, username];

    db.query(sql, values, (err, data) => {
        if(err) return res.json(err);
        return res.json({ message: 'Exercise added successfully', id: data.insertId, values });
        
    })

});

app.get('/Fitness', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM fitness WHERE username = ?";
    db.query(sql, username, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: 'Record not found' });
        return res.json(data[0]); 
    });

});

app.get('/Fitness/:username', (req, res) => {
    const username = req.params.username;
    const sql = "SELECT * FROM fitness WHERE username = ?";
    db.query(sql, username, (err, data) => {
        if (err) {
            console.error('Error retrieving nutrition records:', err);
            return res.status(500).json({ error: 'Failed to retrieve nutrition records' });
        }
        return res.json(data);
    });
});

app.delete('/Fitness/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM fitness WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })

});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
