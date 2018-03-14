import Ajax from '../common/Ajax';


export const getExamList = (succ, error) => (dispatch) => {
    Ajax({
        url: '/qm/api/v5/course/mylearn/list',
        success: (data) => {
            succ(data);
        },
        error
    });
}