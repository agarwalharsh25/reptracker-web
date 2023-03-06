import {firestore} from '../../../firebase';

export const addDoctor = async (name, speciality, department, qualification, contact, hospitalName, hospitalId) => {
    try {
        const documentReference = await firestore.collection('doctors')
            .add({
                name: name,
                searchField: name.toString().toLowerCase(),
                speciality: speciality,
                department: department,
                qualification: qualification,
                contact: contact,
                hospital: {
                    hospitalName: hospitalName,
                    hospitalId: hospitalId
                },
                visits: {
                    total: 0,
                    active: 0
                }
            });
        console.log('document reference ID', documentReference.id);
    }
    catch (error) {
        console.log(error.message);
    }
};

export const uploadDoctorCsv = async (data) => {
    for (var i = 1; i < data.length; i++) {
        await addDoctor(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6]);
    }
}

export const fetchDoctor = (id) => {
    return firestore.collection('doctors').doc(id)
        .get();
};

export const updateDoctor = (id, doc) => {
    return firestore.collection('doctors').doc(id)
        .update(doc);
};

export const deleteDoctor = (id) => {
    return firestore.collection('doctors').doc(id)
        .delete();
};

export const fetchDoctorAnalytics = () => {
    return firestore.collection('doctors').doc("analytics")
        .get();
};

export const searchDoctor = (query) => {
    query = query.toString().toLowerCase();
    return firestore.collection('doctors')
        .orderBy("searchField").startAt(query).endAt(query + "\uf8ff")
        .limit(10)
        .get();
};

export const fetchDoctorVisits = (id) => {
    return firestore.collection('visits')
        .where('doctor.id', '==', id)
        .get();
};