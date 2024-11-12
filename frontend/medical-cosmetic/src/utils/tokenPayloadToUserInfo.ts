import { TokenPayload, UserInfo } from "../types/auth";

export const tokenPayloadToUserInfo = (payload: TokenPayload): UserInfo => {
    return {
        user_id: payload.user_id,
        email: payload.email,
        user_type: payload.user_type,
        first_name: payload.first_name,
        last_name: payload.last_name
    };
};