import reqwest from "reqwest";
// import { dispatch } from 'store';
// import History from 'common/History';
// import { checkIsCommonSite } from 'common/Permission.jsx';
function toast(str) {
    if (window.message) {
        window.message.warn(str);
    } else if (window.Toast) {
        window.Toast.fail(str, 1);
    }
}

function getSiteDomainName() {
    // if (checkIsCommonSite()) {
    //     return window.location.hostname.replace(window.location.hostname.split('.')[0], 'www').replace('.local', '');
    // }
    return window.location.hostname.replace(".local", "");
}

function noop() { }
export default function (opt) {
    let call_succ = opt.success || noop;
    let call_error = opt.error || noop;
    let isV5 = true;
    let data = opt.data || {};
    // if (opt.url.startWith('/qm/api/v5/') || opt.url.startWith('/qm/api/admin/') || opt.url.startWith('/exam/api')) {
    // } else if (opt.url.startWith('/qm/api')) {
    //     opt.url = opt.url.replace('/qm/api/', '/qm/api/v5/');
    // } else {
    //     isV5 = false;
    // }
    if (typeof opt.data != "string") {
        opt.data = {
            full_domain_name: getSiteDomainName(),
            ...data
        };
    }
    opt.method = opt.type || "post";
    opt.type = opt.dataType || "json";
    delete opt.crossOrigin;
    opt.withCredentials = true;
    // 开启跨域
    /*  if (opt.crossOrigin) {
         opt.withCredentials = true;
     } else {
         delete opt.crossOrigin;
     } */
    opt = {
        cache: false,
        ...opt
    };

    opt.error = call_error;
    opt.success = res => {
        if (isV5) {
            // 只有 /qm/api开头才使用v5
            if (opt.type == "html" || opt.crossOrigin) {
                call_succ.call(this, res);
            } else if (res.isSuccess) {
                call_succ.call(this, res.data, res);
            } else {
                switch (res.statusCode) {
                    case 401:
                        // dispatch({ type: TYPES.LOG_OUT });
                        const runInWeiChat = /MicroMessenger/i.test(
                            navigator.userAgent
                        );
                        if (runInWeiChat) {
                            const url = sessionStorage.getItem(
                                "AuthorizationUrl"
                            );
                            url && (window.location.href = url);
                            toast(res.message);
                        } else {
                            // History.push('/login');
                            toast(res.message);
                        }
                        break;
                    case 403:
                        toast("用户权限验证失败");
                        break;
                    case 500:
                        // message.error(res.message);
                        break;
                }
                call_error.call(this, res);
            }
        } else {
            call_succ.call(this, res);
        }
    };
    return reqwest(opt);
}
