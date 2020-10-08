// import { reject } from "core-js/fn/promise";

const activities = {
    1546968934: {
        id: "1546968934",
        title: "Learn Vue.js",
        notes: "I started today and it was not good.",
        progress: 40,
        category: "1546969049",
        createdAt: 1546969144391,
        updatedAt: 1546969144391,
    },
    1546969212: {
        id: "1546969212",
        title: "Read Witcher Books",
        notes: "These books are super nice",
        progress: 60,
        category: "1546969049",
        createdAt: 1546969144391,
        updatedAt: 1546969144391,
    },
}
// const canContinue = () => {
//     const rndNumber = Math.floor(Math.random * 10)

//     if (rndNumber > 5) {
//         return true
//     }
//     return false
// }

export const fetchActivities = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {

                resolve(activities)

            } catch (msg) {
                reject(`Cannot fetch activities ${msg}`);
            }
        }, 1000)
    })
}





const generateUid = () => Math.floor(new Date() * Math.random())
export const createActivityAPI = (activity) => {
    activity.id = generateUid()
    activity.progress = 0
    activity.createdAt = new Date()
    activity.updatedAt = new Date()

    return new Promise((resolve, reject) => {

        try {
            resolve(activity)
        }
        catch (msg) {
            reject(`Cannot fetch activities${msg}`);
        }
    })
}

export const fetchUser = () => {
    return {
        name: "Filip Jerga",
        id: "-Aj34jknvncx98812",
    }
}

export const fetchCategories = () => {
    return {
        1546969049: { text: "books", id: "1546969049" },
        1546969225: { text: "movies", id: "1546969225" },
    }
}
export const fetchItems = () => {
    return {
        1: { name: "Filip" },
        2: { name: "John" }
    }
}
