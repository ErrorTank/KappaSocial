let request = (url, type, data) => new Promise((resolve, reject) => {
    let ajaxConfig = {
        url: url,
        contentType: "application/json",
        type: type,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem("userToken")}`)
        },
        success: (data) => {
            //res.json(data);
            resolve(data);
        },
        error: (err) => {
            reject(err);
        }
    };


    if (data) {
        ajaxConfig.data = JSON.stringify(data);
    }
    $.ajax(ajaxConfig);
});
export const api = {
    get: (url) => {
        return request(url, "GET");
    },
    post: (url, data) => {
        return request(url, "POST", data);
    },
    put: (url, data) => {
        return request(url, "PUT", data);
    },
    delete: (url) => {
        return request(url, "DELETE");
    }
};


