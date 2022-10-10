import { useQuery } from "@tanstack/react-query"
import { instance } from "../api"
import { UserService } from "../services/user.services"

export const useProfile = () => {
    const {data} = useQuery(['profile'], ( ) => UserService.getProfile())

    return {user:data}
}