const { getFirestore } = require('firebase-admin/firestore');
const moment = require('moment');

const db = getFirestore();

class ProjectController {
    // [POST] /projects
    async createProject(req, res) {
        try {
            const query = db.collection('projects');
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
                        .collection('projects')
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

    // [GET] /projects/:id

    async getOneProject(req, res) {
        try {
            const document = db.collection('projects').doc(req.params.id);
            let project = await document.get();
            const response = project.data();
            const endDate = moment(response.endDate, 'DD/MM/YYYY');

            const now = moment();

            if (now.isAfter(endDate)) {
                await document.update({
                    status: 'completed',
                });
                project = await document.get();
                return res.status(200).send(project.data());
            }

            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [GET] /project

    async getAllProjects(req, res) {
        try {
            const query = db.collection('projects');
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

    // [PATCH] /projects/:id

    async updateProject(req, res) {
        try {
            const document = db.collection('projects').doc(req.params.id);
            await document.update(req.body);
            return res.status(200).send(req.body);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [DELETE] /employees/:id

    async deleteProject(req, res) {
        try {
            const document = db.collection('projects').doc(req.params.id);
            await document.update({ deletedAt: new Date().toISOString() });
            return res.status(200).send({ msg: 'Success' });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

module.exports = new ProjectController();
