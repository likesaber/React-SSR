export default function (state = {}, action) {
    switch (action.type) {
        case 'get/userInfo':
            return {
                ...state,
                userInfo: action.data
            };
        case 'loadStuts':
            return {
                ...state,
                stuts: !!action.stuts
            };
        default:
            return state;
    }
}
