let data = {};
let lsKey = document.title + ' Data ';

let preupdate = c => {
    let {id, entity} = c;
    if (data[id] === undefined) {
        let lsData = localStorage.getItem(lsKey + id);
        if (lsData !== null) {
            data[id] = lsData;
            entity.data = JSON.parse(lsData);
        }
    }
};

let postupdate = c => {
    let {id, entity} = c;
    let lsData = JSON.stringify(entity.data);
    if (data[id] !== lsData) {
        data[id] = lsData;
        localStorage.setItem(lsKey + id, lsData);
    }
};

export default Object.freeze({
    preupdate,
    postupdate
});
