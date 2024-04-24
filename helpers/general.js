function findDifferences(arr1, arr2) {
    // Use filter to find objects in arr1 that are not present in arr2
    const differences = arr1.filter((obj1) => {
        // Check if any object in arr2 has the same ID as obj1
        return !arr2.some((obj2) => obj1.id === obj2.id);
    });

    return differences;
}

function findMembersNotInProject(members, projectData) {
    const memberInProject = new Set();
    // Extract member IDs from the project
    const projectMemberIds = projectData.map((project) => project.member.id);

    projectData.forEach((project) => {
        project.member.forEach((member) => memberInProject.add(member.id));
    });

    // Check if the provided member's ID exists in the project

    const membersNotInProjects = members.filter(
        (member) => !projectMemberIds.includes(member.id)
    );

    
    // const isMemberInProject = projectMemberIds.has(member.id);

    // Return member if not found in the project
    return membersNotInProjects;
}

module.exports = { findDifferences, findMembersNotInProject };
