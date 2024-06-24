import { RouteActions } from "./constants";

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

export const mapRouteActionToLabel = (val: string) => {
    switch (val) {
        case RouteActions.GET:
            return 'READ';
        case RouteActions.POST:
            return 'CREATE';
        case RouteActions.PUT:
            return 'UPDATE';
        case RouteActions.DELETE:
            return 'DELETE';
        default:
            return 'UNKNOWN';
    }
};

export const fullName = (firstName: string | null | undefined, lastName: string | null | undefined) => {
    if (firstName || lastName) {
        return `${firstName || ''} ${lastName || ''}`;
    }
}
export const getUserInitials = (name: string | null | undefined) => {
    if (!name) return '';
    const nameWords = name.split(' ');
    const initials = nameWords.slice(0, 2).map(word => word[0]).join('');
    return initials.toUpperCase();
}