import {firestore, auth} from '../../../firebase';

export const addRep = async (firstName, lastName, city, state, email, password, contact) => {
    try {
        const documentReference = await firestore.collection('users').add({
            firstName: firstName,
            lastName: lastName,
            searchField: firstName.toString().toLowerCase(),
            city: city,
            state: state,
            email: email,
            password: password,
            contact: contact,
            role: "rep",
            visits: {
                avgPptTime: 0,
                avgVisitDur: 0,
                active: 0,
                total: 0
            }
        });
        console.log('document reference ID', documentReference.id);
    }
    catch (error) {
        console.log(error.message);
    }
};

export const uploadRepCsv = async (data) => {
    for (var i = 1; i < data.length; i++) {
        await addRep(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6]);
    }
}

export const fetchRep = (id) => {
    return firestore.collection('users').doc(id)
        .get();
};

export const updateRep = (id, user) => {
    return firestore.collection('users').doc(id)
        .update(user);
};

export const deleteRep = (id) => {
    return firestore.collection('users').doc(id)
        .delete();
};

export const fetchRepAnalytics = () => {
    return firestore.collection('users').doc("analytics")
        .get();
};

export const searchRep = (query) => {
    query = query.toString().toLowerCase();
    return firestore.collection('users')
        .orderBy("searchField").startAt(query).endAt(query + "\uf8ff")
        .limit(10)
        .get();
};