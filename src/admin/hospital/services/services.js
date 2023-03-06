import {firestore} from '../../../firebase';

export const addHospital = async (name, address, city, state, latitude, longitude, contact) => {
    try {
        const documentReference = await firestore.collection('hospitals')
            .add({
                name: name,
                searchField: name.toString().toLowerCase(),
                address: address,
                city: city,
                state: state,
                latitude: latitude,
                longitude: longitude,
                contact: contact,
                doctors: {
                    doctorsCount: 0,
                    doctorsSpecialityMap: {},
                    doctorsList: []
                },
                visits: {
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

export const uploadHospitalCsv = async (data) => {
    for (var i = 1; i < data.length; i++) {
        await addHospital(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6]);
    }
}

export const fetchHospital = (id) => {
    return firestore.collection('hospitals').doc(id)
        .get();
};

export const updateHospital = (id, hosp) => {
    return firestore.collection('hospitals').doc(id)
        .update(hosp);
};

export const deleteHospital = (id) => {
    return firestore.collection('hospitals').doc(id)
        .delete();
};

export const fetchHospitalAnalytics = () => {
    return firestore.collection('hospitals').doc("analytics")
        .get();
};

export const searchHospital = (query) => {
    query = query.toString().toLowerCase();
    return firestore.collection('hospitals')
        .orderBy("searchField").startAt(query).endAt(query + "\uf8ff")
        .limit(10)
        .get();
};