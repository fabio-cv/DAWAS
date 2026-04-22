import { UsersModel } from "../../models/user.model.js";
import type { UserType } from "../../utils/types.js";

export const userResolver = {
    Query: {
        getAllUsers: async () => {
            return await UsersModel.getAll();
        },
        getUsersById: async (_: any, args: { id: string }) => {
            return await UsersModel.get(args.id);
        }
    },
    Mutation: {
        createUser: async (_: any, args: { user: UserType }) => {
            return await UsersModel.create(args.user);
        },
        updateUser: async (_: any, args: { id: string, user: UserType }) => {
            return await UsersModel.update(args.id, args.user);
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await UsersModel.delete(args.id);
        }
    }
}