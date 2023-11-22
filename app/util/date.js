export function convertHtmlDateToIsoDateTime(htmlDateValue) {
    if (!htmlDateValue) return null
    return  htmlDateValue + "T00:00:00.000Z"
}