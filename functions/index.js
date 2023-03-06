const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.updateHospitalAnalytics = functions.firestore.document('/hospitals/{hospitalId}')
    .onWrite((change, context) => {
        const hospitalAnalyticsRef = db.collection('hospitals').doc("analytics");
        let FieldValue = admin.firestore.FieldValue;
    
        if (!change.before.exists) {
            // new document created
            hospitalAnalyticsRef.update({
                [`countryMap.${change.after.data().state}`]: FieldValue.increment(1),
                totalHospitals: FieldValue.increment(1)
            });
        } else if (change.before.exists && change.after.exists) {
            // updating existing document
            if (change.after.data().state !== change.before.data().state) {
                hospitalAnalyticsRef.update({
                    [`countryMap.${change.after.data().state}`]: FieldValue.increment(1),
                    [`countryMap.${change.before.data().state}`]: FieldValue.increment(-1)
                });
            }
        } else if (!change.after.exists) {
            // deleting document
            hospitalAnalyticsRef.update({
                [`countryMap.${change.before.data().state}`]: FieldValue.increment(-1),
                totalHospitals: FieldValue.increment(-1)
            });
        }
    
        return 0;
    });

exports.updateDoctorAnalytics = functions.firestore.document('/doctors/{doctorId}')
    .onWrite((change, context) => {
        const doctorId = context.params.doctorId;
        const doctorAnalyticsRef = db.collection('doctors').doc("analytics");
        let FieldValue = admin.firestore.FieldValue;
    
        if (!change.before.exists) {
            // new document created
            doctorAnalyticsRef.update({
                [`specialityMap.${change.after.data().speciality}`]: FieldValue.increment(1),
                totalDoctors: FieldValue.increment(1)
            });

            const doctorHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.hospitalId);
            doctorHospitalRef.update({
                [`doctors.doctorsSpecialityMap.${change.after.data().speciality}`]: FieldValue.increment(1),
                [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayUnion({
                    doctorId: doctorId,
                    doctorName: change.after.data().name,
                    doctorSpeciality: change.after.data().speciality
                }),
                [`doctors.doctorsCount`]: FieldValue.increment(1)
            });
        } else if (change.before.exists && change.after.exists) {
            // updating existing document
            if (change.after.data().speciality !== change.before.data().speciality) {
                doctorAnalyticsRef.update({
                    [`specialityMap.${change.after.data().speciality}`]: FieldValue.increment(1),
                    [`specialityMap.${change.before.data().speciality}`]: FieldValue.increment(-1)
                });
            }

            if (change.after.data().hospital.hospitalId !== change.before.data().hospital.hospitalId) {
                const doctorBeforeHospitalRef = db.collection('hospitals').doc(change.before.data().hospital.hospitalId);
                doctorBeforeHospitalRef.update({
                    [`doctors.doctorsSpecialityMap.${change.before.data().speciality}`]: FieldValue.increment(-1),
                    [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayRemove({
                        doctorId: doctorId,
                        doctorName: change.before.data().name,
                        doctorSpeciality: change.before.data().speciality
                    }),
                    [`doctors.doctorsCount`]: FieldValue.increment(-1)
                });
                const doctorAfterHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.hospitalId);
                doctorAfterHospitalRef.update({
                    [`doctors.doctorsSpecialityMap.${change.after.data().speciality}`]: FieldValue.increment(1),
                    [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayUnion({
                        doctorId: doctorId,
                        doctorName: change.after.data().name,
                        doctorSpeciality: change.after.data().speciality
                    }),
                    [`doctors.doctorsCount`]: FieldValue.increment(1)
                });
            } else if (change.after.data().speciality !== change.before.data().speciality) {
                const doctorHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.hospitalId);
                doctorHospitalRef.update({
                    [`doctors.doctorsSpecialityMap.${change.after.data().speciality}`]: FieldValue.increment(1),
                    [`doctors.doctorsSpecialityMap.${change.before.data().speciality}`]: FieldValue.increment(-1),
                    [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayRemove({
                        doctorId: doctorId,
                        doctorName: change.before.data().name,
                        doctorSpeciality: change.before.data().speciality
                    })
                }).then(() => {
                    return doctorHospitalRef.update({
                        [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayUnion({
                            doctorId: doctorId,
                            doctorName: change.after.data().name,
                            doctorSpeciality: change.after.data().speciality
                        })
                    }).then(() => {
                        return 0;
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                });
            } else {
                const doctorHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.hospitalId);
                doctorHospitalRef.update({
                    [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayRemove({
                        doctorId: doctorId,
                        doctorName: change.before.data().name,
                        doctorSpeciality: change.before.data().speciality
                    })
                }).then(() => {
                    return doctorHospitalRef.update({
                        [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayUnion({
                            doctorId: doctorId,
                            doctorName: change.after.data().name,
                            doctorSpeciality: change.after.data().speciality
                        })
                    }).then(() => {
                        return 0;
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                });
            }
        } else if (!change.after.exists) {
            // deleting document
            doctorAnalyticsRef.update({
                [`specialityMap.${change.before.data().speciality}`]: FieldValue.increment(-1),
                totalDoctors: FieldValue.increment(-1)
            });

            const doctorHospitalRef = db.collection('hospitals').doc(change.before.data().hospital.hospitalId);
            doctorHospitalRef.update({
                [`doctors.doctorsSpecialityMap.${change.before.data().speciality}`]: FieldValue.increment(-1),
                [`doctors.doctorsList`]: admin.firestore.FieldValue.arrayRemove({
                    doctorId: doctorId,
                    doctorName: change.before.data().name,
                    doctorSpeciality: change.before.data().speciality
                }),
                [`doctors.doctorsCount`]: FieldValue.increment(-1)
            });
        }
    
        return 0;
    });

exports.updateVisitAnalytics = functions.firestore.document('/visits/{visitId}')
    .onWrite(async (change, context) => {
        const visitId = context.params.visitId;
        const visitAnalyticsRef = db.collection('visits').doc("analytics");
        let FieldValue = admin.firestore.FieldValue;
    
        if (!change.before.exists) {
            // new document created
            const visitHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.id);
            const visitDoctorRef = db.collection('doctors').doc(change.after.data().doctor.id);
            const visitUserRef = db.collection('users').doc(change.after.data().userId);
            const visitRef = db.collection('visits').doc(visitId);

            let hosp = await visitHospitalRef.get()
            .then(hospital => {
                if (hospital.exists) {
                    return hospital.data();
                } else {
                    console.log("Doc doesn't exist");
                    return null;
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            });
            let doc = await visitDoctorRef.get()
            .then(doctor => {
                if (doctor.exists) {
                    return doctor.data();
                } else {
                    console.log("Doc doesn't exist");
                    return null;
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            });
            let user = await visitUserRef.get()
            .then(user => {
                if (user.exists) {
                    return user.data();
                } else {
                    console.log("Doc doesn't exist");
                    return null;
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            });
            
            if (hosp === null || doc === null || user === null) {
                return;
            }

            if (change.after.data().status === "PENDING") {
                visitAnalyticsRef.update({
                    [`countryMap.${hosp.state}`]: FieldValue.increment(1),
                    [`specialityMap.${doc.speciality}`]: FieldValue.increment(1),
                    total: FieldValue.increment(1),
                    active: FieldValue.increment(1)
                });
                visitHospitalRef.update({
                    [`visits.total`]: FieldValue.increment(1),
                    [`visits.active`]: FieldValue.increment(1)
                });
                visitDoctorRef.update({
                    [`visits.total`]: FieldValue.increment(1),
                    [`visits.active`]: FieldValue.increment(1)
                });
                visitUserRef.update({
                    [`visits.activeHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(1),
                    [`visits.totalHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(1),
                    [`visits.total`]: FieldValue.increment(1),
                    [`visits.active`]: FieldValue.increment(1)
                });
                visitUserRef.collection('user_hospitals').doc(change.after.data().hospital.id).set({
                    address: hosp.address,
                    contact: hosp.contact,
                    hospitalName: hosp.name,
                    latitude: Number(hosp.latitude),
                    longitude: Number(hosp.longitude),
                    remainingVisits: FieldValue.increment(1),
                    visits: {
                        [`${visitId}`]: {
                            doctorId: change.after.data().doctor.id,
                            doctorName: doc.name,
                            doctorSpeciality: doc.speciality,
                            doctorContact: doc.contact
                        }
                    }
                }, { merge: true });
            } else {
                visitAnalyticsRef.update({
                    [`countryMap.${hosp.state}`]: FieldValue.increment(1),
                    [`specialityMap.${doc.speciality}`]: FieldValue.increment(1),
                    total: FieldValue.increment(1)
                });
                visitHospitalRef.update({
                    [`visits.total`]: FieldValue.increment(1)
                });
                visitDoctorRef.update({
                    [`visits.total`]: FieldValue.increment(1)
                });
                visitUserRef.update({
                    [`visits.totalHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(1),
                    [`visits.total`]: FieldValue.increment(1)
                });
            }
            visitRef.update({
                [`doctor.name`]: doc.name,
                [`doctor.speciality`]: doc.speciality,
                [`hospital.name`]: hosp.name,
                [`hospital.address`]: hosp.address,
                [`hospital.state`]: hosp.state
            })
        } else if (change.before.exists && change.after.exists) {
            // updating existing document
            const visitAfterHospitalRef = db.collection('hospitals').doc(change.after.data().hospital.id);
            const visitAfterDoctorRef = db.collection('doctors').doc(change.after.data().doctor.id);
            const visitAfterUserRef = db.collection('users').doc(change.after.data().userId);

            if (change.before.data().status === "PENDING" && change.after.data().status === "COMPLETED") {
                visitAfterDoctorRef.update({
                    [`visits.active`]: FieldValue.increment(-1)
                });
                visitAfterHospitalRef.update({
                    [`visits.active`]: FieldValue.increment(-1)
                });
                visitAnalyticsRef.update({
                    active: FieldValue.increment(-1)
                });
                visitAfterUserRef.update({
                    [`visits.activeHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(-1),
                    [`visits.active`]: FieldValue.increment(-1),
                    [`visits.avgPptTime`]: FieldValue.increment(Number(change.after.data().timestamps.presentationFinished)-Number(change.after.data().timestamps.presentationStarted)),
                    [`visits.avgVisitDur`]: FieldValue.increment(Number(change.after.data().timestamps.visitFinished)-Number(change.after.data().timestamps.visitStarted))
                });
                visitAfterUserRef.collection('user_hospitals').doc(change.after.data().hospital.id).update({
                    remainingVisits: FieldValue.increment(-1),
                    [`visits.${visitId}`]: admin.firestore.FieldValue.delete()
                })
            }
        } else if (!change.after.exists) {
            // deleting document
            const visitHospitalRef = db.collection('hospitals').doc(change.before.data().hospital.id);
            const visitDoctorRef = db.collection('doctors').doc(change.before.data().doctor.id);
            const visitUserRef = db.collection('users').doc(change.before.data().userId);

            if (change.before.data().status === "PENDING") {
                visitAnalyticsRef.update({
                    [`countryMap.${hosp.state}`]: FieldValue.increment(1),
                    [`specialityMap.${change.before.data().doctor.speciality}`]: FieldValue.increment(-1),
                    total: FieldValue.increment(-1),
                    active: FieldValue.increment(-1)
                });
                visitHospitalRef.update({
                    [`visits.total`]: FieldValue.increment(-1),
                    [`visits.active`]: FieldValue.increment(-1)
                });
                visitDoctorRef.update({
                    [`visits.total`]: FieldValue.increment(-1),
                    [`visits.active`]: FieldValue.increment(-1)
                });
                visitUserRef.update({
                    [`visits.activeHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(-1),
                    [`visits.totalHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(-1),
                    [`visits.total`]: FieldValue.increment(-1),
                    [`visits.active`]: FieldValue.increment(-1)
                });
                visitUserRef.collection('user_hospitals').doc(change.after.data().hospital.id).update({
                    remainingVisits: FieldValue.increment(-1),
                    [`visits.${visitId}`]: admin.firestore.FieldValue.delete()
                })
            } else {
                visitAnalyticsRef.update({
                    [`specialityMap.${change.before.data().doctor.speciality}`]: FieldValue.increment(-1),
                    [`countryMap.${change.before.data().hospital.state}`]: FieldValue.increment(-1),
                    total: FieldValue.increment(-1)
                });
                visitHospitalRef.update({
                    [`visits.total`]: FieldValue.increment(-1)
                });
                visitDoctorRef.update({
                    [`visits.total`]: FieldValue.increment(-1)
                });
                visitUserRef.update({
                    [`visits.totalHospitalMap.${change.after.data().hospital.id}`]: FieldValue.increment(-1),
                    [`visits.total`]: FieldValue.increment(-1)
                });
            }
        }
    });


exports.updateUserAnalytics = functions.firestore.document('/users/{userId}')
    .onWrite((change, context) => {
        const userAnalyticsRef = db.collection('users').doc("analytics");
        let FieldValue = admin.firestore.FieldValue;
    
        if (!change.before.exists) {
            // new document created
            userAnalyticsRef.update({
                [`countryMap.${change.after.data().state}`]: FieldValue.increment(1),
                total: FieldValue.increment(1)
            });
            admin.auth().createUser({
                uid: change.after.id,
                email: change.after.data().email,
                password: change.after.data().password,
                displayName: change.after.data().firstName
            })

        } else if (change.before.exists && change.after.exists) {
            // updating existing document
            if (change.after.data().state !== change.before.data().state) {
                userAnalyticsRef.update({
                    [`countryMap.${change.after.data().state}`]: FieldValue.increment(1),
                    [`countryMap.${change.before.data().state}`]: FieldValue.increment(-1)
                });
            }
        } else if (!change.after.exists) {
            // deleting document
            userAnalyticsRef.update({
                [`countryMap.${change.before.data().state}`]: FieldValue.increment(-1),
                total: FieldValue.increment(-1)
            });
            admin.auth().deleteUser(change.before.id);
        }
    
        return 0;
    });