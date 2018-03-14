import Ajax from '../common/Ajax.jsx';

export const getUserInfo = (succ, error) => (dispatch) => {
    Ajax({
        url: `/qm/api/v5/user_info?timeStamp=${new Date().getTime()}`,
        success: (data) => {
            const url = location.pathname;
            dispatch({ type: 'get/userInfo', data: data });
            if (!data) {
                exam_history.push({
                    pathname: '/login',
                    state: { 'url': url }
                });
            } else {
                dispatch({ type: 'get/userInfo', data: data })
                succ(data);
            }
        },
        error
    });
}