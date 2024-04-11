const admin = require('firebase-admin');
const serviceAccount = require('./data/firestoreAdminKeyDemo.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL:
//         'https://final-project-ojt08-default-rtdb.asia-southeast1.firebasedatabase.app',
// });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        'https://zero-api-a307a-default-rtdb.asia-southeast1.firebasedatabase.app',
});

// Setup app dependencies
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({ origin: true }));
const route = require('./routes/index');

//Route init
route(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
