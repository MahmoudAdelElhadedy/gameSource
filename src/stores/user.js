import { defineStore } from "pinia"
import router from "@/router"

import { useToast } from 'vue-toast-notification'
const $toast = useToast();
// Firebase
import { DB, AUTH } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import errorCodes from '@/utils/fbcodes'
const DUFUALT_USER = {
    uid: null,
    email: null,
    firstName: null,
    lastName: null,
    isAdmin: null,


}
export const useUserStore = defineStore('user', {
    state: () => ({
        user: DUFUALT_USER,
        isAuth: false,
        isLoading: false,
    }),
    getters: {
        getUserData(state) {
            return state.user
        },
        getUserId(state) {
            return state.user.uid
        },
        getUserinfo() {
            return this.user
        }
        // getUser: (state) => state.user,
        // getIsLoggedIn: (state) => state.isLoggedIn,
        // getIsLoading: (state) => state.isLoading,
    }, actions: {
        setUser(user) {
            this.user = { ...this.user, ...user }
            this.isAuth = true
        },
        async updateProfile(formData) {
            try {
                const userRef = doc(DB, 'users', this.getUserId);
                await updateDoc(userRef, {
                    ...formData
                });

                this.setUser(formData);
                $toast.success('Updated !!!')
                return true;
            } catch (error) {
                console.log(error)
                $toast.error(error.message)
            }
        },
        async getUserfromFirestore(uid) {
            //make a subscribe to prevent errors


            // get user from firestore
            const userRef = doc(DB, 'users', uid)
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()) {
                this.setUser(userDoc.data())
                return userDoc.data()
            } else {
                throw new Error('User not found')
            }
        },
        async signIn(formData) {
            try {
                this.isLoading = true
                const response = await signInWithEmailAndPassword(
                    AUTH,
                    formData.email,
                    formData.password)

                // get user from firestore
                const userData = await this.getUserfromFirestore(response.user.uid)
                // set user in store
                this.setUser(userData)
                // redirect to dashboard
                router.push({ name: 'home' })

            }
            catch (error) {
                throw new Error(errorCodes(error.code)) // handle error
            }
            finally {
                this.isLoading = false

            }
        },
        async registerUser(formData) {
            try {
                this.isLoading = true
                const response = await createUserWithEmailAndPassword(
                    AUTH,
                    formData.email,
                    formData.password)
                // add user to firestore
                const newUser = {
                    uid: response.user.uid,
                    email: formData.email,
                    isAdmin: false,
                }
                await setDoc(doc(DB, 'users', response.user.uid), newUser)
                this.setUser(newUser)
                // redirect to dashboard


                router.push({ name: 'dashboard' })
            }
            catch (error) {
                throw new Error(errorCodes(error.code))// handle error
            }
            finally {
                this.isLoading = false

            }
        },
        async autosignIn(userId) {
            try {
                // get user from firestore
                const userData = await this.getUserfromFirestore(userId)
                // set user in store
                this.setUser(userData)
                return true
            }
            catch (error) {
                throw new Error(errorCodes(error.code))// handle error
            }
            finally {
                this.isLoading = false

            }
        },
        async signOut() {
            try {
                this.isLoading = true
                await signOut(AUTH)
                this.user = DUFUALT_USER
                this.isAuth = false
                router.push({ name: 'signin' })
            }
            catch (error) {
                throw new Error(errorCodes(error.code))// handle error
            }
            finally {
                this.isLoading = false

            }
        },
    }


})