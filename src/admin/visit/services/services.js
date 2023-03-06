import {firestore, storage} from '../../../firebase';

export const addVisit = async (doctorId, hospitalId, userId) => {
    try {
        const documentReference = await firestore.collection('visits')
            .add({
                doctor: {
                    id: doctorId,
                    name: "",
                    speciality: ""
                },
                hospital: {
                    id: hospitalId,
                    name: "",
                    address: "",
                    state: ""
                },
                notes: "",
                status: "PENDING",
                timestamps: {
                    presentationFinished: "",
                    presentationStarted: "",
                    reachedVisit: "",
                    visitFinished: "",
                    visitStarted: ""
                },
                userId: userId
            });
        console.log('document reference ID', documentReference.id);
    }
    catch (error) {
        console.log(error.message);
    }
};

export const uploadVisitCsv = async (data) => {
    for (var i = 1; i < data.length; i++) {
        await addVisit(data[i][0], data[i][1], data[i][2]);
    }
}

export const fetchVisit = (id) => {
    return firestore.collection('visits').doc(id)
        .get();
};

export const updateVisit = (id, hosp) => {
    return firestore.collection('visits').doc(id)
        .update(hosp);
};

export const deleteVisit = (id) => {
    return firestore.collection('visits').doc(id)
        .delete();
};

export const fetchVisitAnalytics = () => {
    return firestore.collection('visits').doc("analytics")
        .get();
};

export const fetchVisitPicture = (id) => {
    var storageRef = storage.ref();
    return storageRef.child('visits/pictures/'+id+'.jpg').getDownloadURL();
};

export const fetchVisitSignature = (id) => {
    var storageRef = storage.ref();
    return storageRef.child('visits/signatures/'+id+'.jpg').getDownloadURL();
};

export const fetchVisitAudio = (id) => {
    var storageRef = storage.ref();
    return storageRef.child('visits/audios/'+id+'.3gp').getDownloadURL();
};