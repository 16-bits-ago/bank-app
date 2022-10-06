import { useQuery } from "@tanstack/react-query"
import { instance } from "../api"

export const useProfile = () => {
    const {} = useQuery(['profile'], ( ) => instance)
}