export function formatDate(timestamp) {

    if (!timestamp) {
        return "";
    }

    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(timestamp));

}