import { ref } from "vue"
import { AUTH } from "../utils/firebase"
import { useUserStore } from "@/stores/user"
import { onAuthStateChanged } from "firebase/auth"


export const firstLoad = () => {
    const userStore = useUserStore()
    const loading = ref(true)
    onAuthStateChanged(AUTH, async (user) => {
        if (user) {
            await userStore.autosignIn(user.uid)

        }
        setTimeout(() => {
            loading.value = false
        }, 100)
    })
    return { loading }
}
export const isAuth = () => {
    let user = AUTH.currentUser
    if (!user) {
        return "signin"
    }
    return true
}
export const isAdmin = () => {
    const userStore = useUserStore()

    if (!userStore.user.isAdmin) {
        return "/"
    }
    return true
}
export const islogged = () => {
    let user = AUTH.currentUser
    if (user) {
        return "/"
    }
    return true
}