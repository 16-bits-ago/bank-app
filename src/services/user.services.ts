import { instance } from "../api"
import { IUser } from "../types/user.interface"

export const UserService = {
    async getProfile() {
        const response = await instance.get<IUser[]>('/users/1')
        return response.data
    },

    async getUsers() {
        const response = await instance.get<IUser[]>('/users/1')
        return response.data.filter(user => user.id !== 1)
    },

    async transferMoney(amount: number, card: number, fromCard: number) {
        const response = await instance.get<IUser[]>('/users/1')
        return response.data.filter(user => user.id !== 1)
    }
}