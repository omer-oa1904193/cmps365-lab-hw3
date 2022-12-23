//from https://stackoverflow.com/a/42196290/14200676
export function encodeUrlQueryParams(data) {
    const params = Object.keys(data).map(key => data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : "");
    return params.filter(value => !!value).join("&");
}

