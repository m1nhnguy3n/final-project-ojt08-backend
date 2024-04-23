const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

class TrackingController {
    // [POST] /tracking
    async createTracking(req, res) {
        try {
            const query = db.collection('tracking');
            const response = [];
            await query
                .get()
                .then((querySnapshot) => {
                    const docs = querySnapshot.docs; // the result of our query
                    for (const doc of docs) {
                        // add each doc to our JSON response
                        const selectedItem = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        response.push(selectedItem);
                    }
                })
                .then(async (respro) => {
                    const id = response.length + 1;
                    await db
                        .collection('tracking')
                        .doc('/' + id + '/')
                        .create({
                            ...req.body,
                            createdAt: new Date().toISOString(),
                        });
                    return res.status(200).send({
                        msg: 'Success',
                        data: {
                            ...req.body,
                            createdAt: new Date().toISOString(),
                        },
                    });
                });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [GET] /tracking/:id

    async getOneTracking(req, res) {
        try {
            const document = db.collection('tracking').doc(req.params.id);
            const user = await document.get();
            const response = user.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [GET] /tracking

    async getAllTracking(req, res) {
        try {
            const query = db.collection('tracking');
            const response = [];
            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs; // the result of our query
                for (const doc of docs) {
                    // add each doc to our JSON response
                    const selectedItem = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    response.push(selectedItem);
                }
                return response; // each then should return a value
            });
            return res.status(200).send(response); // end of async function should return a value
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [PATCH] /tracking/:id

    async updateTracking(req, res) {
        try {
            const document = db.collection('tracking').doc(req.params.id);
            console.log(req.body);
            await document.update(req.body);
            return res.status(200).send(req.body);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

module.exports = new TrackingController();
