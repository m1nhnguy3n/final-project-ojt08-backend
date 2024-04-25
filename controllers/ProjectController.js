const { getFirestore } = require('firebase-admin/firestore');
const moment = require('moment');
const {
    findDifferences,
    findMembersNotInProject,
    findIsManagerInProject,
} = require('../helpers/general');
const {
    updateEmployeeStatusAfterJoinProject,
    updateEmployeeStatusAfterLeaveProject,
} = require('../services/employees.service');

const { getAllProjects } = require('../services/projects.service');

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
                .then(async () => {
                    const id = response.length + 1;
                    await db
                        .collection('projects')
                        .doc('/' + id + '/')
                        .create({
                            ...req.body,
                            createdAt: new Date().toISOString(),
                        });

                    // update employee status after create project

                    const projectData = { ...req.body };

                    const members = projectData.member;
                    console.log(members);

                    members.forEach(async (member) => {
                        const memberFound = await db
                            .collection('employees')
                            .doc(member.id);

                        await memberFound.update({
                            status: 'assigned',
                        });
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
            const projectDataUpdated = req.body;

            const document = db.collection('projects').doc(req.params.id);

            const projectCurrent = (await document.get()).data();

            const projectAll = await getAllProjects();

            const projectFilter = projectAll.filter(
                (item) => !item.deletedAt && !(item.id === req.params.id)
            );

            const managerIdCur = projectCurrent.manager[0].id;

            const managerInProject = projectFilter.find(
                (item) =>
                    item.manager[0].id === managerIdCur ||
                    item.member.find((mem) => mem.id === managerIdCur)
            );

            if (!managerInProject) {
                const employeesData = db
                    .collection('employees')
                    .doc(String(managerIdCur));
                employeesData.update({
                    status: 'unassigned',
                });
            }

            const membersAfterUpdate = projectDataUpdated.membersChange;

            const membersJoinProject = membersAfterUpdate.filter(
                (member) => member.isJoin === true
            );

            const membersLeaveProject = membersAfterUpdate.filter(
                (member) => member.isLeave === true
            );
            const memberNotInProject = await findMembersNotInProject(
                membersLeaveProject,
                projectFilter
            );

            const managerNotInProject = await findIsManagerInProject(
                membersLeaveProject,
                projectFilter
            );

            updateEmployeeStatusAfterJoinProject(membersJoinProject);
            if (!memberNotInProject && !managerNotInProject) {
                updateEmployeeStatusAfterLeaveProject(membersLeaveProject);
            }

            // delete projectDataUpdated.membersChange;
            // await document.update(projectDataUpdated);
            return res.status(200).send(projectDataUpdated);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    // [DELETE] /employees/:id

    async deleteProject(req, res) {
        try {
            const document = db.collection('projects');
            const project = await document.doc(req.params.id).get();

            const document2 = db.collection('projects').doc(req.params.id);

            const projectAll = await getAllProjects();

            const projectData = project.data();

            const members = projectData.member;

            const manager = projectData.manager[0];

            // update employee status after delete project

            await document2.update({ deletedAt: new Date().toISOString() });

            const projectFilter = projectAll.filter(
                (item) => !item.deletedAt && !(item.id === req.params.id)
            );

            const memberNotInProject = await findMembersNotInProject(
                members,
                projectFilter
            );

            if (memberNotInProject && memberNotInProject.length > 0) {
                memberNotInProject.forEach((e) => {
                    const employeesData = db
                        .collection('employees')
                        .doc(String(e));
                    employeesData.update({
                        status: 'unassigned',
                    });
                });
            }

            const managerInProject = projectFilter.find(
                (item) =>
                    item.manager[0].id === manager.id ||
                    item.member.find((mem) => mem.id === manager.id)
            );

            if (!managerInProject) {
                const employeesData = db
                    .collection('employees')
                    .doc(String(manager.id));
                employeesData.update({
                    status: 'unassigned',
                });
            }

            return res.status(200).send({ msg: 'Success' });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

module.exports = new ProjectController();
