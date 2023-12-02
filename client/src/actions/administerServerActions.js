"use server"

import jwt from 'jsonwebtoken';
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation"
import { getCookies } from './authServerActions';

export const registerAdmin = async (adminData, instituteId) => {

    if (!adminData.fullName) return;

    const newAdminData = {
        fullName: adminData.fullName,
        gender: adminData.gender,
        designation: adminData.designation,
        qualifications: adminData.qualifications,
        dateOfBirth: adminData.dateOfBirth,
        joinedOn: adminData.joinedOn,
        contactNo: adminData.contactNo,
        emailId: adminData.emailId
    }

    await fetch(`http://localhost:5000/api/institute/${instituteId}/users/registerAdmin`, {
        method: "POST",
        body: JSON.stringify(newAdminData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("registeredAdmins");
}

export const updateAdmin = async (adminData, adminId) => {

    if (!adminData.fullName) return;

    const newAdminData = {
        fullName: adminData.fullName,
        gender: adminData.gender,
        designation: adminData.designation,
        qualifications: adminData.qualifications,
        dateOfBirth: adminData.dateOfBirth,
        joinedOn: adminData.joinedOn,
        contactNo: adminData.contactNo,
        emailId: adminData.emailId
    }

    await fetch(`http://localhost:5000/api/institute/users/${adminId}/updateAdmin`, {
        method: "POST",
        body: JSON.stringify(newAdminData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("registeredAdmins");
}

export const registerTeacher = async (teacherData, instituteId) => {

    if (!teacherData.fullName) return;

    const newTeacherData = {
        fullName: teacherData.fullName,
        gender: teacherData.gender,
        designation: teacherData.designation,
        qualifications: teacherData.qualifications,
        dateOfBirth: teacherData.dateOfBirth,
        joinedOn: teacherData.joinedOn,
        contactNo: teacherData.contactNo,
        emailId: teacherData.emailId
    }

    await fetch(`http://localhost:5000/api/institute/${instituteId}/users/registerTeacher`, {
        method: "POST",
        body: JSON.stringify(newTeacherData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("registeredTeachers");
}

export const updateTeacher = async (teacherData, teacherId) => {

    if (!teacherData.fullName) return;

    const newTeacherData = {
        fullName: teacherData.fullName,
        gender: teacherData.gender,
        designation: teacherData.designation,
        qualifications: teacherData.qualifications,
        dateOfBirth: teacherData.dateOfBirth,
        joinedOn: teacherData.joinedOn,
        contactNo: teacherData.contactNo,
        emailId: teacherData.emailId
    }

    await fetch(`http://localhost:5000/api/institute/users/${teacherId}/updateTeacher`, {
        method: "POST",
        body: JSON.stringify(newTeacherData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("registeredTeachers");
}

export const registerStudent = async (studentDetails, instituteId, classroomId) => {

    if (!studentDetails.fullName || !studentDetails.classroomName || !studentDetails.rollNo) return;

    const studentData = {
        fullName: studentDetails.fullName,
        classroomName: studentDetails.classroomName,
        rollNo: studentDetails.rollNo,
        gender: studentDetails.gender,
        dateOfBirth: studentDetails.dateOfBirth,
        joinedOn: studentDetails.joinedOn,
        contactNo: studentDetails.contactNo,
        fatherName: studentDetails.fatherName,
        fatherContactNo: studentDetails.fatherContactNo,
        motherName: studentDetails.motherName,
        motherContactNo: studentDetails.motherContactNo,
        detailedAttendanceArray: [],
    }

    await fetch(`http://localhost:5000/api/institute/${instituteId}/${classroomId}/users/registerStudent`, {
        method: "POST",
        body: JSON.stringify(studentData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("allclassrooms");
}

export const updateStudent = async (studentDetails, studentId) => {

    const studentData = {
        gender: studentDetails.gender,
        dateOfBirth: studentDetails.dateOfBirth,
        joinedOn: studentDetails.joinedOn,
        contactNo: studentDetails.contactNo,
        fatherName: studentDetails.fatherName,
        fatherContactNo: studentDetails.fatherContactNo,
        motherName: studentDetails.motherName,
        motherContactNo: studentDetails.motherContactNo,
    }

    await fetch(`http://localhost:5000/api/institute/users/${studentId}/updateStudent`, {
        method: "POST",
        body: JSON.stringify(studentData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("allclassrooms");
}

export const registerClassroom = async (classroomName, instituteId, session) => {

    if (!classroomName) return;

    const classroomData = {
        classroomName: classroomName,
        students: [],
        subjects: []
    }

    await fetch(`http://localhost:5000/api/classroom/${instituteId}/${session}/createClassroom`, {
        method: "POST",
        body: JSON.stringify(classroomData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("allclassrooms");
}

export const registerSubject = async (subjectDetails, instituteId, session, classroomId) => {

    if (!subjectDetails) return;

    const subjectData = {
        subjectName: subjectDetails.subjectName,
        subjectCode: subjectDetails.subjectCode,
        assignedTeacherName: subjectDetails.assignedTeacherName,
        assignedTeacherId: subjectDetails.assignedTeacherId
    }

    await fetch(`http://localhost:5000/api/classroom/${instituteId}/${session}/${classroomId}/subject/create`, {
        method: "POST",
        body: JSON.stringify(subjectData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("allclassrooms");
}

export const updateSubject = async (subjectDetails, instituteId, session, classroomId) => {

    if (!subjectDetails) return;

    const subjectData = {
        subjectName: subjectDetails.subjectName,
        subjectCode: subjectDetails.subjectCode,
        assignedTeacherName: subjectDetails.assignedTeacherName,
        assignedTeacherId: subjectDetails.assignedTeacherId
    }

    await fetch(`http://localhost:5000/api/classroom/${instituteId}/${session}/${classroomId}/subject/update`, {
        method: "POST",
        body: JSON.stringify(subjectData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidateTag("allclassrooms");
}