"use server"

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getCookies = async () => {
    const cookieStore = cookies()
    let currentUser = cookieStore.get('currentUser') || null;

    if (currentUser !== null) {
        const payload = jwt.verify(
            currentUser.value,
            process.env.JWT_SECRET
        )

        currentUser = payload;

        if (currentUser.instituteId == null) currentUser = null;
    }

    return currentUser;
}

export const signInAdmin = async () => {

    const res = await fetch(`http://localhost:5000/api/institute/users/signin/admin`,
        { cache: 'no-store' }
    );

    const currentUser = await res.json();

    const userJwt = jwt.sign(
        currentUser,
        process.env.JWT_SECRET
    );

    cookies().set({
        name: 'currentUser',
        value: userJwt,
        httpOnly: true,
        path: '/',
    })
    //add cookies adder here
    //revalidateTag("currentUser");
};

export const signInTeacher = async () => {

    const res = await fetch(`http://localhost:5000/api/institute/users/signin/teacher`,
        { cache: 'no-store' }
    );


    const currentUser = await res.json();

    const userJwt = jwt.sign(
        currentUser,
        process.env.JWT_SECRET
    );

    cookies().set({
        name: 'currentUser',
        value: userJwt,
        httpOnly: true,
        path: '/',
    })
    //add cookies adder here
    //revalidateTag("currentUser");
};

export const signInStudent = async () => {

    const res = await fetch(`http://localhost:5000/api/institute/users/signin/student`,
        { cache: 'no-store' }
    );


    const currentUser = await res.json();

    const userJwt = jwt.sign(
        currentUser,
        process.env.JWT_SECRET
    );

    cookies().set({
        name: 'currentUser',
        value: userJwt,
        httpOnly: true,
        path: '/',
    })
    //add cookies adder here
    //revalidateTag("currentUser");
};

export const signOutUser = async () => {

    const currentUser = { instituteId: null };

    const userJwt = jwt.sign(
        currentUser,
        process.env.JWT_SECRET
    );

    cookies().set({
        name: 'currentUser',
        value: userJwt,
        maxAge: 0,
        path: '/', // For all paths
    })
}