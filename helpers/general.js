function findDifferences(arr1, arr2) {
    // Use filter to find objects in arr1 that are not present in arr2
    const differences = arr1.filter((obj1) => {
        // Check if any object in arr2 has the same ID as obj1
        return !arr2.some((obj2) => obj1.id === obj2.id);
    });

    return differences;
}

function findMembersNotInProject(members, projectData) {
    const memberIdIsDelete = members.map((item) => String(item.id));
    const memberInProject = [];
    projectData.filter((project) =>
        project.member.find((mem) => {
            if (memberIdIsDelete.includes(String(mem.id))) {
                memberInProject.push(mem.id);
            }
            return memberIdIsDelete.includes(String(mem.id));
        })
    );

    return memberIdIsDelete.filter((obj1) => {
        // Check if any object in arr2 has the same ID as obj1
        return !memberInProject.some((obj2) => obj1 === obj2);
    });
}

function findIsManagerInProject(members, projectData) {
    const memberIdIsDelete = members.map((item) => String(item.id));
    const memberInProject = [];
    projectData.filter((project) =>
        project.manager.find((man) => {
            if (memberIdIsDelete.includes(String(man.id))) {
                memberInProject.push(man.id);
            }
            return memberIdIsDelete.includes(String(man.id));
        })
    );

    return memberIdIsDelete.filter((obj1) => {
        // Check if any object in arr2 has the same ID as obj1
        return !memberInProject.some((obj2) => obj1 === obj2);
    });
}

module.exports = {
    findDifferences,
    findMembersNotInProject,
    findIsManagerInProject,
};
