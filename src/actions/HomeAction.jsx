import Ajax from '../common/Ajax';
export const add = (count) => ({ type: 'ADD', count, })
// export const getHomeInfo=()=>async(dispatch,getState)=>{
//   let {name,age}=getState().homeInfo;
//   if(name || age)return
//   await new Promise(resolve=>{
//     let homeInfo={name:'wd2010',age:'25'}
//     setTimeout(()=>resolve(homeInfo),10000)
//   }).then(homeInfo=>{
//     dispatch({type:GET_HOME_INFO,data:homeInfo})
//   })
// }
export const test = () => (dispatch, getState) => {
}

export const getHomeInfo = (succ, error) => (dispatch) => {
  Ajax({
    url: '/qm/api/v5/site/logo',
    success: (data) => {
      let homeInfo = { userName: 'wd2010', age: '25' }
      succ(homeInfo);
    },
    error: () => {
      setTimeout(() => { error() }, 3000);
    }
  });
}
