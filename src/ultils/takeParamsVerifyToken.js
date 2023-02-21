const takeParamsVerifyToken = (url) => {
    const params = [];
    let tempParam = "";
    for (let i = 0; i < url.length; i++) {

        if (url[i] !== '/') {
            tempParam += url[i];

        }
        else if (url[i] === '/' && i !== (url.length - 1)) {

            params.push(tempParam);
            tempParam = "";
        }
        if (i === (url.length - 1)) {
            params.push(tempParam);
        }
    }
    return params;
}

export default takeParamsVerifyToken;