const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

const updateEmployeeStatusAfterJoinProject = (employees) => {
    employees.forEach(async (employee) => {
        const employeeData = db.collection('employees').doc(employee.id);
        await employeeData.update({
            status: 'assigned',
        });
    });
};

const updateEmployeeStatusAfterLeaveProject = (employees) => {
    employees.forEach(async (employee) => {
        const employeeData = db.collection('employees').doc(employee.id);
        await employeeData.update({
            status: 'unassigned',
        });
    });
};

module.exports = {
    updateEmployeeStatusAfterJoinProject,
    updateEmployeeStatusAfterLeaveProject,
};
