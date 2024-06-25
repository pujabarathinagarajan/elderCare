interface Doctor {
    _id: string;
    fullName: string;
    location: string[];
    rating: number;
    speciality: string[];
    education: string;
    experience: number;
    picture: string;
    nextAvailableTime: string;
    gender: string;
}

export default Doctor;
