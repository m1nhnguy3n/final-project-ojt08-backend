const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

async function getAllProjects() {
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

    return response;
}

module.exports = { getAllProjects };
