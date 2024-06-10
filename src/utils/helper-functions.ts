export const downloadPDF = (trade_license_image: string, shopName: string) => {
    fetch(trade_license_image, {
        method: 'GET',
        headers: {},
    })
        .then((response) => {
            response.arrayBuffer().then(function (buffer) {
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${shopName}-trade-license.pdf`
                ); //or any other extension like pdf , png
                document.body.appendChild(link);
                link.click();
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export const fullName = (firstName: string | null | undefined, lastName: string | null | undefined) => {
    if (firstName || lastName) {
        return `${firstName || ''} ${lastName || ''}`;
    }
}